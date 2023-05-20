---
title: HTML5新特性
createTime: 2018-01-01 12:22
updateTime: 2023-05-19 22:47
tags: http http5
abstract: 2014年10月29日，万维网联盟宣布，经过接近8年的艰苦努力，HTML5标准规范终于制定完成。
---

## 简介

> 2014 年 10 月 29 日，万维网联盟宣布，经过接近 8 年的艰苦努力，HTML5 标准规范终于制定完成。

## 新特性

`Html5` 是应用超文本标记语言(Html)的第五个版本，是为了适应移动互联网时代产生的。新特性有很多，主要列举下以下几种：

### 新的文档声明

```
<!DOCTYPE html>
```

### 脚本和链接无需设置 `type` 属性

```
<link rel="stylesheet" href="path/to/stylesheet.css"/>  //引入样式
<script src="path/to/script.js"></script>               //引入js
```

### 语义化标签

语义化标签是的页面的内容结构化、清晰、见名知义。
| 标签 | 描述 |
| :-------------------: | :-------------------------: |
| \<header>\</header> | 头部区域 |
| \<footer>\</footer> | 尾部区域 |
| \<nav>\</nav> | 导航 |
| \<section>\</section> | 节（section、区段） |
| \<article>\</article> | 独立的内容区域 |
| \<aside>\</aside> | 侧边栏内容 |
| \<detailes>\</detailes> | 某个部分的细节 |
| \<summary>\</summary> | 标签包含 details 元素的标题 |
| \<dialog>\</dialog> | 对话框 |

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title></title>
  </head>
  <body>
    <header>
      <h1></h1>
    </header>
    <nav></nav>
    <article>
      <section></section>
    </article>
    <aside></aside>
    <footer></footer>
  </body>
</html>
```

### 绘画 canvas

标签只是图形容器，必须使用脚本来绘制图形

1. 创建一个画布，一个画布在网页中是一个矩形框，通过 `<canvas>` 元素来绘制。

```html
<canvas id="myCanvas" width="200" height="200"></canvas>
```

2. 使用 `js` 来绘制图像，`canvas` 元素本身是没有绘图能力的。

```js
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

ctx.fillStyle = "#FF0000";
ctx.fillRect(0, 0, 150, 75);
```

### 视频和音频

HTML5 提供了播放音频文件的标准，即使用 `<audio>` 元素

```html
<audio controls>
  <source src="music.ogg" type="audio/ogg" />
  <source src="music.mp3" type="audio/mpeg" />
  您的浏览器不支持 audio 元素。
</audio>
```

HTML5 规定了一种通过 `<video>` 元素来包含视频的标准方法

```html
<video width="320" height="240" controls>
  <source src="movie.mp4" type="video/mp4" />
  <source src="movie.ogg" type="video/ogg" />
  您的浏览器不支持 video 标签。
</video>
```

### 数据存储 localStorage 和 sessionStorage

1. 生命周期：

- `localStorage` 本地存储，是永久的，关闭页面或浏览器之后，存储的数据并不会丢失。除非主动删除，否则数据永远不会消失。
- `sessionStorage` 会话存储，仅在当前会话下有效。只要这个浏览器窗口没有被关闭，即使刷新页面或者进入到另外一个页面或网站，数据依然存在。一旦窗口关闭，会话存储的数据也会一并销毁。**不同窗口同一个页面，`sessionStorage` 也是不一样的。**

2. 存储大小：两者存储数据一般都是`5MB`。
3. 存储位置：两者都保存在浏览器客户端。
4. 存储内容类型：两者都只能存储字符串类型，对于复杂的对象数据，可以使用 `JSON.stringify`、`JSON.parse` 来处理。

### 增强型表单

`Html5` 新增了很多表单类型，增强了表单功能，提供了更好的输入控制和验证。

|      类型      |            描述             |              示例              |
| :------------: | :-------------------------: | :----------------------------: |
|     color      |         定义拾色器          |     <input type="color"/>      |
|      date      |        定义日期字段         |      <input type="date"/>      |
|    datetime    |  选择一个日期（UTC 时间）   |    <input type="datetime"/>    |
| datetime-local | 选择一个日期和时间 (无时区) | <input type="datetime-local"/> |
|     email      |  包含 e-mail 地址的输入域   |     <input type="email"/>      |
|     month      |        选择一个月份         |     <input type="month"/>      |
|      week      |      定义日期字段的周       |      <input type="week"/>      |
|      time      |  定义日期字段的时、分、秒   |      <input type="time"/>      |
|     number     |         数值的输入          |     <input type="number"/>     |
|     range      |  一定范围内数字值的输入域   |     <input type="range"/>      |
|     search     |         用于搜索域          |     <input type="search"/>     |
|      tel       |    定义输入电话号码字段     |      <input type="tel"/>       |
|      url       |      URL 地址的输入域       |      <input type="url"/>       |

```html
<input type="date" />
<input type="time" />
<input type="email" />
<input type="url" />
<input type="search" />
<!-- .... -->
```

### 新增表单属性

#### Input 标签新增加的特有属性

|     属性     |       描述       |
| :----------: | :--------------: |
|  autofocus   |     自动聚焦     |
|   max、min   |   最大值最小值   |
| placeholder  |     提示文本     |
|   pattern    |   正则验证内容   |
|     step     |      步进器      |
|   multiple   | 允许上传多个文件 |
| autocomplete | 是否展示历史输入 |

```html
<input
  type="search"
  required="required"
  placeholder="请输入文字"
  autofocus="autofocus"
  autocomplete="on"
/>
```

#### Form 表单标签新增加属性

- novalidate 属性规定在提交表单时不应该验证 form 或 input 域。demo：<form action="" method="POST" novalidate="true"></form>
- autocomplete 属性规定 form 或 input 域应该拥有自动完成功能。

### 下载 download 属性

HTML5 的下载属性可以允许开发者强制下载一个页面，而非加载那个页面。

```html
<a href="pdf.php" download="somefile.pdf">下载PDF文件</a>
```

### DNS 的预先加载处理

要知道 DNS 的的解析成本很高滴，往往导致了网站加载速度慢。现在浏览器针对这个问题开发了更智能的处理方式，它将域名缓存后，当用户点击其它页面地址后自动的获取。
如果你希望预先获取 DNS，你可以控制你的浏览器来解析域名，例如：

```html
<link rel="dns-prefetch" href="//www.owulia.com" />
```

### 链接网页的预先加载处理

要知道链接能够在也页面中帮助用户导航，但是页面加载的速度快慢决定了用户体验的好与坏，使用如下 HTML5 的 prefetch 属性可以帮助你针对指定的地址预加载页面或者页面中的特定资源，这样用户点击的时候，会发现页面加载速度提高了。

```html
<link rel="prefetch" href="http://www.owulia.com/users.html" />
<link rel="prefetch" href="http://www.owulia.com/images/logo_small.jpg" />
```

### 拖拽 API

拖放是一种常见的特性，即抓取对象以后拖到另一个位置。在 HTML5 中，拖放是标准的一部分，任何元素都能够拖放。

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>拖放</title>
    <style type="text/css">
      #div1 {
        width: 350px;
        height: 70px;
        padding: 10px;
        border: 1px solid #aaaaaa;
      }
    </style>
    <script>
      function allowDrop(event) {
        event.preventDefault();
      }

      function drag(event) {
        event.dataTransfer.setData("Text", event.target.id);
      }

      function drop(event) {
        event.preventDefault();
        var data = event.dataTransfer.getData("Text");
        event.target.appendChild(document.getElementById(data));
      }
    </script>
  </head>
  <body>
    <p>拖动图片到矩形框中:</p>

    <div id="div1" ondrop="drop(event)" ondragover="allowDrop(event)"></div>
    <br />
    <img
      loading="lazy"
      id="drag1"
      src="/images/logo.png"
      draggable="true"
      ondragstart="drag(event)"
      width="336"
      height="69"
    />
  </body>
</html>
```

### 新技术

1. webworker
2. websocket
3. Geolocation