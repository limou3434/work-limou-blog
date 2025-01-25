# Dockerfile
# @author <a href="https://github.com/xiaogithubooo">limou3434</a>
# @from <a href="https://workhub.com">大数据工作室</a>

# 直接使用 Nginx 作为基础镜像
FROM nginx:1.18.0

# 复制宿主机上的构建产物到 Nginx 默认网页目录
COPY /docs/.vuepress/dist /usr/share/nginx/html

# 复制自定义的 Nginx 配置文件到 /etc/nginx/sites-available/
COPY nginx.conf /etc/nginx/sites-available/work-document-blogs-frontend.conf

# 创建 /etc/nginx/sites-enabled 目录
RUN mkdir -p /etc/nginx/sites-enabled

# 创建软链接到 /etc/nginx/sites-enabled/
RUN ln -s /etc/nginx/sites-available/work-document-blogs-frontend.conf /etc/nginx/sites-enabled/

# 暴露端口
EXPOSE 80

# 启动 Nginx 服务
CMD ["nginx", "-g", "daemon off;"]
