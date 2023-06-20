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
