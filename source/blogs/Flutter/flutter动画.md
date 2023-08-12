---
title: Flutter 动画
createTime: 2023-08-11 16:26
tags: flutter
abstract: flutter 基础
---

## 隐式(全自动)动画

### 简单

`AnimatedContainer`

```dart
AnimatedContainer({
  duration: Duration(seconds: 1),
  width: 300,
  height: 300,
  color: Colors.orange,
})
```

只要修改这个 `widget` 的对应属性，则会自动有对应的过渡动画，需要注意的是，子组件 `child` 发生改变是没有过渡动画。

### 在不同控件之间切换的过度动画

- `AnimatedSwitcher`

```dart
AnimatedSwitcher({
  duration: Duration(seconds: 2),
  child: Text("Hi"),
})
```

该组件的 `child` 发生改变则会产生过渡动画，默认是 `FadeTransition` 动画。

```dart
AnimatedSwitcher({
  transitionBuilder: (child, animation) {
    return FadeTransition(
      opacity: animation,
      child: child,
    );
  },
  duration: Duration(seconds: 2),
  child: Text("Hi"),
})
```

需要注意的是：如果变化的 child 都是同类型组件，需要加 `key` 作为区分，不然会认为是同一个组件而不会产生过渡动画。

```dart
AnimatedSwitcher({
  transitionBuilder: (child, animation) {
    return FadeTransition(
      opacity: animation,
      child: child,
    );
  },
  duration: Duration(seconds: 2),
  child: Text("Hi", key: ValueKey("Hi")),
})
```

高级一点的用法

```dart
AnimatedSwitcher({
  transitionBuilder: (child, animation) {
    return FadeTransition(
      opacity: animation,
      child: ScaleTransition({
        scale: animation,
        child: child,
      }),
    );
  },
  duration: Duration(seconds: 2),
  child: Text('Hello', key: UniqueKey()),
})
```

- `AnimatedCrossFade`

在两个子 Widget 之间交叉淡入并在其大小之间设置动画的小部件。

```dart
AnimatedCrossFade(
  duration: Duration(seconds: 1),
  crossFadeState:
      _showFirst ? CrossFadeState.showFirst : CrossFadeState.showSecond,
  firstChild: Container(
    height: 150,
    width: 150,
    alignment: Alignment.center,
    decoration: BoxDecoration(shape: BoxShape.circle, color: Colors.blue),
    child: Text('first child',style: TextStyle(color: Colors.white),),
  ),
  secondChild: Container(
    height: 150,
    width: 150,
    alignment: Alignment.center,
    decoration:
        BoxDecoration(shape: BoxShape.rectangle, color: Colors.orange,borderRadius:BorderRadius.circular(20)),
    child: Text('second child',style: TextStyle(color: Colors.white),),
  ),
)
```

解决切换回来动画不流畅的问题，设置 `layoutBuilder`

```dart
layoutBuilder: (topChild, topChildKey, bottomChild, bottomChildKey) {
  return Stack(
    overflow: Overflow.visible,
    alignment: Alignment.center,
    children: <Widget>[
      Positioned(
        key: topChildKey,
        child: topChild,
      ),
      Positioned(
        key: bottomChildKey,
        top:0,
        child: bottomChild,
      ),
    ],
  );
}
```

[参考](https://blog.csdn.net/qq_23756803/article/details/106536277)

### 动画曲线(Curves)

- `Curves.linear` 默认

```dart
AnimatedPadding(
  duration: Duration(seconds: 2),
  padding: EdgeInsets.only(top: 200),
  curve: Curves.bounceOut,
  child: Container(
    width: 300,
    height: 300,
    color: Colors.blue,
  ),
)
```

[详情参考](https://api.flutter.dev/flutter/animation/Curves-class.html)

### 补间动画

`TweenAnimationBuilder`

```dart
TweenAnimationBuilder(
  duration: Duration(seconds: 1),
  tween: Tween(begin: 0.0, end: 1.0),
  builder: (BuildContext context, value, Widget child) {
    return Opacity(
      opacity: value,
      child: Container(
        width: 300,
        height: 300,
        color: Colors.blue,
      ),
    );
  },
)
```

小技巧

```dart
Tween(end: 1.0)
// 相等
Tween(begin: 1.0, end: 1.0),
```

配合 `Transform` 进行各种动画

- `Transform.scale`

```dart
TweenAnimationBuilder(
  duration: Duration(seconds: 1),
  tween: Tween(begin: 0.0, end: 1.0),
  builder: (BuildContext context, value, Widget child) {
    return Container(
      width: 300,
      height: 300,
      color: Colors.blue,
      child: Center(
        child: Transform.scale(
          scale: value,
          child: Text('哈哈')
        ),
      ),
    );
  },
)
```

- `Transform.translate`

```dart
TweenAnimationBuilder(
  duration: Duration(seconds: 1),
  tween: Tween(begin: Offset(0.0, 0.0), end: Offset(10.0, 10.0)),
  builder: (BuildContext context, value, Widget child) {
    return Container(
      width: 300,
      height: 300,
      color: Colors.blue,
      child: Center(
        child: Transform.translate(
          offset: value,
          child: Text('哈哈')
        ),
      ),
    );
  },
)
```

- `Transform.rotate`

### 案列 - 翻滚计数器

```dart
class AnimatedCounter extends StatelessWidget {
  final Duration duration;
  final int value;

  AnimatedCounter({
    @required this.duration,
    @required this.value,
  })

  @override
  Widget build(BuildContext context) {
    return TweenAnimationBuilder(
      duration: duration,
      tween: Tween(end: value.toDouble()),
      builder: (BuildContext context, value, Widget child) {
        final whole = value ~/ 1;
        final decimal = value - whole;
        return Stack(
          children: [
            Positioned(
              top: -100 * decimal,
              child: Opacity(
                opacity: 1.0 - decimal,
                child: Text(
                  "$whole",
                  style: TextStyle(fontSize: 100),
                ),
              ),
            ),
            Positioned(
              top: 100 - 100 * decimal,
              child: Opacity(
                opacity: decimal,
                child: Text(
                  "${whole + 1}",
                  style: TextStyle(fontSize: 100),
                ),
              ),
            ),
          ],
        );
      }
    );
  }
}
```

## 显示动画

需要自己控制、可以一直执行、反复执行

### 可以一直执行

- `SlideTransition` 位移
- `FadeTransition`
- `ScaleTransition`
- `RotationTransition`

```dart
AnimationController _controller = AnimationController(
  duration: Duration(seconds: 1),
  vsync: this,
);

_controller.forward();
```

```dart
RotationTransition(
  turns: _controller,
  child: Container({
    height: 300,
    width: 300,
    color: Colors.blue,
  }),
)
```

- `SingleTickerProviderStateMixin`

这个是屏幕刷新会提供一个 `ticker` 回调，可以打印下

```dart
_controller.addListener(() {
  print("${_controller.value}");
});
```

### 动画控制器

`AnimationController`

初始化

```dart
AnimationController _controller = AnimationController(
  duration: Duration(seconds: 1),
  vsync: this,
  lowerBound: 0.0, // 默认值
  upperBound: 1.0, // 默认值
);
```

监听变化值

```dart
_controller.addListener(() {
  print("${_controller.value}");
});
```

操作

```dart
_controller.forward();
_controller.repeat(); // 0 ~ 1  0 ~ 1 ...
_controller.repeat(reverse: true); // 0 ~ 1 1 ~ 0 ...
_controller.stop();
_controller.reset();
```

### 控制器串联补间(Tween)和曲线

```dart
SlideTransition(
  position: _controller.drive(
    Tween(begin: Offset(0, 0), end: Offset(0.1, 0.1)),
  ),
  child: Container(
    width: 300,
    height: 300,
    color: Colors.blue,
  ),
)
```

另一种写法

```dart
SlideTransition(
  position: Tween(
    begin: Offset(0, 0),
    end: Offset(0.1, 0.1)，
  ).animate(_controller),
  child: Container(
    width: 300,
    height: 300,
    color: Colors.blue,
  ),
)
```

串联多个 `Tween`

```dart
SlideTransition(
  position: Tween(
    begin: Offset(0, 0),
    end: Offset(0.1, 0.1)，
  ).chain(
    CurveTween(curve: Curves.elasticInOut)
  ).animate(_controller),
  child: Container(
    width: 300,
    height: 300,
    color: Colors.blue,
  ),
)
```

```dart
SlideTransition(
  position: Tween(
    begin: Offset(0, 0),
    end: Offset(0.1, 0.1)，
  ).chain(
    CurveTween(curve: Curves.elasticInOut)
  ).chain(
    CurveTween(curve: Interval(0.8, 1.0))
  ).animate(_controller),
  child: Container(
    width: 300,
    height: 300,
    color: Colors.blue,
  ),
)
```

### 交错动画

主要是利用 `Interval(0.8, 1.0)` 来改变动画执行时间

### 自定义动画

`AnimatedBuilder`

```dart
AnimatedBuilder(
  animation: _controller,
  builder: (BuildContext context, Widget child) {
    return Opacity(
      opacity: _controller.value,
      child: Container(
        width: 300,
        height: 300,
        color: Colors.blue,
      ),
    );
  },
)
```

`child` 优化

```dart
AnimatedBuilder(
  animation: _controller,
  builder: (BuildContext context, Widget child) {
    return Opacity(
      opacity: _controller.value,
      child: child,
    );
  },
  child: Container(
    width: 300,
    height: Tween(begin: 100.0, end: 200.0).evaluate(_controller),
    color: Colors.blue,
  ),
)
```

再次优化

```dart
final Animation heightAnimation = Tween(begin: 100.0, end: 200.0).animate(_controller);

AnimatedBuilder(
  animation: _controller,
  builder: (BuildContext context, Widget child) {
    return Opacity(
      opacity: _controller.value,
      child: child,
    );
  },
  child: Container(
    width: 300,
    height: heightAnimation.value,
    color: Colors.blue,
  ),
)
```

## 动画机制和原理

- `ticker`

```dart
Ticker _ticker = Ticker((elapsed) {
  print("Tick: $elapsed");
});

_ticker.start();
```

## 主动画(Hero 动画)

不同页面里的组件，切换时产生动画

```
// A 页面
Hero(
  tag: path,
  child: Image.asset(path),
)

// B 页面
Hero(
  tag: path,
  child: Image.asset(path),
)
```

## CustomPainter

直接操作底层绘制动画

```dart
@override
Widget build(BuildContext context) {
  return Scaffold(
    appBar: AppBar(
      title: Text(widget.title),
    ),
    body: Center(
      child: Container(
        width: double.infinity,
        height: double.infinity,
        color: Colors.blue,
        child: CustomPaint(
          painter: MyPainter(),
        ),
      ),
    ),
  );
}

class MyPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    print(size);
    canvas.drawCircle(size.center(Offset.zero), 60.0, Paint());
  }

  @override
  bool shouldRepaint(CustomPainter oldDelegate) => true;
}
```

## 其他

### 小技巧

- `flutter` 支持可以让全部动画放慢

```
import 'package:flutter/scheduler.dart' show timeDilation;

// 放慢5倍
timeDilation = 5.0
```
