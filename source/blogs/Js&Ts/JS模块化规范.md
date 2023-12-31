---
title: JS 的模块化规范
createTime: 2023-12-31 14:30
tags: js
abstract: 模块化规范是用于组织和管理 JavaScript 代码的一套约定。它们旨在使代码更易于维护、扩展和重用。
---

## CommonJs

- 通常用于服务端的 `Nodejs` 中，`Nodejs`的内置模块规范
- 同步加载模块
- 一个文件就是一个模块
- 每个模块都有单独的作用域
- 通过 `module.exports` 导出成员
- 通过 `require` 函数载入模块

## AMD

全称 `Asynchronous Module Definition`

- 异步加载
- 服务浏览器端
- `require.js` 就是基于 `AMD` 规范。他的基本原理就是动态创建 `script` 标签引入。

```js
// 定义一个模块
define("module1", ["jquery", "module2"], function ($, module2) {
  return {
    start: function () {
      // ...
      module2.method();
    },
  };
});

// 载入一个模块
require(["module1"], function (module1) {
  module1.start();
});
```

## CMD

跟 `AMD` 类似，写法不同

- 异步加载
- 服务浏览器端
- `sea.js` 基于这个实现，主要是为了让写法跟 `CommonJs` 类似

```js
define(function (require, exports, module) {
  // 通过 require 引入依赖
  var $ = require("jquery");

  // 通过 exports 对外提供接口
  exports.method = function () {
    // ...
  };

  // 通过 module.exports 提供整个接口
  module.exports = {
    // ...
  };
});
```

## UMD

- 通用模块定义规范（`Universal Module Definition`）
- 它可以通过运行时或者编译时，让同一个代码模块在使用 `CommonJs`、`CMD` 甚至是 `AMD` 的项目中运行
- 它没有自己的专有规范，它是在定义模块的时候检测当前使用环境和模块的定义方式，将各种模块化定义方式转化为同样一种写法

```js
function(e, t) {
    "object" == typeof exports && "object" == typeof module
    ? module.exports = t()
    : "function" == typeof define && define.amd
        ? define([], t)
        : "object" == typeof exports
            ? exports.xmh = t()
            : e.xmh = t()
} (window, (function() {
    // todo
}))
```

## ES Module

- `ES6` 终于从语言层面定义了模块化规范
- `import` 加载模块，
- `export` 导出模块
- 主流浏览器直接支持这个规范

```html
// 自动采用严格模式 // 通过给 script 添加 type=module 属性，就可以以 ES Module
的标准执行 JS 代码了
<script type="module"></script>
```

几个特性：

- `ESM` 自动采用严格模式，忽略 `use strict`
- 每个 `module` 都是运行在单独的私有作用域中
- `ESM` 是通过 `CORS` 的方式请求外部 `JS` 模块的
- 不支持文件的形式访问，所有需要启动一个 `http server` 来进行访问
- `ESM` 的 `script` 标签会延迟执行脚本，等同于 `script` 标签的 `defer` 属性。
