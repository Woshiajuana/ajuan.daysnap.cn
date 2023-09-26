---
title: Flutter进阶
createTime: 2023-09-23 20:18
tags: flutter
abstract: Flutter进阶
---

## 状态提升(Lifting-state-up)

把子组件各自管理的状态提升到共同的父组件，称之为状态提升。

优点操作、实现简单，缺点性能稍差，代码维护困难

- `const`
- 拆分组件，更小范围去重绘

## 如何访问和修改外部状态

- 子组件想获取父组件的数据，直接传递数据
- 子组件想修改父组件数据，`callback` 回传函数
- 父组件控制子组件通过 `Controller` 控制器

## 所谓【控制器】到底是什么

一个复杂组件的内部状态可以单独封装成控制器，然后交给父级组件控制内部状态数据。

```dart
class Foo extends StatefulWidget {
  final FooController controller;

  const Foo({ Key? key, require this.controller }) : super(key: key);

  @override
  _FooState createState() => _FooState();
}

class _FooState extends State<Foo> {
  @override
  Widget build(BuildContext context) {
    return Container(
      color: Colors.red.withOpacity(0.5),
      child: Column(
        children: [
          FlutterLogo(size: widget.dh.value * 100 + 50),
          AnimatedBuilder(
            animation: widget.controller,
            builder: (BuildContext context, Widget? child) {
              return Slider(
                value: widget.controller.value,
                onChanged: (double value) {
                  setState((){
                    widget.controller.value = value;
                  });
                },
              );
            }
          ),
        ],
      ),
    );
  }
}

class FooController extends ChangeNotifier {
  double _value = 0;

  DoubleHolder();

  double get value = _value;

  set value(double newValue) {
    _value = newValue;
    notifyListeners();
  }

  setMax() {
    _value = 100;
    notifyListeners();
  }
}

class _MyHomePageState extends State<MyHomePage> {
  FooController _controller = FooController();
  @override
  Widget build(BuildContext context) {
    return Container(
      color: Colors.red.withOpacity(0.5),
      child: Column(
        children: [
          Foo(
            controller: __controller,
          )
        ],
      ),
    );
  }
}
```

## 详解 ChangeNotifier 机制

`AnimatedBuilder`
`ListenableBuilder`

```dart
ListenableBuilder(
  listenable: widget.controller.value,
  builder: (BuildContext context, Widget? child) {
    return Text('Count: ${widget.controller.value}');
  },
)
```

简写

```dart
class CounterController extends ChangeNotifier {
  ValueNotifier<int> count = ValueNotifier(0);
  ValueNotifier<double> fontSize = ValueNotifier(48);
}
```

监听多个

```dart
ListenableBuilder(
  listenable: Listenable.merge([
    widget.controller.count,
    widget.controller.fontSize,
  ]),
  builder: (BuildContext context, Widget? child) {
    return Text(
      'Count:${widget.controller.count.value}',
    );
  },
)
```

## 继承式组件 InheritedWidget

定一个简单的

```dart
class MyColor extends InheritedWidget {
  final Color color = Colors.red;

  const MyColor({super.key, required super.child});

  // 如果值有变化的时候  需不需要通知使用的组件重绘
  @override
  bool updateShouldNotify(covariant InheritedWidget oldWidget) {
    return true;
  }
}
```

使用

```dart
MyColor(
  child: MaterialApp(
    title: 'Flutter Demo',
    theme: ThemeData(
      useMaterial3: true,
    ),
    home: const MyHomePage(
      title: 'Flutter Demo Home Page',
      child: Foo()
    ),
  ),
)

class Foo extends StatelessWidget{
  const Foo({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context){

    final myColor = context.dependOnInheritedWidgetOfExactType<MyColor>()

    return Container(
      width: 100,
      height: 100,
      color: Theme.of(context).
    );
  }
}

```

## 实例
