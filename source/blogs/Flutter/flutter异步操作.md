---
title: flutter异步操作
createTime: 2023-09-08 10:47
tags: flutter
abstract: flutter异步操作
---

## 事件循环(Event Loop)

- 计算密集型
- IO 密集型

异步队列

- `Event Queue`
- `Microtask Queue`

```dart
scheduleMicrotask(() => print('A'));
```

`Microtask Queue` 优先级比 `Event Queue` 高

验证 `_completed.then()` 会立即执行，而不是再次添加到 `Microtask Queue` 里

```dart
Future.delayed(
  Duration(seconds: 1),
  () => print("delayed"),
).then((value) {
  scheduleMicrotask(() => print("micro"));
  print("then")
}).then((value) {
  print("then2");
});

// 输出结果
// delayed
// then
// then2
// micro
```

```dart
Future.value('123')
  .then((value) => print(value))
  .catchError((err) => print(err))
  .whenComplete(() => print("complete"));
```

## FutureBuilder

```dart
FutureBuilder(
  future: Future.delayed(Duration(seconds: 2), () => 456),
  builder: (BuildContext context, AsyncSnapshot<dynamic> snapshot) {
    if (snapshot.connectionState == ConnectionState.waiting) {
      return CircularProgressIndicator();
    }
    if (snapshot.connectionState == ConnectionState.done) {
      if (snapshot.hasError) {
        return Icon(Icons.error, size: 80);
      }
      return Text("${snapshot.data}");
    }
    throw "should not happen";
  },
)
```

可以简写

```dart
FutureBuilder(
  future: Future.delayed(Duration(seconds: 2), () => 456),
  builder: (BuildContext context, AsyncSnapshot<dynamic> snapshot) {
    if (snapshot.hasError) {
      return Icon(Icons.error, size: 80);
    }
    if (snapshot.hasData) {
      return Text("${snapshot.data}");
    }
    return CircularProgressIndicator();
  },
)
```

## Stream 与 StreamBuilder

```dart
final stream = Stream.periodic(
  Duration(seconds: 1),
  (_) => 42,
);

stream.listen((event) {
  print("stream: $event");
});
```

```dart
DefaultTextStyle(
  style: Theme.of(context).textTheme.headline4,
  child: StreamBuilder(
    stream: stream,
    builder: (BuildContext context, AsyncSnapshot<dynamic> snapshot) {
      switch(snapshot.connectionState) {
        case ConnectionState.none:
          return Text("NONE: 没有数据流");
          break;
        case ConnectionState.waiting:
          return Text("WAITING: 等待数据了");
          break;
        case ConnectionState.active:
          if (snapshot.hasError) {
            return Text("ACTIVE: 错误: ${snapshot.error}");
          } else {
            return Text("ACTIVE: 正常：${snapshot.data}");
          }
          break;
        case ConnectionState.done:
          return Text("NONE: 完成");
          break;
      }
    },
  ),
)
```

### StreamController

```dart
final controller = StreamController();

// 添加
controller.sink.add(10);

// 流
controller.stream;

controller.stream
  .where((event) => event is int)
  .map((event) => event * 2);

// 流去重
controller.stream.distinct();

// 添加 error
controller.sink.addError("oops");

// 关闭流
controller.close();

// 监听流
controller.stream.listen(
  (event) {
    print("event => $event");
  },
  onError: (err) => print("ERROR: $err"),
  onDone: () => print("DONE"),
);
```

流一般只能被一个监听，想要多个监听，需要创建广播数据流

```dart
final controller = StreamController.broadcast();
```

**注意：** 相比与普通流数据，广播数据流如果在没监听的情况下，是不会缓存的。

### async\*

`async*` 创建 `stream`

```dart
Stream<DateTime> getTime() async* {
  while(true) {
    await Future.delayed(Duration(seconds: 1));
    yield DateTime.now();
  }
}
```
