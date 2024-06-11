---
title: Flutter命令
createTime: 2024-06-11 15:11
tags: flutter
abstract: flutter 基础
---

## 创建项目

```sh
flutter create --project-name hello_flutter --org cn.coderpig --platforms=android,ios --android-language java --ios-language objc hello_flutter
```

- `--project-name` 项目名称，只能由小写字母、下划线和数字组成。

- `--org` 项目包名

- `--platforms` 限定支持的平台

- `--android-language` 设置安卓端项目语言，可选值：`java`, `kotlin`(默认)

- `--ios-language` 设置 iOS 端项目语言，可选值：`objc`, `swift`(默认)

如果想继续添加支持的平台，在项目根目录下执行

```sh
flutter config --enable-macos-desktop
flutter config --enable-linux-desktop
flutter config --enable-windows-desktop
```

## 运行

- `flutter devices` 可以查看可供运行的设备

- `flutter run -d 设备名称` 即可在对应的设备上运行程序
