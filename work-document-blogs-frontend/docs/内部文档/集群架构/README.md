# 集群架构

>   [!CAUTION]
>
>   警告：确保在 `root` 身份下。

>   [!CAUTION]
>
>   警告：相关密码做了加密处理。

## 1.整体架构

以下是工作室采用的技术架构，理解工作室的技术架构，有利于工作室成员添加新项目，维护旧项目。

## 2.预先准备

```shell
# 配置 work-server-init
```

```shell
# 配置 work-magic-circle
```

```shell
# 配置 work-intranet-penetration
```

```shell
# 配置 work-docker
# 配置网络代理
# 配置 Docker 的网络
$ sudo mkdir -p /etc/systemd/system/docker.service.d && sudo vim /etc/systemd/system/docker.service.d/http-proxy.conf && sudo cat /etc/systemd/system/docker.service.d/http-proxy.conf
[Service]
Environment="HTTP_PROXY=http://您配置的代理服务:代理端口/"
Environment="HTTPS_PROXY=http://您配置的代理服务:代理端口/"

# 重启 Docker 让配置生效
$ sudo systemctl restart docker

# 配置存储目录
$ sudo mkdir -p /data/backup_data/docker/
$ sudo chown -R root:docker /data/backup_data/docker/
$ sudo chmod -R 755 /data/backup_data/docker/
$ sudo ls /etc/docker/daemon.json
$ sudo vim /etc/docker/daemon.json && sudo cat /etc/docker/daemon.json
{
  "data-root": "/data/backup_data/docker"
}

# 迁移并且备份已有的 Docker 数据
$ sudo rsync -aP /var/lib/docker/ /data/backup_data/docker/
$ sudo mv -rf /var/lib/docker /var/lib/docker.bak

$ sudo systemctl daemon-reload
$ sudo systemctl start docker
$ sudo systemctl enable docker
$ docker info | grep "Docker Root Dir"
WARNING: No swap limit support # 该警告可以看情况修复, 目前不用修复
 Docker Root Dir: /data/backup_data/docker
# sudo rm -rf /var/lib/docker.bak # 可选步骤

```

```shell
# 配置 work-compose
$ mkdir -p ~/script/work-compose
$ vim ~/script/work-compose/compose.yaml
# 编写内部细节中的某些设施和某些服务...

```

## 3.内部细节

### 2.1.工作室设施

>   [!CAUTION]
>
>   警告：工作室设施理论上来说也可以被转化为 `k8s` 中的节点容器，但是我暂时使用 `docker compose` 来管理，暂时来作为工作室的开发基础设施，供工作室人员在校园内开发所使用（因此数据是存在一定的危险性的）。如果有时间有机会，请转化为 `k8s` 架构。不过由于大部分都是存储类的设施，所以其实个人又觉得没有必要使用 `k8s`，除非工作室的存储需求达到一个峰值不得不修改架构，否则我的建议是把所有服务的相关地址和端口都使用 `Nacos` 暴露出去。最坏考虑下，则需要修改为 `k8s` 架构，并且使用代理机制保护数据。

#### 2.1.1.工作室数据存储设施

工作室采用了 `MySQL、PostgreSQL、MongoDB` 建立数据库存储模块，为了避免某些问题，暂时不采用 `Docker` 部署存储设施，而是直接在本地进行部署（因为存储卷的考量，暂时没有这么做）。

```shell
# 配置 work-mysql (localhost:3306)
```

```shell
# 配置 work-postgresql (localhost:5432)
# 安装并且配置后重启 postgresql
$ apt install postgresql
$ vim /etc/postgresql/12/main/postgresql.conf
# 确保有以下的配置
# listen_addresses = 'localhost'
# password_encryption = scram-sha-256

# 重启配置
$ sudo systemctl reload postgresql
$ sudo systemctl restart postgresql

# 切换用户测试是否成功
$ sudo -i -u postgres
$ psql
psql (12.22 (Ubuntu 12.22-0ubuntu0.20.04.1))
Type "help" for help.

postgres=# SHOW listen_addresses;
 listen_addresses 
------------------
 localhost
(1 row)

postgres=# SHOW password_encryption;
 password_encryption 
---------------------
 scram-sha-256
(1 row)

postgres=# exit

# 切回原来的 root 用户
$ exit

$ su -c "psql" - postgres
psql (12.22 (Ubuntu 12.22-0ubuntu0.20.04.1))
Type "help" for help.
# 就可以进行正常操作了...
postgres=# exit

# 配置 TLS 远程连接安全
# 暂无需配置...

```

```shell
# 配置 work-mongodb (localhost:27017)
```

```shell
# 配置 work-redis (localhost:6379)
$ sudo apt-get install lsb-release curl gpg
$ curl -fsSL https://packages.redis.io/gpg | sudo gpg --dearmor -o /usr/share/keyrings/redis-archive-keyring.gpg
$ sudo chmod 644 /usr/share/keyrings/redis-archive-keyring.gpg
$ echo "deb [signed-by=/usr/share/keyrings/redis-archive-keyring.gpg] https://packages.redis.io/deb $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/redis.list
$ sudo apt-get update
$ sudo apt-get install redis
$ sudo systemctl enable redis-server
$ sudo systemctl start redis-server

```

>   [!CAUTION]
>
>   警告：在使用之前请确保每个数据库的主要持久化目录映射到 `/data/backup_data/...` 下，以避免系统磁盘占用过大的备份难度。

#### 2.1.2.工作室搜索引擎设施

待补充...

#### 2.1.3.工作室代码仓库设施

采用 [Gitea](https://docs.gitea.cn/) 建立 `Git` 服务器来管理工作室的所有仓库设施，采用内置的 `PostgreSQL` 数据库进行存储，和业务 `MySQL` 分离开来。

```yaml
# 配置编排文件
networks:
  work-network:
    external: false

services:
  ### work-gitea(3000) ### 
  gitea:
    image: gitea/gitea:1.21.1
    container_name: work-gitea
    environment:
      - USER_UID=1000
      - USER_GID=1000
      - GITEA__database__DB_TYPE=postgres
      - GITEA__database__HOST=work-gitea-db:5432
      - GITEA__database__NAME=gitea
      - GITEA__database__USER=gitea
      - GITEA__database__PASSWD=********
    restart: always
    networks:
      - work-network
    volumes:
      - /data/backup_data/gitea:/data
      - /etc/timezone:/etc/timezone:ro # 映射系统时区
      - /etc/localtime:/etc/localtime:ro # 映射实际时间
    ports:
      - "3000:3000"
      - "222:22"
    depends_on:
      - gitea-db

  gitea-db:
    image: postgres:14
    container_name: work-gitea-postgres
    restart: always
    environment:
      - POSTGRES_USER=gitea
      - POSTGRES_PASSWORD=********
      - POSTGRES_DB=gitea
    networks:
      - work-network
    volumes:
      - /data/backup_data/postgres:/var/lib/postgresql/data
     
```

#### 2.1.4.工作室共享文件设施

采用 [AList](https://alist.nn.ci/zh/) 来管理内部的共享文件，所有的文件都持久化存储在 `/data/backup_data/alist/file_data` 中，并且映射到容器内部的 `/data` 下。

```yaml
# 配置编排文件
networks:
  work-network:
    external: false

services:
  ### work-gitea(3000) ###
  # ...
  
  ### work-alist(5244) ### 
  alist:
    image: xhofe/alist:v3.41.0
    container_name: work-alist
    volumes:
      - /data/backup_data/alist:/opt/alist/data
      - /data/backup_data/alist/file_data:/data
    ports:
      - "5244:5244"
    environment:
      - PUID=0
      - PGID=0
      - UMASK=022
    restart: always

```

#### 2.1.5.工作室配置中心设施

采用 [Nacos](https://nacos.io/docs/latest/quickstart/quick-start/) 来作为配置中心，用来配置一些外部依赖，例如 `IP` 黑名单等配置。

```yaml
# 配置编排文件
networks:
  work-network:
    external: false

services:
  ### work-gitea(3000) ###
  # ...
  
  ### work-alist(5244) ### 
  # ...

  ### work-nacos(8848) ### 
  nacos:
    image: nacos/nacos-server:v2.5.0
    container_name: work-nacos-standalone
    environment:
      - PREFER_HOST_MODE=hostname
      - MODE=standalone
      - NACOS_AUTH_IDENTITY_KEY=serverIdentity
      - NACOS_AUTH_IDENTITY_VALUE=security
      - NACOS_AUTH_TOKEN=SecretKey012345678901234567890123456789012345678901234567890123456789
    volumes:
      - /data/backup_data/nacos/example/standalone-logs:/home/nacos/logs
    ports:
      - "8848:8848"
      - "9848:9848"
    restart: always
      
  prometheus:
    container_name: work-nacos-prometheus
    image: prom/prometheus:v3.1.0
    volumes:
      - /data/backup_data/nacos/example/prometheus/prometheus-standalone.yaml:/etc/prometheus/prometheus.yml
    ports:
      - "9098:9090"
    depends_on:
      - nacos
    restart: always

  grafana:
    container_name: work-nacos-grafana
    image: grafana/grafana:11.5.1
    ports:
      - "3020:3000"
    restart: always
    
```

#### 2.1.6.工作室图床资源设施

采用 [Minio](https://min.io/docs/minio/container/index.html) 来存储图片、视频等静态资源。

```shell
# 配置编排文件
networks:
  work-network:
    external: false

services:
  ### work-gitea(3000) ###
  # ...
  
  ### work-alist(5244) ###
  # ...

  ### work-nacos(8848) ###
  # ...
  
  ### work-minio(9001) ###
  minio:
    image: quay.io/minio/minio
    container_name: work-minio
    ports:
      - "9000:9000"
      - "9001:9001"
    volumes:
      - /data/backup_data/minio/data:/data
    environment:
      - MINIO_ROOT_USER=root
      - MINIO_ROOT_PASSWORD=********
    command: server /data --console-address ":9001"
    restart: always

```

### 2.2.工作室服务

## 4.启动指令



