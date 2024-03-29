---
title: 使用SSH公钥登录Linux服务器
createTime: 2020-04-15 10:00
tags: 运维 linux
abstract:
---

## 第一步检测自己的电脑是否已经生成了 SSH 公私钥

### ssh key 公私钥

- `id_rsa` 私钥文件；
- `id_rsa.pub` 公钥文件，都是用的这个文件。

### 存储目录

- windows 电脑

```sh
// 查看这个目录下是否有 id_rsa 和 id_rsa.pub
C:\Users\Administrator\.ssh
```

- mac 电脑 `~/.ssh`

```sh
// 查看这个目录下是否有 id_rsa 和 id_rsa.pub
ls -al ~/.ssh
```

## 第二步生成 ssh key

```sh
ssh-keygen -t rsa -C "your_email@example.com"
```

- `-t` 密钥类型 `rsa`
- `-C` 用于识别这个密钥的注释，一般填邮箱

**注意：** windows 电脑，可以先安装 git 后，在 git 命令行工具内执行上述命令。
mac 电脑则直接在终端执行即可。

## 第三步把生成的公钥文件复制到远程 linux 主机上

**注意：** `ssh-copy-id` 把密钥追加到远程主机的 `.ssh/authorized_keys` 上

```sh
# 用的ip替换
ssh-copy-id -i ~/.ssh/id_rsa.pub root@ip
```

## 执行成功之后，即可无需输入密码使用公钥直接登录服务器

```sh
ssh root@ip
```
