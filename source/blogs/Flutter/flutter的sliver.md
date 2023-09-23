---
title: Flutter 的sliver
createTime: 2023-09-23 15:35
tags: flutter
abstract: Flutter 的sliver
---

## CustomScrollView

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
    )
  ]
)
```
