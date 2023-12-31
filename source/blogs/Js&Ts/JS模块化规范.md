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

```js
// 加载模块函数
console.log(require);

// 模块对象
console.log(module);

// 导出对象别名
console.log(exports);

// 当前文件绝对路径
console.log(__filename);

// 当前文件所在目录
console.log(__dirname);
```

实现原理：`CommonJs` 代码会把读取的文件包装成一个函数，从而实现私有模块作用域

[源代码](https://github.com/nodejs/node/blob/main/lib/internal/modules/cjs/loader.js#fL297-L304)

```
/**
 * Add the CommonJS wrapper around a module's source code.
 * @param {string} script Module source code
 */
let wrap = function(script) { // eslint-disable-line func-style
  return Module.wrapper[0] + script + Module.wrapper[1];
};

const wrapper = [
  '(function (exports, require, module, __filename, __dirname) { ',
  '\n});',
];
```

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
- `export` 导出模块，导出的是变量的引用，且不可修改
- 主流浏览器直接支持这个规范

```html
// 自动采用严格模式 // 通过给 script 添加 type=module 属性，就可以以 ES Module
的标准执行 JS 代码了
<script type="module"></script>
```

### 几个特性：

- `ESM` 自动采用严格模式，忽略 `use strict`
- 每个 `module` 都是运行在单独的私有作用域中
- `ESM` 是通过 `CORS` 的方式请求外部 `JS` 模块的
- 不支持文件的形式访问，所有需要启动一个 `http server` 来进行访问
- `ESM` 的 `script` 标签会延迟执行脚本，等同于 `script` 标签的 `defer` 属性。

### 兼容性处理

有的浏览器不支持 `ESM` 规范，可以使用以下 `js` 库进行兼容

- `browser-es-module-loader`

```html
<script src="https://unpkg.com/browse/browser-es-module-loader@0.4.1/dist/babel-browser-build.js"></script>
<script src="https://unpkg.com/browser-es-module-loader@0.4.1/dist/browser-es-module-loader.js"></script>
```

`IE` 不支持 `promise`，所以还得加个 `promise polyfill` 兼容

```html
<script src="https://unpkg.com/promise-polyfill@8.3.0/dist/polyfill.min.js"></script>
```

兼容实现原理，`browser-es-module-loader` 会把 <script type="module"> 里的内容，交给 `babel` 进行处理转换。对于那种 `import` 进来的文件，则进行 `ajax` 请求到文件后，再交给 `babel` 进行转换。

然而加了这些兼容之后，在那些本身支持 `ESM` 规范的浏览器，就会出现代码被执行两次的情况。这个时候可以在 `<script>` 标签上增加一个 `nomodule` 的属性。支持 `ESM` 的浏览器不会去执行带有 `nomodule` 属性的脚本

```html
<script
  nomodule
  src="https://unpkg.com/promise-polyfill@8.3.0/dist/polyfill.min.js"
></script>
<script
  nomodule
  src="https://unpkg.com/browse/browser-es-module-loader@0.4.1/dist/babel-browser-build.js"
></script>
<script
  nomodule
  src="https://unpkg.com/browser-es-module-loader@0.4.1/dist/browser-es-module-loader.js"
></script>
```

### 在 nodejs 环境中

- 在 `8+` 版本以实验性功能支持了 `ES Module`

```sh
node --experimental-modules index.mjs
```

- 在 `12+` 版本，支持 `package.json` 里新增 `type: "module"` 的形式，开启 `ES Module`

特性：

- `ES Module` 中可以导入 `CommonJS` 模块
- `CommonJS` 中不能导入 `ES Module` 模块
- `CommonJS` 始终只会导出一个默认成员
- 注意 `import` 不是解构导出对象

没有 `__filename` 和 `__dirname`，可以用 `import.meta.url` 代替

```js
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
```
