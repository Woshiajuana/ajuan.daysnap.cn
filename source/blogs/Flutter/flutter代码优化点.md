---
title: Flutter代码优化点
createTime: 2023-06-20 22:38
tags: flutter
abstract: flutter 代码优化点
---

## List.generate

```dart
Widget build(BuildContext context) {
  return Row(
    mainAxisAlignment: alignment,
    children: List.generate(length, (index) {
      return Container(
        margin: const EdgeInsets.symmetric(horizontal: 3),
        width: 10
      )
    })
  )
}
```

## 生成文档

```bash
dart pub global activate dartdoc
dart pub global run dartdoc
```

## 随机颜色

```dart
Color color = Colors.primaries[Random().nextInt(Colors.primaries.length)];
```

## 优雅的使用新版 enum 功能

```dart
enum PortType {
  usbA('USB-A'),
  usbC('USB-C'),
  lightning('LIGHTNING'),
  unknown('UNKNOWN');

  final String name;
  const PortType(this.name);

  static PortType fromString(String name) {
    return values.firstWhere(
      (v) => v.name == name,
      orElse: () => PortType.unknown,
    );
  }

  static bool isUSB (PortType type) =>
    type == PortType.usbA || type == PortType.usbC;
}

extension on PortType {
  bool get isUSB => name.startsWith('USB');
}
```

使用

```dart
final p = PortType.fromString('USB-A');

print('is it usb? ${p.isUSB}');
```

还可以换成这种思路

```dart
enum PortType {
  usbA('USB-A', true),
  usbC('USB-C', true),
  lightning('LIGHTNING'),
  unknown('UNKNOWN');

  final String name;
  final bool isUSB;
  const PortType(this.name, [this.isUSB = false]);

  static PortType fromString(String name) {
    return values.firstWhere(
      (v) => v.name == name,
      orElse: () => PortType.unknown,
    );
  }
}
```

## 软键盘弹窗不影响界面

```dart
Scaffold(
  extendBody: true, // 扩展到Scaffold的底部
  resizeToAvoidBottomInset: false, // 不允许键盘事件影响界面
  // ...
)
```
