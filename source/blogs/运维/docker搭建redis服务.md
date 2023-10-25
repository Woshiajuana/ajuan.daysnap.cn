---
title: docker搭建redis服务
createTime: 2023-06-19 22:29
tags: 运维 docker
abstract:
---

## 操作步骤

1. 拉取 `redis` 镜像

```bash
docker pull redis
```

2. 挂载配置

- 挂载 `redis` 的配置文件
- 挂载 `redis` 的持久化文件(为了数据的持久化)

```bash
docker run --restart=always \
--log-opt max-size=100m \
--log-opt max-file=2 \
-p 6379:6379 \
--name myredis \
-v /home/redis/myredis/myredis.conf:/etc/redis/redis.conf \
-v /home/redis/myredis/data:/data \
-d redis redis-server /etc/redis/redis.conf \
--appendonly yes \
--requirepass 000415
```

参数解释：

- `--restart=always` 总是开机启动
- `--log`是日志方面的
- `-p 6379:6379` 将端口挂载出去
- `--name` 给这个容器取一个名字
- `-v` 数据卷挂载
  - /home/redis/myredis/myredis.conf:/etc/redis/redis.conf 这里是将 liunx 路径下的 myredis.conf 和 redis 下的 redis.conf 挂载在一起。
  - /home/redis/myredis/data:/data 这个同上
- `-d redis` 表示后台启动 redis
- `redis-server` /etc/redis/redis.conf 以配置文件启动 redis，加载容器内的 conf 文件，最终找到的是挂载的目录 /etc/redis/redis.conf 也就是 liunx 下的/home/redis/myredis/myredis.conf
- `–appendonly` yes 开启 redis 持久化
- `–requirepass` 123456 设置密码

3. 查看启动状态

```bash
docker ps -a | grep myredis
```

4. 查看容器运行日志

```bash
docker logs --since 30m <容器名>
```

`--since 30m` 查看 30 分钟内的日志

5. 连接容器内部

```bash
docker exec -it myredis redis-cli
```

验证密码

```bash
auth 123456
```

## 配置文件

myreids.conf

```bash
protected-mode no
port 6379
tcp-backlog 511
requirepass 000415
timeout 0
tcp-keepalive 300
daemonize no
supervised no
pidfile /var/run/redis_6379.pid
loglevel notice
logfile ""
databases 30
always-show-logo yes
save 900 1
save 300 10
save 60 10000
stop-writes-on-bgsave-error yes
rdbcompression yes
rdbchecksum yes
dbfilename dump.rdb
dir ./
replica-serve-stale-data yes
replica-read-only yes
repl-diskless-sync no
repl-disable-tcp-nodelay no
replica-priority 100
lazyfree-lazy-eviction no
lazyfree-lazy-expire no
lazyfree-lazy-server-del no
replica-lazy-flush no
appendonly yes
appendfilename "appendonly.aof"
no-appendfsync-on-rewrite no
auto-aof-rewrite-percentage 100
auto-aof-rewrite-min-size 64mb
aof-load-truncated yes
aof-use-rdb-preamble yes
lua-time-limit 5000
slowlog-max-len 128
notify-keyspace-events ""
hash-max-ziplist-entries 512
hash-max-ziplist-value 64
list-max-ziplist-size -2
list-compress-depth 0
set-max-intset-entries 512
zset-max-ziplist-entries 128
zset-max-ziplist-value 64
hll-sparse-max-bytes 3000
stream-node-max-bytes 4096
stream-node-max-entries 100
activerehashing yes
hz 10
dynamic-hz yes
aof-rewrite-incremental-fsync yes
rdb-save-incremental-fsync yes
```

## 参考文档

- https://blog.csdn.net/weixin_45821811/article/details/116211724
