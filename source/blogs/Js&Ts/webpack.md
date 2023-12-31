---
title: Webpack
createTime: 2023-12-31 16:36
tags: js
abstract:
---

`webpack` 是模块打包器

## 模块加载方式

- 遵循 `ES Modules` 标准的 `import` 声明
- 遵循 `CommonJS` 标准的 `require` 函数
- 遵循 `AMD` 标准的 `define` 函数和 `require` 函数
- - 样式代码中的 `@import` 指令和 `url` 函数
- - `HTML` 代码中图片标签的 `src` 属性

## loader 加载器

webpack 的核心

### 常见的 loader

#### css-loader

#### style-loader

#### file-loader

原理是把静态资源复制到输出文件夹，然后返回对应的访问路径。

- 适用于大文件，提交加载速度

#### url-loader

原理是把资源转换成 `Data URLs` 引入。

`data:[<mediatype>][;base64],<data>`

```
// 解析 html
data:text/html;charset=UTF-8,<h1>html content</h1>

// 解析图片
data:image/png;base64,iVxdasdad...
```

- 适合体积比较小的资源打包，减少请求次数

实际开发中，具体的配置

```js
// webpack.config.js
{
  // ...
  module: {
    rules: [
      // ...
      {
        test: /.png$/,
        use: {
          loader: "url-loader",
          options: {
            // 超出 10kb 的文件单独提取存放
            // 小于 10kb 的文件转换成 Data URLs 嵌入代码中
            limit: 10 * 1024, // 10kb
          },
        },
      },
    ];
  }
}
```

**注意：** `url-loader` 依赖 `file-loader`，对于超过限制的文件的处理，底层 `url-loader` 还是会交给 `file-loader` 去处理。

#### html-loader

处理 `HTML` 代码中图片标签的 `src` 属性

```js
// webpack.config.js
{
  // ...
  module: {
    rules: [
      // . ..
      {
        test: /.html$/,
        use: {
          loader: "html-loader",
          options: {
            attrs: ["img:src"],
          },
        },
      },
    ];
  }
}
```

#### eslint-loader

用于代码检测、规范校验

#### babel-loader

用于转换 `js` 新特性，兼容老的浏览器，依赖 `babel`。

- `@babel/core`
- `@babel/preset-env`

```js
// webpack.config.js
{
  // ...
  module: {
    rules: [
      // ...
      {
        test: /.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ];
  }
}
```
