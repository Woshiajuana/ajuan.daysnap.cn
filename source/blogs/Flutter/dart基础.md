---
title: dart 基础
createTime: 2023-06-22 11:18
abstract: dart 基础。
---

## 单例模式

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