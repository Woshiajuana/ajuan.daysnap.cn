---
title: pnpm的使用
createTime: 2022-06-01 14:23
tags: npm pnpm
abstract: 本文主要记录下 pnpm 包管理工具的基础使用、常用命令。
---

> [官网地址](https://www.pnpm.cn/)

## 特点

节省大量的硬盘空间，安装速度也大大提高。

![一图概括](/assets/images/9cac3aa225ee500fdbe7b9192061e07b.jpeg)

## 常用命令

- `pnpm add <pkg>`
  安装依赖包到 `dependencies`

- `pnpm add -D <pkg>`
  安装依赖包到 `devDependencies`

- `pnpm add -O <pkg>`
  安装依赖包到 `optionalDependencies`

- `pnpm store path`
  查看 store 存储目录的路径

更多详细命令参考官网。

## monorepo 工程

- 新建一个 `pnpm-workspace.yaml` 配置文件

```yaml
packages:
  # packages下的直接子目录
  - "packages/*"
  # components下的所有递归子目录
  - "components/**"
  # 排除test目录
  - "!**/test/**"
```

- -w, --workspace-root

显式添加 `-w` 参数表示你知道是要把这依赖安装在全局的

```bash
pnpm install lodash -w
```

- 局部的依赖管理

```bash
# 安装 axios 到 project-1 子工程下
pnpm add axios --filter project-1

# 把 axios 安装到所有子工程下
pnpm install axios -r

# 更新所有工程下的包
pnpm up @daysnap/utils --latest -r
```

- -C <path>, --dir <path>

将 <path> 设置为 pnpm 的运行目录，而不是当前目录。
