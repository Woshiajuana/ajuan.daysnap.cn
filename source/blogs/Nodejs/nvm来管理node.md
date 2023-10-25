---
title: nvm 来管理 node
createTime: 2023-10-25 09:24
tags: node nvm
abstract: nvm 来管理 node
---

## 安装

下载

```sh
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash

// or
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
```

这行脚本执行了

```
=> Downloading nvm as script to '/root/.nvm'

=> Appending nvm source string to /root/.bashrc
=> Appending bash_completion source string to /root/.bashrc
=> Close and reopen your terminal to start using nvm or run the following to use it now:

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
```

这里可以选择重新打开终端接口使用 `nvm` 命令了。

详情可参考 [Github 传送门](https://github.com/nvm-sh/nvm)

## 使用

- 列出所需要的版本

```sh
nvm list-remote
```

- 安装相应的版本

```sh
nvm install v8.14.0
```

- 查看已安装的版本

```sh
nvm list
```

- 切换版本

```sh
nvm use v8.14.0
```

- 设置默认版本

```sh
nvm alias default v8.14.0
```

## 其他

- Mac 解决 brew 一直卡在 Updating Homebrew

```sh
# 1. 编辑配置文件
vim ~/.bash_profile

# 2. 文件内新增一行
export HOMEBREW_NO_AUTO_UPDATE=true

# 3. 重新加载配置文件
source ~/.bash_profile
```
