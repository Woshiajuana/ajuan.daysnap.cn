---
title: JS的call和apply
createTime: 2018-01-01 22:50
tags: js
abstract: call()、apply()方法在使用一个指定的this值和若干个指定的参数值的前提下调用某个函数或方法。
---

## 简介

`call()`、`apply()`方法在使用一个指定的 this 值和若干个指定的参数值的前提下调用某个函数或方法。

## call 原理

```js
Function.prototype.call2 = function (context) {
  var context = context || window;
  context.fn = this;
  var args = [];
  for (var i = 1, len = arguments.length; i < len; i++) {
    args.push("arguments[" + i + "]");
  }
  var result = eval("context.fn(" + args + ")");
  delete context.fn;
  return result;
};
```

## 模拟实现 apply

```js
Function.prototype.apply2 = function (context, arr) {
  var context = Object(context) || window;
  context.fn = this;
  var result;
  if (!arr) {
    result = context.fn();
  } else {
    var args = [];
    for (var i = 0, len = arr.length; i < len; i++) {
      args.push("arr[" + i + "]");
    }
    result = eval("context.fn(" + args + ")");
  }
  delete context.fn;
  return result;
};
```

## 模拟实现 bind

```js
Function.prototype.bind2 = function (context) {
  if (typeof this !== "function") {
    throw new Error(
      "Function.prototype.bind - what is trying to be bound is not callable"
    );
  }

  var self = this;
  var args = Array.prototype.slice.call(arguments, 1);

  var fNOP = function () {};

  var fBound = function () {
    var bindArgs = Array.prototype.slice.call(arguments);
    return self.apply(
      this instanceof fNOP ? this : context,
      args.concat(bindArgs)
    );
  };

  fNOP.prototype = this.prototype;
  fBound.prototype = new fNOP();
  return fBound;
};
```

## 参考：

参考博文：https://github.com/mqyqingfeng/Blog/issues/11
