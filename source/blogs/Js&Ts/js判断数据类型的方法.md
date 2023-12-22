---
title: js 判断数据类型的方法
createTime: 2023-12-23 11:09
tags: js
abstract: 判断一个值的类型，在日常工作中十分的常见。
---

## typeof 操作符

typeof 返回值都是字符串类型，例如： “number”、“boolean”、“string”、“undefined”、'symbol"、“function” 、“object”

- 只能准确判断除 null 以外的基本数据类型；
- 对于引用数据类型，typeof 的判断结果都是 object，函数返回 function；

为什么 typeof null === object?

这只是 js 存在的一个 bug，null 的机器码是 000，与 object 的类型标签一样。所以会被判断为 Object。

```js
typeof 5; // "number"
typeof true; // "boolean"
typeof "name"; // "string"
typeof undefined; // "undefined"
typeof Symbol(1); // "symbol"
typeof null; // "object"
```

## instanceof

判断数据是否是某个对象的实例，返回一个布尔值。其内部运行机制是判断在其原型链中能否找到该类型的原型

- instanceof 是判断某个变量是否为某个对象的实例；
- instanceof 可以检测所有能转换为实例对象的数据，所以对于 null 和 undefined 检测不了；
- 所有引用类型都是 Object 的实例。

## constructor 构造器

使用 constructor 可以查看目标构造函数，也可以进行数据类型判断。

> constructor 和 instanceof 类似。constructor 返回结果的是自己的构造函数，而 instanceof 则是自己与构造函数比较返回布尔值

- constructor 是查看自己的构造函数；
- constructor 可以检测所有能转换为实例对象的数据，所以不能判断 null 和 undefined ，因为这两个特殊类型没有对应的包装对象；

## Object.prototype.toString.call()

- toString() 方法是定义在 Object 的原型对象（Object.prototype）上的，Object 的每个实例化对象都可以共享 Object.prototype.toString() 方法；

- Object.prototype.toString.call(xxx) 是类型判断的终极解决方案，工作中也是比较常用而且准确！！

## 参考

- https://blog.csdn.net/qq_38290251/article/details/129936273
