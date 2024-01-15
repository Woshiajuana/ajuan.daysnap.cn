---
title: Babel
createTime: 2023-12-31 16:36
tags: js
abstract:
---

babel 是基于插件的机制去实现的

## `@babel/core`

`babel` 的核心，主要分为三步：

- `parsing`：解析，依赖的 `@babel/parser` 负责将代码进行语法分析、词法分析后转换成抽象语法树 `AST`。
- `transforming`：转化，`@babel/traverse` 来遍历 `AST` 并进行节点的操作，用它提供的 API 来编写对 `AST` 的遍历和修改逻辑，由此来将一种 `AST` 转换为另一种 `AST`
- `generating`：生成，`@babel/generator` 负责通过 `AST` 树生成 `ES5` 代码

第二步的转化是重中之重，`babel` 的插件机制也是在这一步发挥作用的，`plugins` 在这里进行操作，转化成新的 `AST`，再交给第三步的 `@babel/generator` 。 所以如果没有这些 `plugins` 进驻平台，那么 `babel` 这个“平台”是不具备任何能力的。

而这整个过程，由 `@babel/core` 负责编译过程的控制和管理。它会调用其他模块来解析、转换和生成代码。

### `@babel/cli`

支持在终端使用 `babel`

```sh
# 正常
npx babel src --out-dir build

# 支持插件
npx babel src --out-dir build --plugins=@babel/plugin-transform-arrow-functions,@babel/plugin-transform-block-scoping
```

## `@babel/preset-env`

预设，一堆插件的集合。

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
// babel.config.js
{
  "presets": [
    [
      "@babel/preset-env",
      {
        // 实现按需加载
        "useBuiltIns": "usage",
        "corejs": {
          "version": 3
        }
      }
    ]
  ],
  "plugins": []
}
```

也可以根据配置文件 `.browserslistrc` 对代码进行降级处理：（推荐）：

```
// .browserslistrc
> 1%
lasted
```

### useBuiltIns 选项

- `usage`：代码中不用主动 import，需要指定 `corejs` 版本
  - browserslist 环境（目标浏览器）不支持的
  - 代码里已使用到的
- `entry`：代码中需要主动 `import 'core-js/stable'` ，需要指定 `corejs` 版本，如果在使用 `7.18.0` 版本以下的 `@babel/core`，还需要额外再引入一个包 `regenerator-runtime`
  - browserslist 环境（目标浏览器）不支持的
- `false`：默认，只做了语法转换，不会导入任何 `polyfill` 进来，并且 `corejs` 配置将无效

### corejs 选项

- `Type`: `string` 或 `{ version: string, proposals: boolean }` ，默认为 `"2.0"` 。 `version` 字符串可以是任何支持的 `core-js` 版本。例如 `"3.8"` 或 `"2.0"` 。
- 仅在与 `useBuiltIns: usage` 或 `useBuiltIns: entry` 一起使用时才有效
- `proposals` 的意思是还在提案中，但是还没有正式发布的语法，设为 `true` 即可使用这些语法

## `@babel/plugin-transform-runtime`

改包还依赖 `@babel/runtime`。

- `@babel/runtime`（在对一些语法进行编译的时候，babel 需要借助一些辅助函数）

- `@babel/plugin-transform-runtime` 该插件会开启对 `Babel` 注入的辅助函数的复用，以节省代码体积，这些辅助函数被统一隔离在 `@babel/runtime` 中提供的 `helper` 模块中，编译时，直接从 `helper` 模块加载

`@babel/plugin-transform-runtime` 通常仅在开发时使用，但是运行时最终代码需要依赖 `@babel/runtime`，所以 `@babel/runtime` 必须要作为生产依赖被安装

```js
{
  "presets": ["@babel/preset-env"],
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        // 不同版本区别后面会说
        "corejs": { "version": 3 }
      }
    ]
  ]
}
```

`@babel/plugin-transform-runtime` 解决的问题：

- 对辅助函数的复用，解决代码冗余问题
- 解决全局变量污染问题
- 提供 polyfill，并且是根据代码使用情况导入+目标浏览器来提供，相当于@babel/preset-env 中的"useBuiltIns": "usage"【后面的@babel/plugin-transform-runtime 章节会验证】

## `@babel/preset-typescript`

处理 `ts` 语法

```json
// package.json
{
  "script": {
    "check": "tsc --noEmit"
  }
}
```

## `@babel/preset-react`

处理 `jsx` 语法

```js
// babel.config.js
module.exports = {
  presets: ["@babel/preset-env", "@babel/preset-react"],
};
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

## 参考

- [一文掌握 Babel 来龙去脉、三大脚手架中使用 Babel](https://juejin.cn/post/7284144079716728873?searchId=20240115135400B8C3EB3001786412FDBE)
