---
title: sudo 配置
createTime: 2020-05-01 13:00
tags: 运维 linux
abstract:
---

## sudo 权限的含义

> root 把本来只能超级用户执行的命令赋予普通用户执行

## 配置 sudo

```
# 实际修改的是/etc/sudoers文件
visudo
```

![第一步](images/20171110201529022.png)

```
# 添加
daysnap ALL=(ALL) ALL

# 无需密码
daysnap ALL=(ALL) nopasswd ALL
```

```
# 先切换到用户
su - daysnap
```

```
# 查看该用户所拥有的sudo的权限
sudo -l
```

## 禁止 root 用户远程登录

需要编辑 `/etc/ssh/sshd_config`

```
vim /etc/ssh/sshd_config
```

找到 `PermitRootLogin`

改为 `PermitRootLogin no`

重启

```
service sshd restart
```

## 参考

[博文](https://blog.csdn.net/capecape/article/details/78503184)
