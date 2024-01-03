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

- 可以处理 `url`

```css
.bg {
  width: 100px;
  height: 100px;
  background: url(img/1.png);
}
```

- 可以处理 `@import`

```css
@import "reset.css";
.bg {
  // ...
}
```

实现原理就是，遇到背景图的时候会转换成 `require` 语法引入图片

#### style-loader

#### postcss-loader

- `postcss`：利用 `javascript` 来转换 `css`
- `postcss-cli`：可以在终端中使用 `postcss`
- `autoprefixer`：给 `css` 添加兼容前缀
- `postcss-preset-env`：不同插件的集合，即可以处理前缀、又可以处理 `css` 新特性。他里面包含了 `autoprefixer` 插件

```css
/*css 新特性*/
.color {
  /*前6位是颜色值，后2位是透明度*/
  color: #12345688;
}
```

配置

```js
// webpack.config.js
{
  test: /\.css$/,
  exclude: /node_modules/,
  use: [
    {
      loader: MiniCssExtractPlugin.loader,
    },
    {
      loader: 'css-loader',
      options: {
        // https://webpack.docschina.org/loaders/css-loader#importloaders
        // https://stackoverflow.com/questions/52544620/what-is-exactly-the-importloaders-option-of-css-loader-in-webpack-4
        importLoaders: 1,
      },
    },
    'postcss-loader',
  ],
}
```

对应的配置文件

```js
// postcss.config.js
module.exports = {
  plugins: ["postcss-preset-env"],
};
```

#### file-loader

原理是把静态资源复制到输出文件夹，然后返回对应的访问路径。

- 适用于大文件，提交加载速度

```js
// webpack.config.js
{
  module: {
    // ...
    rules: [
      // ...
      {
        test: /\.(png|svg|gif|jpe?g)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "img/[name].[contenthash:8].[ext]",
              // outputPath: 'img',
            },
          },
        ],
      },
    ];
  }
}
```

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

#### asset module type

`webpack5` 内置的一个模块，支持处理图片等静态资源文件。

- `asset` 判断走最优的模式，需要配置 `parser`
- `asset/resource`：原理是把静态资源复制到输出文件夹，然后返回对应的访问路径。
- `asset/inline`：`Data URLs` 的形式引入资源文件
- `asset/source`：`raw-loader`

```js
// webpack.config.js
{
  // ...
  output: {
    // ...
    // 这里是全局配置
    // assetModuleFilename: 'img/[name].[contenthash:8][ext]'
  },
  module: {
    rules: [
      // ...
      {
        test: /.png$/,
        type: 'asset',
        generator: {
          filename: 'assets/img/[name].[contenthash:10][ext]',
        },
        parser: {
          dataUrlCondition: {
            maxSize: 30 * 1024,
          }
        }
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

```js
// webpack.config.js
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "public",
          // to: 'dist', 可以去掉 默认会找 output.path
          globOptions: {
            // index.html 资源 实际会被 html-webpack-plugin 输出到 output 中，如果这里不忽略，会导致重复报错
            ignore: ["**/index.html"],
          },
        },
      ],
    }),
  ],
};
```

#### mini-css-extract-plugin

提取 `css` 样式到一个文件中

```js
// webpack.config.js
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  module: {
    rules: [
      // ...
      {
        test: /.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  plugins: [new MiniCssExtractPlugin()],
};
```

#### optimize-css-assets-webpack-plugin

压缩 `css` 文件

```
// webpack.config.js
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
  module: {
    rules: [
      // ...
      {
        test: /.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new OptimizeCssAssetsWebpackPlugin(),
  ],
};
```

推荐是在 `optimization.minimizer` 中，当开启压缩才工作

```js
// webpack.config.js
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");

module.exports = {
  module: {
    rules: [
      // ...
      {
        test: /.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  optimization: {
    // 推荐 压缩类的 都放这里
    minimizer: [
      new OptimizeCssAssetsWebpackPlugin(),
      // 当这边重新 minimizer ，webpack 内置的压缩插件会被覆盖，需要添加回来
      new TerserWebpackPlugin(),
    ],
  },
  plugins: [new MiniCssExtractPlugin()],
};
```

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

可以借助 `webpack-cli` 启动 `webpack-dev-server`

```json
// package.json
{
  "script": {
    "serve": "webpack serve"
  }
}
```

也可以直接启动

```json
// package.json
{
  "script": {
    "serve": "webpack-dev-server"
  }
}
```

具体配置

```js
// webpack.config.js
const webpack = require('webpack')

{
  // ...
  devServer: {
    hot: false, // 热更新 默认 false
    // 在构建失败时不刷新页面作为回退，使用 hot: 'only'：
    hotOnly: false, // 默认 false
    port: 8080, // 端口
    contentBase: path.resolve(__dirname, 'public'),
    watchContentBase: true,
    open: false,
    compress: true, // 压缩 默认false

    // 任意的 404 响应都会被替代为 index.html。主要是为了支持 `history` 路由
    historyApiFallback: true,

    // 代理
    proxy: {
      '/api': {
        target: 'https://api.github.com',
        pathRewrite: {
          "^/api": "",
        },
        // 防止服务端校验来源 `Host`
        changeOrigin: true,
      },
    }
  },
}
```

## webpack-dev-middleware

可以对打包开发做自由度很高的定制

```js
const express = require("express");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpack = require("webpack");

const app = express();

// 获取配置文件
const config = require("./webpack.config.js");
const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler));

// 开启端口上的服务
app.listen(3000, () => {
  console.log("服务运行在 3000 端口上");
});
```

## Source Map

> `[inline-|hidden-|eval-][nosources-][cheap-[module-]]source-map`

解决了源代码与运行代码不一致所产生的问题，在调试的时候可以定位到源代码中的信息。

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
module.hot.accept("./editor", () => {
  // editor 模块更新，需要在这里处理热替换逻辑
});
```

处理资源文件

```js
module.hot.accept("./better.png", () => {
  // ...
});
```

### react 组件热更新

1. 安装依赖

```sh
npm install -D @pmmmwh/react-refresh-webpack-plugin react-refresh
```

2. 配置 `webpack.config.js`

```js
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = {
  target: "web",
  devServer: {
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
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
    ]
  }
  plugins: [new ReactRefreshWebpackPlugin()],
};
```

3. 配置 `babel.config.js`

```js
module.exports = {
  presets: ["@babel/preset-env", "@babel/preset-react"],
  plugins: ["react-refresh/babel"],
};
```

### vue2 组件热更新

1. 安装依赖

```sh
npm install vue-loader -D

# 解析模板语法
npm install vue-template-compiler -D
```

2. `vue-loader` 对于 `vue` 组件热更新开箱即用

```js
// webpack.config.js
module.exports = {
  target: "web",
  devServer: {
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.vue?$/,
        use: ["babel-loader", "vue-loader"],
      },
    ],
  },
};
```

3. 如果 `vue-loader` 是 15+，则需要手动引入下 `plugin`

```js
// webpack.config.js
const VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = {
  target: "web",
  devServer: {
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.vue?$/,
        use: ["babel-loader", "vue-loader"],
      },
    ],
  },
  plugins: [new VueLoaderPlugin()],
};
```

## DefinePlugin

为代码注入全局成员，全局注入一个 `process.env.NODE_ENV` 的变量

```js
// webpack.config.js
const webpack = require("webpack");

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      // BASE_URL: '"https://www.baidu.com"'
      BASE_URL: JSON.stringify("https://www.baidu.com"),
    }),
  ],
};
```

## Tree Shaking

去除未引用代码(`dead-code`)，生产模式下自动开启。

实际手动配置原理：

```js
// webpack.config.js
{
  optimization: {
    usedExports: true, // 使用才会导出，标记没有导出的代码
    minimize: true, // 负责删除没有导出使用的代码
    sideEffects: true,
  },

  module: {
    rules: [
      {
        test: /.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              // 如果使用了 babel，则需要关闭插件 modules 模块转换功能，不然 Tree Shaking 可能不会起效果，新版本的 babel-loader 以及 @babel/preset-env 内部已经根据webpack的版本自动禁用了 modules
              ['@babel/preset-env', {modules: false}]
            ]
          }
        }
      }
    ]
  }
}
```

### sideEffects

副作用：模块执行时，除了导出成员之外所做的事情

```js
// webpack.config.js
{
  optimization: {
    // 生产模式下 默认打开
    sideEffects: true,
  },
}

// package.json 声明副作用文件
{
  "slideEffects": [
    //...
    "*.css"
  ]
}
```

## optimization

```js
// webpack.config.js
{
  optimization: {
    usedExports: true, // 使用才会导出，标记没有导出的代码
    minimize: true, // 负责删除没有导出使用的代码

    // 尽可能将所有模块合并输出到一个函数中，这样既提升运行效率，又减少代码体积。这个又叫做 `Scope Hoisting` 作用域提升
    concatenateModules: true,
  }
}
```

## Code Splitting 分包/代码分割

```js
{
  optimization: {
    splitChunks: {
      chunks: 'all',
    }
  }
}
```

### 多入口打包

### 动态导入

动态导入的模块会被自动分包

```js
import(/* webpackChunkName: 'posts' */ "./posts/posts").then(
  ({ default: posts }) => {
    posts();
  }
);
```

相同的 `webpackChunkName` 会被打包到一起

## 文件 Hash

三种方式

- `hash` ：项目级别的

```js
{
  output: {
    filename: "[name]-[hash].bundle.js";
  }
}
```

- `chunkhash`：`chunk` 级别的

```js
{
  output: {
    filename: "[name]-[chunkhash].bundle.js";
  }
}
```

- `contenthash`：文件级别的，推荐

```js
{
  output: {
    filename: "[name]-[contenthash].bundle.js";
  }
}
```

修改长度

```js
{
  output: {
    filename: "[name]-[contenthash:8].bundle.js";
  }
}
```

## 占位符

- `[ext]`：扩展名
- `[name]`：文件名
- `[hash]`：hash
- `[chunkhash]`：文件内容 `chunkhash`
- `[contenthash]`：文件内容 `contenthash`
- `[path]`：文件路径
