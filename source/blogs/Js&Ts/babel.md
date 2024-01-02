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

### `@babel/cli`

支持在终端使用 `babel`

```sh
# 正常
npx babel src --out-dir build

# 支持插件
npx babel src --out-dir build --plugins=@babel/plugin-transform-arrow-functions,@babel/plugin-transform-block-scoping
```

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
npx babel src --out-dir build --presets=@babel/preset-env
```

在 webpack 中使用

```js
{
  test: /\.js$/,
  use: [
    {
      loader: 'babel-loader',
      options: {
        presets: [
          [
            '@babel/preset-env',
            { targets: 'chrome 91' }
          ]
        ]
      }
    }
  ]
}
```

也可以根据配置文件 `.browserslistrc` 对代码进行降级处理：（推荐）：

```
// .browserslistrc
> 1%
lasted
```

## polyfill 配置

```js
// babel.config.js
module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        // false：默认选项，不对当前的 js 处理做 polyfill 的填充
        // usage：根据代码中使用到的新语法、api，来做填充，按需引用
        // entry：根据 `.browserslistrc` 来整体填充
        useBuiltIns: false,
        corejs: 3,
      },
    ],
  ],
};
```

`useBuiltIns: entry` 时，需要在主入口引入

```js
import "core-js/stable";
import "regenerator-runtime/runtime";
```
