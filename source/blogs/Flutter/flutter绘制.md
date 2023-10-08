---
title: Flutter 绘制
createTime: 2023-10-08 21:45
tags: flutter
abstract: flutter 绘制
---

绘制坐标轴

```dart
void _drawAxis(Canvas canvas, Size size) {
  Path axisPath = Path();
  axisPath.relativeLineTo(size.width, 0);
  axisPath.relativeLineTo(-10, -4);
  axisPath.moveTo(size.width, 0);
  axisPath.relativeLineTo(-10, 4);
  axisPath.moveTo(0, 0);
  axisPath.relativeLineTo(0, size.height);
  axisPath.relativeLineTo(-4, -10);
  axisPath.moveTo(0, size.height);
  axisPath.relativeLineTo(4, -10);
  canvas.drawPath(axisPath, axisPaint);

  textPainter.text = const TextSpan(
    text: 'x',
    style: TextStyle(
      fontSize: 12,
      color: Colors.black,
    ),
  );
  textPainter.layout(); // 进行布局
  Size textSize = textPainter.size; // 尺寸必须在布局之后获取
  textPainter.paint(canvas, Offset(size.width - textSize.width, 5));
  textPainter.text = const TextSpan(
    text: 'y',
    style: TextStyle(
      fontSize: 12,
      color: Colors.black,
    ),
  );
  textPainter.layout(); // 进行布局
  Size textSize2 = textPainter.size; // 尺寸必须在布局之后获取
  textPainter.paint(canvas, Offset(textSize2.width + textSize2.width/2, size.height - textSize2.height - 3));
}
```

翻转坐标系

```dart
canvas.translate(0, size.height);
// 翻转之前绘制坐标轴
_drawAxis(canvas, size);
canvas.scale(1, -1);
```