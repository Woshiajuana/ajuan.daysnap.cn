---
title: dart 基础
createTime: 2023-06-22 11:18
abstract: dart 基础。
---

## 单例模式

一般来说，要在代码中使用单例模式，结构上会有下面这些约定俗成的要求：

- 单例类（Singleton）中包含一个引用自身类的静态属性实例（instance），且能自行创建这个实例。
- 该实例只能通过静态方法 getInstance() 访问。
- 类构造函数通常没有参数，且被标记为私有，确保不能从类外部实例化该类。

先直接看代码

```dart
class Phone {
  static final Phone _instance = Phone._internal();
  Phone._instance();

  factory Phone() => _instance;

  void call() {
    print('call ...')
  }
}

void main(List<String> args) {
  var p1 = Phone();
  var p2 = Phone();

  print(identical(p1, p2)); // true
}
```

`_internal` 是类的私有构造函数；

上面的单例代码是类一运行就会创建实例，可以改写成懒加载

```dart
class Singleton {
  static Singleton _instance;

  // 私有的命名构造函数
  Singleton._internal();

  static Singleton getInstance() {
    if (_instance == null) {
      _instance = Singleton._internal();
    }

    return _instance;
  }
}
```

还可以优化成：

```dart
class Singleton {
  static Singleton _instance;
  static get instance {
    if (_instance == null) {
      _instance = Singleton._internal();
    }

    return _instance;
  }

  Singleton._internal();
}
```

终极版本

```dart
class Singleton {
  Singleton._internal();

  factory Singleton() => _instance;

  static late final Singleton _instance = Singleton._internal();
}
```

被标记为 late 的变量 \_instance 的初始化操作将会延迟到字段首次被访问时执行，而不是在类加载时就初始化。这样，Dart 语言特有的单例模式的实现方式就这么产生了。

## 导入第三方库

编写 `pubspec.yaml`

```yaml
dependencies:
  dio: ^4.0.6
```

执行拉取包命令

```bash
dart pub get
```

导入 github 上的包

```yml
dependencies:
  # 包名
  uuid:
    git:
      url: https://github.com/username/dart-name
      ref: master
```

## 参考文档

1. https://flutter.cn/community/tutorials/singleton-pattern-in-flutter-n-dart
