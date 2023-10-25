---
title: docker基础入门
createTime: 2020-06-23 16:29
tags: 运维 docker
abstract:
---

## 安装

### mac 安装 docker

1. 安装 brew：

```shell
/bin/zsh -c "$(curl -fsSL https://gitee.com/cunkai/HomebrewCN/raw/master/Homebrew.sh)"
```

```shell
brew install --cask --appdir=/Applications docker
```

2. 设置

```json5
{
  "registry-mirrors": [
    "http://hub-mirror.c.163.com",
    "https://registry.docker-cn.com",
  ],
}
```

### linux 安装 docker

1. 卸载

```bash
sudo yum remove docker \
  docker-client \
  docker-client-latest \
  docker-common \
  docker-latest \
  docker-latest-logrotate \
  docker-logrotate \
  docker-engine
```

2. 设置 `yum` 工具包

```bash
yum install -y yum-utils
```

3. 设置镜像仓库

- 官方仓库（不推荐）

```bash
sudo yum-config-manager \
    --add-repo \
    https://download.docker.com/linux/centos/docker-ce.repo
```

- 阿里镜像仓库（推荐）

```bash
sudo yum-config-manager \
    --add-repo \
    http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
```

4. 安装 docker

```bash
# 安装docker-ce（社区版-免费的）
yum install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
```

5. 启动 docker

```bash
systemctl start docker
```

6. 查看版本

```bash
docker version
```

## 常用命令

```sh
# 启动、重启、停止
systemctl start docker
systemctl restart docker
systemctl stop docker
# 设置开机自动启动docker
systemctl enable docker.service
# 关闭开机自动启动
systemctl disable docker.service
# 查看是否设置开机启动
systemctl list-unit-files | grep enable
# 容器自启动要看两种情况
# 1.新建容器时配置自启参数
docker run --restart=always 容器id 或 容器名称
# 2.已存在的容器配置自启
docker update --restart=always 容器id 或 容器名称
# 3.取消容器自启
docker update --restart=no 容器id 或 容器名称
# 4.批量设置容器自启
docker update --restart=always $(docker ps -aq)

# docker拉取镜像，以mysql为例
docker pull mysql
# docker运行mysql
docker run --name mysql --restart=always -p 3306:3306 -e MYSQL_ROOT_PASSWORD=密码 -d mysql
# docker进入mysql容器
docker exec -it mysql /bin/bash
# 删除镜像mysql
docker rmi mysql
# 删除容器
docker rm mysql
# 停止容器
docker stop mysql
# 重启容器
docker restart mysql
# 更改容器别名
docker rename 原名 改后名
# 查询正在运行的容器列表
docker ps
# 查询所有的容器列表
docker ps -a
# 查看容器日志命令，查看从某个时间之后的日志
docker logs -f --since "2022-05-16" mysql
# 查看最近10条日志, 并持续打印
docker logs -f --tail 10 mysql
```

`docker run` 命令 ：创建一个新的容器并运行一个命令

`-a stdin`： 指定标准输入输出内容类型，可选 STDIN/STDOUT/STDERR 三项；
`-d`： 后台运行容器，并返回容器 ID；
`-i`： 以交互模式运行容器，通常与 -t 同时使用；
`-P`： 随机端口映射，容器内部端口随机映射到主机的端口
`-p`： 指定端口映射，格式为：主机(宿主)端口：容器端口
`-t`： 为容器重新分配一个伪输入终端，通常与 -i 同时使用；
`–name=“nginx-lb”`： 为容器指定一个名称；
`–dns 8.8.8.8`： 指定容器使用的 DNS 服务器，默认和宿主一致；
`–dns-search example.com`： 指定容器 DNS 搜索域名，默认和宿主一致；
`-h “mars”`： 指定容器的 hostname；
`-e username=“ritchie”`： 设置环境变量；
`–env-file=[]`： 从指定文件读入环境变量；
`–cpuset=“0-2” or --cpuset=“0,1,2”`： 绑定容器到指定 CPU 运行； \**-m 😗*设置容器使用内存最大值；
`–net=“bridge”`： 指定容器的网络连接类型，支持 bridge/host/none/container： 四种类型；
`–link=[]`： 添加链接到另一个容器；
`–expose=[]`： 开放一个端口或一组端口；
`–volume , -v`： 绑定一个卷
`--appendonly yes`：运行 Docker 容器时启用附加模式（append-only mode），这意味着对容器内的文件进行写操作时，只能追加数据而不能覆盖或删除原有的数据。这种模式有助于确保容器数据的持久性和一致性。

## 创建 redis 服务

```sh
docker run --restart=always \
--log-opt max-size=100m \
--log-opt max-file=2 \
-p 6379:6379 \
--name myredis \
-v /data/redis/redis.conf:/etc/redis/redis.conf \
-v /data/redis/data:/data \
-d redis redis-server /etc/redis/redis.conf \
--appendonly yes \
--requirepass ds2023
```

## 创建 mysql 服务

```sh
docker run -d --name mysql \
-v /data/mysql:/var/lib/mysql \
-e MYSQL_ROOT_PASSWORD=qq111111 \
-e MYSQL_DATABASE=daysnap \
-e MYSQL_USER=daysnap \
-e MYSQL_PASSWORD=ds2023 \
-p 3306:3306 \
mysql --default-authentication-plugin=mysql_native_password
```
