---
title: Nestjs 基础
createTime: 2023-05-22 09:20
tags: nestjs
abstract: Nestjs 基础
---

## 简介

## 编程思想

`FP`：Functional Programming（函数式编程）

- 确定的数据输入、输出，没有"副"作用，相对独立
- 引用透明，对 IDE 友好，易于理解
- 如今主流的`vue/react`中的书写方式

`OOP`：Object Oriented Programming（面向对象式编程）

- 抽象现象生活中的事物特征，对于理解友好
- 封装性（高内聚低耦合）、继承性、多态性

`FRP`：函数式响应编程

- 适合需要对事件流进行复杂组合应用的场景
- 响应式多用在异步的场景
- 典型的案例：rxjs、广告推荐

`AOP`：Aspect Oriented Programming（面向切面编程）

- 扩展功能方便，不影响业务之间的逻辑
- 逻辑集中管理
- 更有利于代码复用
- 能在不破坏封装功能的前提下，额外增加功能

`IoC`/`DI`：Inversion Of Control（控制反转）/ Dependency Injection（依赖注入）

- 控制反转是一种面向对象编程中的一种设计原则，用来减低计算机代码之间的耦合度。其基本思想是：借助于"第三方"实现具有依赖关系的对象之间的解耦。
- 依赖注入是一种用于实现`IoC`的设计模式，它允许在类外创建依赖对象，并通过不同的方式将这些对象提供给类。
- `IoC`是一种思想设计模式，`DI`是`IoC`的具体实现

```ts
import "reflect-metadata";

function Inject(target: any, key: string) {
  target[key] = new (Reflect.getMetadata("design:type", target, key))();
}

class A {
  sayHello() {
    console.log("hello");
  }
}

class B {
  @Inject
  a!: A;

  say() {
    this.a.sayHello();
  }
}

new B().say();
```

## nestjs 生命周期

![一图概括](/assets/images/WX20230522-152545@2x.png)

## 模块

- 使用 `Module` 来组织应用程序
- `@Module` 装饰器来描述模块
- 模块中有四大属性：
  - `imports`
  - `providers`
  - `controllers`
  - `exports`

## 步骤

安装脚手架

```bash
npm install -g @nestjs/cli
```

|     name      |    alias    |                 description                  |
| :-----------: | :---------: | :------------------------------------------: |
|  application  | application |     Generate a new application workspace     |
|     class     |     cl      |             Generate a new class             |
| configuration |   config    |      Generate a CLI configuration file       |
|  controller   |     co      |      Generate a controller declaration       |
|   decorator   |      d      |         Generate a custom decorator          |
|    filter     |      f      |        Generate a filter declaration         |
|    gateway    |     ga      |        Generate a gateway declaration        |
|     guard     |     gu      |         Generate a guard declaration         |
|  interceptor  |     itc     |     Generate an interceptor declaration      |
|   interface   |     itf     |            Generate an interface             |
|    library    |     lib     |   Generate a new library within a monorepo   |
|  middleware   |     mi      |      Generate a middleware declaration       |
|    module     |     mo      |        Generate a module declaration         |
|     pipe      |     pi      |         Generate a pipe declaration          |
|   provider    |     pr      |       Generate a provider declaration        |
|   resolver    |      r      |   Generate a GraphQL resolver declaration    |
|   resource    |     res     |         Generate a new CRUD resource         |
|    service    |      s      |        Generate a service declaration        |
|    sub-app    |     app     | Generate a new application within a monorepo |

## ORM

`ORM`（Object Relational Mapping）对象关系映射，其主要作用是在编程中，把面向对象的概念跟数据库中的概念对应起来。
 
### 特点

- 方便维护：数据模型定义在同一个地方，利于重构
- 代码量少，对接多种库：代码逻辑更易懂
- 工具多、自动化能力强：数据库删除关联数据、事务操作等
- 缺点：因为是`sql`高度集成，所以不利于`sql`优化

## 常用的ORM库

- `knex`
- `prisma`
- `sequelize`
- `typeorm`


## 数据库

- 数据表：表是数据的矩阵，表头展示的是所有列名称字段
- 行：一行是一组相关的数据
- 列：一列数据包含了相同类型的数据
- 主键：区分、查询、排序数据
- 外键：关联两个表


```bash
docker-compose up -d
```

## 参考文档

- [中文文档](https://docs.nestjs.cn/9/firststeps)

- [NestJS 微服务架构实践](https://juejin.cn/post/7075233589977153549)

- [文档案例](https://github.com/dzzzzzy/Nestjs-Learning)

- [数据库设计参考](https://open.yesapi.cn/list.html)