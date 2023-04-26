---
title: Vue 服务端渲染之 nuxt
date: 2023-03-12 12:22
abstract: 客户端渲染（CSR） 和 服务端渲染（SSR）
---

xaxaxaxaxs

xaxaxaxaxs

```js
const Vue = require('vue');
const vueServerRenderer = require('vue-server-renderer');

// 创建一个 Vue 实例
const app = new Vue({
    template: `<div>hello</div>`,
});

// 创建一个 renderer
const renderer = vueServerRenderer.createRenderer();

// 将实例渲染出 HTML
// renderer.renderToString(app, (err, html) => {
//     if(err) throw err;
//     console.log(html);
// });

renderer.renderToString(app).then(html => {
    console.log(html);
}).catch((err) => {
    console.log(err);
});
```
