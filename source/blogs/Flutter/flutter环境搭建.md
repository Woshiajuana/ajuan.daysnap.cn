---
title: Flutter环境搭建
createTime: 2023-06-20 10:38
tags: docker
abstract: flutter 环境相关配置搭建
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

## FVM

FVM 用来管理 flutter 的版本

[官网地址](https://fvm.app/)

### 安装

1. 安装 `fvm`

```bash
brew uninstall leoafarias/fvm/fvm
brew untap leoafarias/fvm
```

2. 安装 `sdk`

```bash
fvm install 3.7.6
```

3. 设置全局

```bash
fvm global 3.7.6
```

4. 修改环境变量

```bash
code ~/.bash_profile
```

```
# flutter sdk
export PATH=${PATH}:~/fvm/default/bin

# dart sdk
export PATH=${PATH}:~/fvm/default/bin/cache/dart-sdk/bin
export PATH=${PATH}:~/.pub-cache/bin
```

```bash
source ~/.bash_profile
```

5. `vscode` 配置

`setting.json` 面板

```json
"dart.flutterSdkPath": "~/fvm/default/bin"
```

`Android studio` 设置

```bash
~/fvm/default/bin
```

### 常用命令

```bash
# 安装
fvm install 3.7.6

# 设置全局默认
fvm global 3.7.6

# 使用
fvm use 3.7.6

# 删除SDK
fvm remove 3.7.6

# 查看已安装版本
fvm list

# 查看可安装版本
fvm release

# 检测环境
fvm doctor
```

### 卸载

```bash
brew tap leoafarias/fvm
brew install fvm
```

### 项目单独配置 sdk 版本

- 进入到项目目录，执行

```bash
fvm use 3.7.6
```

- vscode sdk 搜索

编辑 `.vscode/settings.json`

```json
{
  "dart.flutterSdkPath": ".fvm/flutter_sdk",
  // Remove .fvm files from search
  "search.exclude": {
    "**/.fvm": true
  },
  // Remove from file watching
  "files.watcherExclude": {
    "**/.fvm": true
  }
}
```

- `Android Studio` 忽略搜索目录

修改 `.idea/workspace.xml`

```xml
<component name="VcsManagerConfiguration">
  <ignored-roots>
    <path value="$PROJECT_DIR$/.fvm/flutter_sdk" />
  </ignored-roots>
</component>
```

- `Android Studio` 调整 sdk 位置

- `Git` 忽略 `fvm/flutter_sdk`

编辑 `.gitignore`

```bash
.fvm/flutter_sdk
```

## 常见问题

1. Dart sdk 重复

```
[!] Flutter (Channel stable, 3.7.6, on Mac OS X 10.14.6 18G103 darwin-x64, locale
    zh-Hans-CN)
    ! Warning: `dart` on your path resolves to
      /usr/local/Cellar/dart/3.0.5/libexec/bin/dart, which is not inside your current
      Flutter SDK checkout at /Users/ajuan/fvm/versions/3.7.6. Consider adding
      /Users/ajuan/fvm/versions/3.7.6/bin to the front of your path.
```

根据路径 `Cellar`，判断出这是使用 `homebrew`安装的 `Dart`。

使用 `brew list` 查看是否安装过

```bash
brew list
```

现在 `flutter sdk` 会包含 `dart sdk`，所以直接卸载 `Dart` 即可

```bash
brew remove dart
```
