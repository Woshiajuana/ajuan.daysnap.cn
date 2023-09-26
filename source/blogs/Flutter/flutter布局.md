---
title: Flutter 布局
createTime: 2023-09-10 10:52
tags: flutter
abstract: flutter 布局
---

## 约束、尺寸、位置

![一图概况](/assets/images/WX20230917-230202@2x.png)

- 向下传递约束
- 向上传递尺寸

## 获取和设置布局约束

### LayoutBuilder

```dart
Container(
  width: 400,
  height: 400,
  color: Colors.red,
  child: Center(
    child: LayoutBuilder(
      builder: (BuildContext context, BoxConstraints constraints) {
        print("constraints:$constraints");
        return FlutterLogo(size: 80);
      },
    ),
  ),
)
```

### FractionallySizedBox

比例 box

```dart
Container(
  width: 400,
  height: 400,
  color: Colors.red,
  child: Center(
    child: FractionallySizeBox(
      widthFactor: 0.5,
      heightFactor: 0.5,
      child: LayoutBuilder(
      builder: (BuildContext context, BoxConstraints constraints) {
          print("constraints:$constraints");
          return FlutterLogo(size: 80);
        },
      ),
    ),
  ),
)
```

### ConstrainedBox

约束 box

```dart
ConstrainedBox(
  constraints: BoxConstraints(
    minWidth: 60,
    maxWidth: 120,
    minHeight: 60,
    maxHeight: 120,
  ),
  child: FlutterLogo(size: 80),
)
```

`BoxConstraints().loosen()` 松约束

- 紧约束(tightly)
  最大约束和最小约束相等
- 松约束(loose)
  最小约束为 0

[参考](https://api.flutter.dev/flutter/rendering/BoxConstraints-class.html)

## Flex 弹性布局

在布局的时候，会给非弹性子 Widget 无限高度(unbounded)，待非弹性子 Widget 布局好了之后，再给弹性子 Widget 剩余高度。

### Column

继承 `Flex`

```dart
Column(
  mainAxisAlignment: MainAxisAlignment.start,
  children: [
    FlutterLogo(size: 100),
    FlutterLogo(size: 100),
    FlutterLogo(size: 100),
  ],
)
```

### Row

```dart
Row(
  mainAxisAlignment: MainAxisAlignment.start,
  children: [
    FlutterLogo(size: 100),
    FlutterLogo(size: 100),
    FlutterLogo(size: 100),
  ],
)
```

## Stack 层叠组件

```dart
Stack(
  // clipBehavior: Clip.none,
  // fit: StackFit.loose,
  alignment: Alignment.topLeft,
  children: [
    FlutterLogo(size: 150),
    Text(
       "Text",
      style: TextStyle(fontSize: 70),
    ),
    Text(
      '00',
      style: Theme.of(context).textTheme.headline1,
    ),
    Positioned(
      top: 0,
      left: 0,
      child: FlutterLogo(size: 250),
    ),
  ],
)
```

先处理没有位置的，把自己的大小调整没有位置里面的最大个，再来计算没有位置的。
如果都是 `Positioned` 的情况下，`Stack` 则是越大越好。

## Container 详解

简单情况下：

- 没有 `child` 就越大越好，会占满父级最大约束，前提条件是无编辑(unbounded)
- 有 `child` 就匹配尺寸，前提

```dart
Container(
  color: Colors.orange,
  width: 200,
  height: 200,
  margin: const EdgeInsets.all(24.0),
  padding: const EdgeInsets.all(24.0),
  alignment: Alignment.topLeft,
  child: FlutterLogo(size: 100),
)
```

`Container` 是一个语法糖，其实是多个 Widget 的组合使用

## CustomMultiChildLayout

```dart
CustomMultiChildLayout(
  delegate: MyDelegate(),
  children: [
    LayoutId(
      id: 1,
      child: FlutterLogo(),
    ),
    LayoutId(
      id: 2,
      child: FlutterLogo(),
    ),
  ],
)

class MyDelegate extends MultiChildLayoutDelegate {
  @override
  void performLayout(Size size) {
    if (hasChild(1)) {
      final size1 = layoutChild(
        1,
        BoxConstraints(
          minWidth: 100,
          minHeight: 100,
          maxWidth: 100,
          maxHeight: 100,
        ),
      );
      layoutChild(1, BoxConstraints.tight(Size(100, 4)));
      positionChild(1, Offset(0, 0));
    }

    if (hasChild(2)) {
      final size2 = layoutChild(
        2,
        BoxConstraints(
          minWidth: 200,
          minHeight: 200,
          maxWidth: 200,
          maxHeight: 200,
        ),
      );
      positionChild(2, Offset(0, 0));
    }
  }
}
```

## 自己动手写个 RenderObject

```dart
ShadowBox(
  child: FlutterLogo(
    size: 200,
  ),
)

class ShadowBox extends SingleChildRenderObjectWidget {
  final double distance;

  ShadowBox({ Widget child, this.distance }) : super(child: child);

  @override
  RenderObject createRenderObject(BuildContext context) {
    return RenderShadowBox(distance);
  }

  // 有值更新的时候会触发这个回调
  @override
  void updateRenderObject(BuildContext context, covariant RenderShadowBox renderObject) {
    renderObject.distance = distance;
  }
}

class RenderShadowBox extends RenderBox with RenderObjectWithChildMixin {
  double distance;

  RenderShadowBox(this.distance);

  @override
  void performLayout() {
    child.layout(constraints);
    size = Size(300, 300);
  }

  @override
  void paint(PaintingContext context, Offset offset) {
    context.paintChild(child, offset);
    // context.paintChild(child, offset + Offset(120, 120));

    // 绘制
    // context.canvas.drawLine();

    // 绘制半透明
    context.pushOpacity(offset, 127, (context, offset) {
      context.paintChild(child, offset + Offset(distance, distance));
    });
  }
}
```

父级想使用子级的大小

```dart
@override
  void performLayout() {
    child.layout(constraints, parentUseSize: true);
    size = (child as RenderBox).size;
  }
```

注意：如果父级没有使用子级的大小 `parentUseSize` 为 false，则数据改变重新绘制的时候，到这一级就不会接着向上传递尺寸了，这种称之为 `relayout boundary`

`RenderBox` 还有一个高级的 `RenderProxyBox`，会默认处理绘制组件，可以让开发者只改的想要变动的地方

```dart
class RenderShadowBox extends RenderProxyBox {
  double distance;

  RenderShadowBox(this.distance);

  @override
  void paint(PaintingContext context, Offset offset) {
    context.paintChild(child, offset);
    // context.paintChild(child, offset + Offset(120, 120));

    // 绘制
    // context.canvas.drawLine();

    // 绘制半透明
    context.pushOpacity(offset, 127, (context, offset) {
      context.paintChild(child, offset + Offset(distance, distance));
    });
  }
}
```

超出边界警告是怎么实现的

```dart
class RenderShadowBox extends RenderProxyBox with DebugOverflowIndicatorMixin {

  @override
  void paint(PaintingContext context, Offset offset) {
    //...
    paintOverflowIndictor(
      context,
      offset,
      offset & size,
      // Rect.fromLTWH(0, 0, size.width, size.height),
      offset & child.size,
      // Rect.fromLTWH(0, 0, child.size.width, child.size.height),
    );
  }
}
```
