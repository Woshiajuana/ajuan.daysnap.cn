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

## 常用的 ORM 库

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

聚合查询

```ts
// SELECT logs.result as result, COUNT(logs.result) as count from logs, user WHERE user.id = logs.userId AND user.id = 2 GROUP BY logs.result;
function findLogsByGroup(id: number) {
  return this.logsRepository
    .createQueryBuilder("logs")
    .select("logs.result", "result")
    .addSelect('COUNT("logs.result")', "count")
    .leftJoinAndSelect("logs.user", "user")
    .where("user.id = :id", { id })
    .groupBy("logs.result")
    .orderBy("count", "DESC")
    .getRawMany();
}
```

已有数据库，如何生成实体类

```
typeorm-model-generator
```

```bash
docker-compose up -d
```

`remove` 可以一次性删除单个或者多个实例，并且 `remove` 可以触发 `BeforeRemove`、`AfterRemove` 钩子

```js
await repository.remove(user);
await repository.remove([user1, user2, user3]);
```

`delete` 可以一次性删除单个或者多个 id 实例，或者给定条件

```js
await repository.delete(1);
await repository.delete([1, 2, 3]);
await repository.delete({ username: "张三" });
```

## 日志

第三方日志方案

- `winston`
  - `nest-winston`
  - `winston-daily-rotate-file`
- `pino`
  - `pino-pretty`
  - `pino-roll`

日志等级

- `Log`：通用日志，按需进行记录（打印）
- `Warning`：警告日志，比如：尝试多次进行数据库操作
- `Error`：严重日志，比如：数据库异常
- `Debug`：调试日志，比如：加载数据日志
- `Verbose`：详细日志，所有的操作与详细信息（非必要不打印）

## DTO 校验

```ts
export class UserDto {
  @IsString()
  @IsNotEmpty()
  @Length(6, 20, {
    // $value: 当前传入的值
    // $property: 当前属性名
    // $target: 当前类
    // $constraint1: 最小长度 ...
    message: `用户名长度必须在$constraint1到$constraint2之间，当前传递的值是：$value`,
  })
  username: string;
}
```

## 守卫 Guard

1. 装饰器的执行顺序，方法的装饰器如果有多个，则是从下往上执行
2. 如果使用`UseGuard`传递多个守卫，则从前往后执行，如果前面的`Guard`没有通过，则后面的`Guard`不会执行

```ts
@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private userService: UserService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    return true;
  }
}
```

## 测试

- 单元测试
  - Jest
  - Vitest
  - mocha
- 集成测试
  - Cypress
  - Nightware
  - Pactum

```ts
describe("AuthController", () => {
  let controller: AuthController;
  let mockAuthService: Partial<AuthService>;

  beforeEach(async () => {
    mockAuthService = {
      signin() {
        return "token";
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it("鉴权-初始化-实例化", () => {
    expect(controller).toBeDefined();
  });

  it("鉴权-控制器-signin登录", async () => {
    const res = controller.signin({
      username: "test",
      password: "123456",
    } as SigninUserDto);
    expect(await res).not.toBeNull();
    expect((await res).access_token).toBe("token");
  });
});
```

server

```ts
const module: TestingModule = await Test.createTestingModule({
  providers: [
    AuthService,
    {
      provide: AuthService,
      useValue: mockAuthService,
    },
  ],
}).compile();

server = module.get<AuthService>(AuthService);
// servers
it("报错", async () => {
  await expect(
    service.signup(mockUser.username, mockUser.password)
  ).rejects.toThrow(new ForbiddenException("用户已存在"));
});
```

## 参考文档

- [NestJS 中文文档](https://docs.nestjs.cn/9/firststeps)

- [NestJS 微服务架构实践](https://juejin.cn/post/7075233589977153549)

- [文档案例](https://github.com/dzzzzzy/Nestjs-Learning)

- [数据库设计参考](https://open.yesapi.cn/list.html)

- [TypeORM 中文文档](https://typeorm.bootcss.com/)
