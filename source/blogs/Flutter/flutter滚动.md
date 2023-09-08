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

### 支持滑动删除的 Dismissible

```dart
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
        return showDialog(
          context: context,
          builder: (_) {
            return AlertDialog(
              title: Text("Are you sure?"),
              content: Text("Do you want to delete this item?"),
              actions: [
                FlatButton(
                  child: Text("Cancel"),
                  onPressed: () => Navigator.of(context).pop(false),
                ),
                FlatButton(
                  child: Text("Delete"),
                  onPressed: () => Navigator.of(context).pop(true),
                ),
              ],
            );
          },
        );
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

## GridView 二维网格列表

- `SliverGridDelegateWithFixedCrossAxisCount` 交叉轴固定个数

```dart
GridView.builder(
  itemCount: 200,
  gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
    crossAxisCount: 4,
    childAspectRatio: 16 / 9,
  ),
  itemBuilder: (_, index) => Container(
    color: Colors.blue[index % 8 * 100],
  ),
)
```

```dart
GridView.count(
  crossAxisCount: 4,
  children: [],
)
```

- `SliverGridDelegateWithMaxCrossAxisExtent` 交叉轴固定宽度

```dart
GridView.builder(
  itemCount: 200,
  gridDelegate: SliverGridDelegateWithMaxCrossAxisExtent(
    maxCrossAxisExtent: 120,
    childAspectRatio: 16 / 9,
  ),
  itemBuilder: (_, index) => Container(
    color: Colors.blue[index % 8 * 100],
  ),
)
```

```dart
GridView.extent(
  maxCrossAxisExtent: 120,
  children: [],
)
```

## 其他滚动 Widget

### ListWheelScrollView

3D 滚动的转轮

```dart
ListWheelScrollView(
  children: List.generate(
    10,
    (index) => Container(
      color: Colors.blue,
    ),
    offAxisFraction: 1.5,
    diameterRatio: 0.8,
    overAndUnderCenterOpacity: 0.8,
    magnification: 2.5,
    useMagnifier: true,
    itemExtent: 100,
    physics: FixedExtentScrollPhysics(),
    onSelectedItemChanged: (index) => {
      // 停在哪个位置 index
    }
  ),
)
```

### PageView

```dart
PageView(
  pageSnapping: true,
  scrollDirection: Axis.vertical,
  children: [
    Container(color: Colors.blue),
    Container(color: Colors.orange),
  ],
)
```

### ReorderableListView

拖拽排序列表组件

```dart
ReorderableListView(
  children: List.generate(
    20,
    (index) => Text("$index", key: UniqueKey()),
  ),
  onRecorder: (int oldIndex, int newIndex) => {
    print("moved from $oldIndex to $newIndex");
  },
)
```

### SingleChildScrollView

单个子滚动视图

```dart
SingleChildScrollView(
  child: Column(
    children: [
      //
    ],
  ),
)
```
