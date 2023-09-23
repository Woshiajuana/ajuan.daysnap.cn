---
title: Flutter 的sliver
createTime: 2023-09-23 15:35
tags: flutter
abstract: Flutter 的sliver
---

## CustomScrollView

视窗

```dart
CustomScrollView(
  slivers: [
    SliverToBoxAdapter(
      child: FlutterLogo(size: 100),
    ),
    SliverGrid(
      delegate: SliverChildBuilderDelegate((context, index) {
        return Container(
          height: 200,
          color: Colors.primaries[index % 18],
        );
      }, childCount: 23),
      gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 4,
      ),
    ),
    SliverList(
      delegate: SliverChildBuilderDelegate((context, index) {
        return Container(
          height: 200,
          color: Colors.primaries[index % 18],
        );
      }),
      childCount: 8,
    ),
  ]
)
```

## 各种 sliver 列表

除了上面例子里面的三个，还有很多

```dart
CustomScrollView(
  slivers: [
    SliverFixedExtentList(
      itemExtend: 200,
      delegate: SliverChildListDelegate([
        FlutterLogo(),
        FlutterLogo(),
        FlutterLogo(),
      ]),
    ),
    SliverPrototypeExtentList(
      prototypeItem: FlutterLogo(size: 48),
      delegate: SliverChildListDelegate([
        FlutterLogo(),
        FlutterLogo(),
        FlutterLogo(),
      ]),
    ),
    SliverFillViewport(
      delegate: SliverChildListDelegate([
        FlutterLogo(),
        FlutterLogo(),
        FlutterLogo(),
      ]),
    ),
  ]
)
```

- `SliverFixedExtentList` 固定高度，主要用于滚动到某个列表项，用于优化性能
- `SliverPrototypeExtentList`
  - `prototypeItem` 指的原型，不会展示在页面上，会按照这个原型的高度排列子组件
- `SliverFillViewport` 会让每子组件填满视窗

## SliverAppBar

```dart
CustomScrollView(
  slivers: [
    SliverAppBar(
      title: Text("sliver app bar"),
      // floating: false,
      // pinned: false,
      // snap: false
      stretch: true, // 允许拉伸
      expandedHeight: 300,
      flexibleSpace: FlexibleSpaceBar(
        background: FlutterLogo(),
        title: Text("flexibleSpace title"),
        collapseMode: CollapseMode.parallax, // 折叠效果 默认效果
        stretchModes: [
          StretchMode.blurBackground, // 模糊背景
          StretchMode.zoomBackground, // 缩放
          StretchMode.fadeTitle, // 淡入淡出
        ],
      ),
    ),
    SliverList(
      delegate: SliverChildListDelegate([
        FlutterLogo(),
        FlutterLogo(),
        FlutterLogo(),
      ]),
    ),
  ]
)
```

- `floating` 向上滚动消失，向下滚动出现
- `snap` 轻拉也直接出现
- `pinned` 固定顶部不动
- `flexibleSpace`

## 更多 sliver 组件

```dart
CustomScrollView(
  slivers: [
    SliverAnimatedOpacity(
      duration: Duration(seconds: 1),
      opacity: 1.0,
      sliver: SliverToBoxAdapter(
        child: FlutterLogo(size: 100),
      ),
    ),
    SliverFillRemaining(
      child: Placeholder(),
    ),
    SliverLayoutBuilder(
      builder: (BuildContext context, SliverConstraints constraints) {
        print(constraints);
        return SliverToBoxAdapter();
      },
    ),
  ],
)
```

- `SliverFillRemaining` 占据填满视窗剩余空间

## 实例

```dart
CustomScrollView(
  slivers: [
    SliverPersistentHeader(
      delegate: _MyDelegate("A"),
      pinned: true,
    ),
    _buildTeamList("")
  ],
)

class _MyDelegate extends SliverPersistentHeaderDelegate {
  final title;

  _MyDelegate(this.title);

  @override
  Widget build(BuildContext context, double shrinkOffset, bool overlapsContent) {
    return Text(title);
  }

  @override
  double get maxExtent => 32;

  @override
  double get minExtent => 32;

  @override
  bool shouldRebuild(covariant _MyDelegate oldDelegate) {
    return oldDelegate.title != title;
  }
}
```
