---
title: Flutter环境搭建
createTime: 2023-06-20 10:38
tags: docker
abstract:
---

## Flutter SDK

1. 下载 flutter sdk

   [SDK 压缩包列表](https://docs.flutter.dev/development/tools/sdk/releases?tab=macos)

2. 配置环境变量

打开 `.bash_profile` 配置文件

```bash
vi ~/.bash_profile
```

写入配置

```
# ----------- flutter start -----------

# flutter sdk
export PATH=${PATH}:~/flutter/bin

# dart sdk
export PATH=${PATH}:~/flutter/bin/cache/dart-sdk/bin
export PATH=${PATH}:~/.pub-cache/bin

# flutter-io 国内镜像
export PUB_HOSTED_URL=https://pub.flutter-io.cn
export FLUTTER_STORAGE_BASE_URL=https://storage.flutter-io.cn

# android
export ANDROID_HOME=~/Library/Android/sdk
export PATH=${PATH}:${ANDROID_HOME}/platform-tools
export PATH=${PATH}:${ANDROID_HOME}/tools
export PATH=${PATH}:${ANDROID_HOME}/build-tools/30.0.1
export PATH=${PATH}:${ANDROID_HOME}/ndk-bundle

# ----------- flutter end -----------
```

生效

```bash
source ~/.bash_profile
```

3. 检测安装状态

```bash
flutter doctor
```