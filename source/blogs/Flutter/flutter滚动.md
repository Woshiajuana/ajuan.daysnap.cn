---
title: Flutter滚动
createTime: 2023-09-07 22:50
tags: flutter
abstract: Flutter滚动
---

## ListView

### 滚动列表

```dart
ListView(
  children: [
    Container(
      color: Colors.blue,
      height: 20,
      alignment: Alignment.center,
    ),
    Container(
      color: Colors.blue,
      height: 20,
      alignment: Alignment.center,
    ),
    // ...
  ],
)
```

### 动态加载

```dart
ListView.builder(
  itemCount: 88,
  cacheExtent: 0,
  itemBuilder: (context, index) {
    return Container(
      color: Colors.blue[(index % 5) * 100],
      height: 20,
      alignment: Alignment.center,
      child: Text("$index"),
    );
  },
)
```

- `itemCount` 渲染的总个数
- `cacheExtent` 缓冲区高度

### 添加分割线

```dart
ListView.separated(
  itemCount: 88,
  separatorBuilder: (context, index) {
    if (index == 0) {
      return Divider(thickness: 4);
    }
    return Divider();
  },
  itemBuilder: (context, index) {
    return Container(
      color: Colors.blue[(index % 5) * 100],
      height: 20,
      alignment: Alignment.center,
      child: Text("$index"),
    );
  },
)
```

- `separatorBuilder` 渲染分割 `widget`

### 深入了解

```dart
final _controller = ScrollController()
```

```dart
Scrollbar(
  child: ListView.builder(
    controller: _controller,
    itemBuilder: (context, index) {
      return Container(
        height: 150,
        color: index % 2 == 0 ? Colors.blue : Colors.blue[200],
      );
    },
    itemCount: 200,
    itemExtent: 60,
  ),
)
```

滚动到顶部

```dart
_controller.jumpTo(0.0);
```

带动画的跳转

```dart
_controller.animateTo(
  // 0.0,
  -20.0, // 小技巧，设置成负数，回到顶部会有回弹效果
  duration: Duration(seconds: 1),
  curve: Curves.linear,
);
```

获取现在的位置

```dart
const position = _container.offset;
```

滚动回弹效果 `physics`

这个并不是系统的效果，而是 `flutter` 模拟的

- `ClampingScrollPhysics` 安卓效果
- `BouncingScrollPhysics` iOS 效果

```dart
ListView.builder(
  physics: ClampingScrollPhysics(),
  controller: _controller,
  itemBuilder: (context, index) {
    return Container(
      height: 150,
      color: index % 2 == 0 ? Colors.blue : Colors.blue[200],
    );
  },
  itemCount: 200,
  itemExtent: 60,
)
```

## 下拉刷新与通知事件

### Scrollbar

```dart
Scrollbar(
  isAlwaysShown: true,
  controller: _controller,
  child: ListView.builder(
    controller: _controller,
    itemBuilder: (context, index) {
      return Container(
        height: 150,
      );
    },
  ),
)
```

- `controller` 滚动条控制器
- `isAlwaysShown` 是否一直显示滚动条，如果设置为 `true`，那么 `controller` 就得配置

### RefreshIndicator 下拉刷新

```dart
RefreshIndicator(
  onRefresh: () async {
    // 请求接口
    await Future.delayed(Duration(seconds: 2));
  },
  child: ListView.builder(
    controller: _controller,
    itemBuilder: (context, index) {
      return Container(
        height: 150,
      );
    },
  ),
)
```

### NotificationListener 事件监听

```
NotificationListener(
  onNotification: (ScrollNotification _event) {
    print(_event)
    return false;
  },
  child: ListView.builder(
    controller: _controller,
    itemBuilder: (context, index) {
      return Container(
        height: 150,
      );
    },
  ),
)
```

- `onNotification` 监听事件，返回值是否阻止事件继续向上冒泡。
  - `true` 阻止
  - `false` 不组织

## 支持滑动删除的 Dismissible

```
ListView.builder(
  itemCount: 200,
  itemBuilder: (_, index) {
    return Dismissible(
      key: UniqueKey(),
      onDismissed: (direction) {
        print(direction);
        // 处理删除的业务逻辑
      },
      confirmDismiss: (direction) async {
        return false
      },
      child: Container(
        height: 50,
        color: Colors.blue,
      ),
    );
  },
)
```

- `key`： 因为支持滑动删除，所以 `key`是必须要给的，不然就不知道具体删除哪一项。
- `onDismissed`：回调事件
- `confirmDismiss`：确认是否删除这一项
