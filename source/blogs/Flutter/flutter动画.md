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
