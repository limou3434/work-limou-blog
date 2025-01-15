# Dockerfile
# @author <a href="https://github.com/xiaogithubooo">limou3434</a>
# @from <a href="https://datalearnhub.com">大数据工作室</a>

# 1.构建阶段
# 获取依赖镜像
FROM node:22.11.0 AS build-stage

# 设置工作目录(之后的所有相对路径操作都会基于这个目录)
WORKDIR /app

# 复制依赖文件(单独提取就可以在后续 package*.json 没有变动时使用缓存来构建镜像文件)
COPY package*.json ./

# 安装构建依赖
RUN npm install

# 复制项目文件
COPY . .

# 开始构建项目
RUN npm run docs:build

# 2.生产阶段
FROM nginx:1.18.0 AS production-stage

# 复制构建产物到 Nginx 的默认网页目录
# NOTE: 本项目设置的是让文档一起硬编码进去(这是为了项目的简单性)
# NOTE: 这个镜像文件其实最重要的是对 Nginx 的支持
# NOTE: 可自行更换 /usr/share/nginx/html 在宿主主机上的挂载点以避免重复编译镜像文件
COPY --from=build-stage /app/docs/.vuepress/dist /usr/share/nginx/html

# 复制自定义的 Nginx 配置文件到 /etc/nginx/sites-available/
COPY nginx.conf /etc/nginx/sites-available/work-document-blogs-frontend.conf

# 创建 /etc/nginx/sites-enabled 目录（如果它不存在）
RUN mkdir -p /etc/nginx/sites-enabled

# 创建软链接到 /etc/nginx/sites-enabled/
RUN ln -s /etc/nginx/sites-available/work-document-blogs-frontend.conf /etc/nginx/sites-enabled/

# 暴露端口
EXPOSE 80

# 启动 Nginx 服务
CMD ["nginx", "-g", "daemon off;"]

