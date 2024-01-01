---
title: Webpack
createTime: 2023-12-31 20:24
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

## Loader 加载器

webpack 的核心，专注实现资源模块加载

### 常见的 loader

#### css-loader

#### style-loader

#### file-loader

原理是把静态资源复制到输出文件夹，然后返回对应的访问路径。

- 适用于大文件，提交加载速度

#### url-loader

原理是把资源转换成 `Data URLs` 引入。

`data:[<mediatype>][;base64],<data>`

![source-map](/assets/images/WX20231231-173258@2x.png)

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

### 开发一个 loader

```js
// markdown-loader.js
const marked = require("marked");

module.exports = (source) => {
  const html = marked(source);

  return `export default ${JSON.stringify(html)}`;
};
```

使用

```js
// webpack.config.js
{
  // ...
  module: {
    rules: [
      // ...
      {
        test: /.md$/,
        use: "./markdown-loader",
      },
    ];
  }
}
```

还可以交给 `html-loader` 处理

```js
// markdown-loader.js
const marked = require("marked");

module.exports = (source) => {
  return marked(source);
};
```

```js
// webpack.config.js
{
  // ...
  module: {
    rules: [
      // ...
      {
        test: /.md$/,
        use: ["html-loader", "./markdown-loader"],
      },
    ];
  }
}
```

## Plugin 插件

`Plugin` 用来解决处理资源加载以外，其他自动化工作，相比于 `Loader`，`Plugin` 拥有更宽的能力范围。

例如：

- 打包前，清除输出目录
- 拷贝静态文件到输出目录
- 压缩输出的代码

### 常用的插件

#### clean-webpack-plugin

清除输出目录文件夹

#### html-webpack-plugin

生成 `html` 文件

#### copy-webpack-plugin

拷贝静态文件到输出目录

### 开发一个插件

插件是一个函数或者是一个包含 `apply` 方法的对象，通过在生命周期的钩子中挂载函数实现扩展。

```js
class MyPlugin {
  apply(compiler) {
    compiler.hooks.emit.tap("MyPlugin", (compilation) => {
      // compilation 打包上下文
      for (const name in compilation.assets) {
        if (name.endsWith(".js")) {
          const content = compilation.assets[name].source();
          const withoutComments = content.replace(/\/\*\*+\*\//g, "");
          compilation.assets[name] = {
            source: () => withoutComments,
            size: () => withoutComments.length,
          };
        }
      }
    });
  }
}
```

## webpack-dev-server

高度集成的开发工具

## Source Map

解决了源代码与运行代码不一致所产生的问题

```js
// webpack.config.js
{
  // ...
  devtool: "source-map",
}
```

`Webpack` 提供一下集中关于 `Source Map` 的配置，对比如下：

![source-map](/assets/images/WX20240101-114419@2x.png)

模式的特点

- `eval` ：是否使用 eval 执行模块代码
- `cheap` ：`Source Map` 是否包含行信息
- `module` ：是否能够得到 `Loader` 处理之前的源代码

### eval 模式

原理是借助 `eval` 这个函数，定位出现错误的源文件。

```js
eval("console.log(123)");

eval("console.log(123) //# sourceURL=./foo/bar.js");
```

![demo](/assets/images/WX20240101-115832@2x.png)

### cheap-module-eval-source-map

### nosource-source-map

没有源代码，只会提供错误行、列信息

## HMR

全称 `Hot Module Replacement`，模块热替换

具体使用

```js
// webpack.config.js
const webpack = require('webpack')

{
  // ...
  devServer: {
    hot: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
}
```

样式文件的热更新开箱即用，是因为 `style-loader` 有处理

![参考](/assets/images/WX20240101-141855@2x.png)

`js` 文件还需要手动配置
 
```js
module.hot.accept('./editor', () => {
  // editor 模块更新，需要在这里处理热替换逻辑
})
```