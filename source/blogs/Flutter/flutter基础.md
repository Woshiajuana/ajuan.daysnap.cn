---
title: Flutter基础
createTime: 2023-06-22 15:21
tags: flutter
abstract: flutter 基础
---

## 基础特性

### 布局约束规则

- 让子元素尽可能的大，撑满父元素

- 确认位置后，按子元素大小显示

### 核心规则

- 上层 widget 向下层 widget 传递约束条件

- 下层 widget 向上层 widget 传递大小信息

- 上层 widget 决定下层 widget 的位置

### 松约束

定义：当一个 widget 告诉其子元素可以比自身更小的话，我们通常称这个 widget 对其子级使用宽松约束

- Column 宽度等于子元素最大宽度

- Container 紧包裹子元素

### 紧约束

定义：它的最大/最小宽度是一致的，高度也一样

可以通过 `BoxConstraints.tight` 可以设置紧约束

```dart
Widget build() {
  return MaterialApp(
    home: Scaffold(
      body: Center(
        child: ConstrainedBox(
          constraints: BoxConstraints.tight(const Size(100, 100))
          child: Container(
            color: Container(
              color: Colors.amber,
              width: 10,
              height: 10,
            )
          ),
        ),
      ),
    ),
  );
}
```

- ConstrainedBox 约束组件
  - `constraints` 通过 `maxWidth`、`maxHeight`，来设置子组件最大约束

### 无边界 unbounded

UnconstrainedBox 不受约束

- `UnconstrainedBox` 包裹的内部的元素可以不受约束自己控制大小

- `Row`、`Column`、`ListView` 这种组件属于 `unbounded`

## 生命周期

![一图概况](/assets/images/000129.png)

执行顺序，从上往下：

|         名称          |                        说明                         |
| :-------------------: | :-------------------------------------------------: |
|      createState      |               创建 State 只执行 1 次                |
|       initState       |     初始 State, mounted 等于 true, 只执行 1 次      |
| didChangeDependencies | 父或祖先 widget 中的 InheritedWidget 改变时会被调用 |
|         build         |             UI 被重新渲染的时候多次执行             |
| addPostFrameCallback  |              渲染结束回调，只执行 1 次              |
|    didUpdateWidget    |           父类 setState 后，子类就会触发            |
|      deactivate       |             从组件树中移除 State 时调用             |
|        dispose        |                  组件被释放时调用                   |

```dart
import 'package:flutter/material.dart';
import 'package:flutter/scheduler.dart';

void main() {
  runApp(const MyApp());
}

const img1 =
    "https://ducafecat.tech/2021/12/09/blog/2021-jetbrains-fleet-vs-vscode/2021-12-09-10-30-00.png";
const img2 =
    "https://ducafecat.tech/2021/12/09/blog/2021-jetbrains-fleet-vs-vscode/2021-12-09-20-45-02.png";

Widget imageWidget({required String imgUrl}) {
  return Container(
    padding: const EdgeInsets.all(10),
    color: Colors.amber,
    child: Image.network(imgUrl),
  );
}

class BannerWidget extends StatefulWidget {
  const BannerWidget({Key? key}) : super(key: key);

  // 创建 State 只执行1次
  @override
  State<BannerWidget> createState() {
    print("createState");
    return _BannerWidgetState();
  }
}

class _BannerWidgetState extends State<BannerWidget> {
  String? imgUrl;

  // 初始 State, mounted 等于 true, 只执行1次
  @override
  void initState() {
    super.initState();
    print("initState");

    // 渲染结束调用，只执行1次
    SchedulerBinding.instance?.addPostFrameCallback((timeStamp) {
      print("addPostFrameCallback");
      print(timeStamp);
    });
  }

  // 父或祖先widget中的InheritedWidget改变时会被调用
  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    print("didChangeDependencies");
  }

  // 父类 setState 后，子类就会触发
  @override
  void didUpdateWidget(oldWidget) {
    super.didUpdateWidget(oldWidget);
    print("didUpdateWidget");
  }

  // 从组件树中移除 State 时调用
  @override
  void deactivate() {
    super.deactivate();
    print("deactivate");
  }

  // 组件被释放时调用
  @override
  void dispose() {
    print("dispose");
    super.dispose();
  }

  // UI 被重新渲染的时候多次执行
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        ElevatedButton(
          onPressed: () {
            if (mounted == true) {
              setState(() {
                imgUrl = imgUrl == img1 ? img2 : img1;
              });
            }
          },
          child: const Text("切换图片"),
        ),
        imageWidget(
          imgUrl: imgUrl ?? img1,
        ),
      ],
    );
  }
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        body: Column(
          children: const [
            Text('有无状态组件'),
            BannerWidget(),
          ],
        ),
      ),
      debugShowCheckedModeBanner: false,
    );
  }
}
```

输出结果

```bash
flutter: createState
flutter: initState
flutter: didChangeDependencies
flutter: addPostFrameCallback
flutter: 0:00:00.000000
```

## App 生命周期

|    名称    |                         说明                          |
| :--------: | :---------------------------------------------------: |
|  resumed   |             应用程序可见且响应用户输入。              |
|  inactive  |      应用程序处于非激活状态，无法响应用户输入。       |
|   pause    |    应用程序不可见且无法响应用户输入，运行在后台。     |
|  detached  | 应用程序仍寄存在 Flutter 引擎上，但与平台 View 分离。 |
| suspending |          应用被挂起，此状态 IOS 永远不会回调          |

```dart
import "package:flutter/material.dart";

void main() {
  runApp(const MyApp());
}

class MyApp extends StatefulWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  _MyAppState createState() => _MyAppState();
}

//实现WidgetsBindingObserver观察者
class _MyAppState extends State<MyApp> with WidgetsBindingObserver {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance?.addObserver(this); //添加观察者
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: const Text("App生命周期"),
        ),
        body: Column(
          children: <Widget>[
            const Text("首页"),
          ],
        ),
      ),
    );
  }

  //  生命周期变化时回调
  //  resumed:应用可见并可响应用户操作,app进入前台
  //  inactive:用户可见，但不可响应用户操作，比如来了个电话,前后台切换的过渡状态
  //  paused:已经暂停了，用户不可见、不可操作，app进入后台
  //  suspending：应用被挂起，此状态IOS永远不会回调
  @override
  void didChangeAppLifecycleState(AppLifecycleState state) {
    super.didChangeAppLifecycleState(state);
    print("didChangeAppLifecycleState: $state");
  }

  //当前系统改变了一些访问性活动的回调
  @override
  void didChangeAccessibilityFeatures() {
    super.didChangeAccessibilityFeatures();
    print("didChangeAccessibilityFeatures");
  }

  //低内存回调
  @override
  void didHaveMemoryPressure() {
    super.didHaveMemoryPressure();
    print("didHaveMemoryPressure");
  }

  //用户本地设置变化时调用，如系统语言改变
  @override
  void didChangeLocales(List<Locale>? locale) {
    super.didChangeLocales(locale);
    print("didChangeLocales");
  }

  //应用尺寸改变时回调，例如旋转
  @override
  void didChangeMetrics() {
    super.didChangeMetrics();
    Size? size = WidgetsBinding.instance?.window.physicalSize;
    print("didChangeMetrics  ：宽：${size?.width} 高：${size?.height}");
  }

  //系统切换主题时回调
  @override
  void didChangePlatformBrightness() {
    super.didChangePlatformBrightness();
    print("didChangePlatformBrightness");
  }

  ///文字系数变化
  @override
  void didChangeTextScaleFactor() {
    super.didChangeTextScaleFactor();
    print(
        "didChangeTextScaleFactor  ：${WidgetsBinding.instance?.window.textScaleFactor}");
  }

  @override
  void dispose() {
    super.dispose();
    WidgetsBinding.instance?.removeObserver(this); //销毁观察者
  }
}
```
