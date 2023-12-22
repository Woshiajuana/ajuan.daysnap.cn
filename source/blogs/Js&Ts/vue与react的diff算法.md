---
title: vue 与 react 的 diff 算法
createTime: 2023-12-23 16:32
tags: js
abstract: 判断一个值的类型，在日常工作中十分的常见。
---

## 什么是 diff 算法

## vue 中的 diff 算法

### vue2 与 vue3 中 diff 算法的区别

vue3 进行了一些优化

- 事件缓存
- 静态标记：vue2 是全量 diff，vue3 是静态标记 + 非全量 diff
- 静态提升：创建静态节点时保存，后续直接复用
- 最长递增子序列优化对比流程

## react 中的 diff 算法

## vue 与 react 的 diff 比较

- 都遵循深度优先，同层比较的策略。只比较同一层级，不跨级比较；
- react diff 遍历法对比
- vue diff 双指针对比

## 参考

- https://zhuanlan.zhihu.com/p/421197879
