---
title: SliverFillRemaining 布局
createTime: 2023-10-02 23:29
tags: flutter
abstract: flutter
---

直接上代码

```dart
Widget build(BuildContext context) {
  return Scaffold(
    appBar: AppBar(
      title: 'Demo',
    ),
    body: CustomScrollView(
      slivers: [
        SliverToBoxAdapter(
          child: Column(
            children: [
              FlutterLogo(size: 100),
              FlutterLogo(size: 100),
              FlutterLogo(size: 100),
            ],
          ),
        ),
        SliverFillRemaining(
          hasScrollBody: false,
          child: Align(
            alignment: Alignment.bottomCenter,
            child: Padding(
              padding: const EdgeInsets.all(32),
              child: ElevatedButton(
                onPressed: () {},
                child: Text('Next'),
              ),
            ),
          ),
        ),
      ],
    ),
  );
}
```
