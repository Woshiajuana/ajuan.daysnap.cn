---
title: 解决国内服务器无法连接GitHub的问题
createTime: 2023-07-03 18:04
tags: 运维
abstract: 一些国内的服务器无法连接上GitHub，导致下载GitHub上的一些软件总是失败。
---

## 第一步寻找可用 IP 地址

通过 [站长之家](https://ping.chinaz.com/github.com) 检查有哪些 GitHub 可用的 IP

## 第二步修改服务器端的 HOSTS

```sh
vi /etc/hosts
```

新增

```
199.232.28.133 github.com
199.232.28.133 raw.githubusercontent.com
```

如果发现还是不行的话，可以尝试换下其他 IP。
