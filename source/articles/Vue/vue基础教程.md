---
title: vue基础教程
date: 2020-05-12 12:22
abstract: 使用了 `ES5` 的 `Object.definePropery` 重写所有属性的 `getter` 和 `setter` 方法；
---

[[toc]]

## 响应式

create-vite 是一个快速生成主流框架基础模板的工具。查看 Awesome Vite 仓库的 社区维护模板，里面包含各种工具和不同框架的模板。你可以用如 degit 之类的工具，使用社区模版来搭建项目。

## `index.html` 与项目根目录

你可能已经注意到，在一个 Vite 项目中，index.html 在项目最外层而不是在 public 文件夹内。这是有意而为之的：在开发期间 Vite 是一个服务器，而 index.html 是该 Vite 项目的入口文件。

Vite 将 index.html 视为源码和模块图的一部分。Vite 解析 `<script type="module" src="..."> `，这个标签指向你的 JavaScript 源码。甚至内联引入 JavaScript 的  和引用 CSS 的 \<link href> 也能利用 Vite 特有的功能被解析。另外，index.html 中的 URL 将被自动转换，因此不再需要 %PUBLIC_URL% 占位符了。

与静态 HTTP 服务器类似，Vite 也有 “根目录” 的概念，即服务文件的位置，在接下来的文档中你将看到它会以 \<root> 代称。源码中的绝对 URL 路径将以项目的 “根” 作为基础来解析，因此你可以像在普通的静态文件服务器上一样编写代码（并且功能更强大！）。Vite 还能够处理依赖关系，解析处于根目录外的文件位置，这使得它即使在基于 monorepo 的方案中也十分有用。

Vite 也支持多个 .html 作入口点的 多页面应用模式

![xx](/assets/images/icon-6.jpg)

<img src="/assets/images/icon-6.jpg"/>

使用了 `ES5` 的 `Object.defineProperty` 重写所有属性的 `getter` 和 `setter` 方法；

```js
function convert(obj) {
    Object.keys(obj).forEach(key => {
        let internalValue = obj[key];
        Object.defineProperty(obj, key, {
            get () {
                console.log(`getting key "${key}": ${internalValue}`);
                return internalValue;
            },
            set (newValue) {
                console.log(`setting key "${key}" to: ${newValue}`);
                internalValue = newValue;
            },
        })
    });
}
```

## Dep

```js
let activeUpdate = null;
window.Dep = class Dep {
    constructor () {
        this.subscribers = new Set();
    }
    depend () {
        if (activeUpdate) {
            this.subscribers.add(activeUpdate);
        }
    }
    notify () {
        this.subscribers.forEach(sub => sub());
    }
}
function autorun (update) {
    function wrappedUpdate () {
        activeUpdate = wrappedUpdate;
        update();
        activeUpdate = null;
    }
    wrappedUpdate();
}
```

## 插件简介

```js
function plugin (Vue, options) {
    // ...plugin code
}
Vue.use(plugin);
```


##  Render Function

template
-> (compiled into) Render Function
-> (returns) Virtual DOM
-> (generates) Actual DOM


Actual DOM
```
'[object HTMLDivElement]'
```

Virtual DOM
```
'{ tag: 'div', data: { attrs: {}, ... }, children: [] }'
```

Render Function API
```
export defualt {
    render (h) {
        return h('div', {}, [...]);
    }
}
```

案例
```html
<template>
    <example :tags="['h1', 'h2', 'h3']"></example>
</template>
<script>
    Vue.component('example', {
        props: ['tags'],
        render (h) {
            const children = this.tags.map((tag, index) => h(tag, index));
            return h('div', children);
        }
    })
</script>
```


## 函数组件

```js
Vue.component('example', {
    // props: ['tags'], // 函数组件这里可以不用声明
    functional: true,
    render (h, context) {
        const { props, slots } = context;
        const children = props.tags.map((tag, index) => h(tag, index));
        return h('div', children);
    }
})
```


## 高阶组件

```html

<div id="app">
    <smart-avatar username="vuejs"></smart-avatar>
</div>

<script>

// mock API
function fetchURL (username, cb) {
    setTimeout(() => {
        cb(`https://img.owulia.com/daysnap/607d0ca6d3ad886378eb0cd8/AVATAR/20210419163036.jpeg?w=64`);
    }, 500);
}

const Avatar = {
    props: ['src'],
    template: `<img :src="src"/>`,
}

function withAvatarURL (InnerComponent) {
   return {
       props: ['username'],
       data () {
            return {
                url: 'http://default.avatar'
            }
       },
       created () {
            fetchURL(this.username, url => {
                this.url = url;
            });
       },
       render (h) {
            return h(InnerComponent, {
               props: {
                   src: this.url,
                   attrs: this.$attrs,
               }
            }, this.$slots.default);
       }
   }
}

const SmartAvatar = withAvatarURL(Avatar);

new Vue({
    el: '#app',
    components: {
        SmartAvatar,
    },
});
</script>

```


## Vuex

- `mutations` 、`actions` 把异步代码和状态更改代码分开；
- `mutations` 只关注状态的变更，接收参数改变状态；
- `actions` 可以做很多事情；


简易版本

```js
function createStore ({ state, mutations }) {
    // 
    return new Vue({
        data: { state },
        methods: {
            commit (mutationType) {
                mutations[mutationType](this.state); 
            },
        }
    })
}

const store = createStore({
    state: { count: 0 },
    mutations: {
        inc (state) {
            state.count++;
        }
    } 
});

const Counter = {
    render (h) {
        return h('div', store.state.count);
    }
};

new Vue({
    el: '#app',
    components: {
        Counter,
    },
    methods: {
        inc () {
            store.commit('inc'); 
        }
    }
});

```


## 函数式编程

```js

function app ({ el, model, view, actions }) {
    const wrappedActions = {};
    Object.keys(actions).forEach(key => {
        const originalAction = actions[key];
        wrappedActions[key] = () => {
            const nextModel = originalAction(vm.model);
            vm.model = nextModel;
        }
    });
    const vm = new Vue({
        el,
        data: {
            model,
        },
        render (h) {
            return view(h, this.model, actions);
        },
    });
}

app({
    el: '#app',
    model: {
        count: 0,
    },
    actions: {
        inc: ({ count }) => ({ count: count + 1 }),
        dec: ({ count }) => ({ count: count - 1 }),
    },
    view: (h, model, actions) => h('div', {
        attrs: { id: 'app'},
    }, [
        model.count, ' ',
        h('button', { on: { click: actions.inc } }, '+'),
        h('button', { on: { click: actions.dec } }, '-'),
    ])
})
```


## 哈希路由

```html

<div id="root">
    <component :is="url"></component>
    <a href="#foo">foo</a>
    <a href="#bar">bar</a>
</div>

<script>

window.addEventListener('hashchange', () => {
    app.url = window.location.hash.slice(1);
});

const app = new Vue({
    el: '#app',
    data: {
        url: window.location.hash.slice(1),
    },
    components: {
        foo: { template: `<div>foo</div>` },
        bar: { template: `<div>bar</div>` },
    }
});
</script>

```

```html
<div id="root"></div>

<script>

const Foo = { template: `<div>foo</div>` };
const Bar = { template: `<div>bar</div>` };
const NotFound = { template: `<div>not found!</div>` };

const routeTable = {
    'foo': Foo,
    'bar': Bar,
};

window.addEventListener('hashchange', () => {
    app.url = window.location.hash.slice(1);
});

const app = new Vue({
    el: '#app',
    data: {
        url: window.location.hash.slice(1),
    },
    render(h) {
        return h('div', [
            h(routeTable[this.url] || NotFound),
            h('a', { attrs: { href: '#foo' }}, 'foo'),
            ' | ',
            h('a', { attrs: { href: '#bar' }}, 'bar'),
        ]);
    }
});
</script>

```


```
// path-to-regexp
```



## 表单验证

- Markup-based(vee-validate)
- Model-based(vuelidate)

```html
<script>
    const validationPlugin = {
        install(vue) {
            Vue.mixin({
                beforeCreate () {
                    const rules = this.$options.validations;
                    if (rules) {
                        this.$options.computed = Object.assign({}, this.$options.computed, {
                            $v() {
                                let valid = true;
                                const errors = [];
                                Object.keys(rules).forEach(key => {
                                    const rule = rules[key];
                                    const value = this[key];
                                    const result = rule.validate(value);
                                    if (!result) {
                                        valid = false;
                                        errors.push(rule, message(key, value));
                                    }
                                });
                                return {
                                    valid,
                                    errors,
                                }
                            }
                        })
                    }
                }
            })
        }
        
    }
</script>
```
