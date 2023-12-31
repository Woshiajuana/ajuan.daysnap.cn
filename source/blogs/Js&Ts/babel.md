---
title: Babel
createTime: 2023-12-31 16:36
tags: js
abstract:
---

babel 是基于插件的机制去实现的


## 常用包

### `@babel/core` 

`babel` 的核心

### `@babel/preset-env`

一堆插件的集合

| Babel 插件        | JS 新特性 |
| ----------------- | :-------- |
| `arrow-functions` | 箭头函数  |
| `classes`         | 类        |
| `destructuring`   | 结构      |
| `module-commonjs` | ES Module |
| `etc`             | 其他特性  |

```sh
babel-node index.js --presets=@babel/preset-env
```