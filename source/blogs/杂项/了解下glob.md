---
title: 了解下 glob
createTime: 2024-01-03 21:57
tags: 杂项
abstract:
---

`glob` 来自于 `Linux`，允许使用者通过 “通配符” 来匹配目录和文件。

## 基础语法

```
*	匹配任意长度任意字符
**	代表0或多个层级的目录
?	匹配任意单个字符
[list]	匹配指定范围内（list）任意单个字符，也可以是单个字符组成的集合
[^list]	匹配指定范围外的任意单个字符或字符集合
[!list]	同[^list]
{str1,str2,...}	匹配 srt1 或者 srt2 或者更多字符串，也可以是集合
() 小括号必须跟在 ?、*、+、@、! 后面使用，且小括号里面的内容是一组以 | 分隔符的模式集合，例如：abc|a?c|ac*。
```

## 专用字符集

```
[:alnum:] 任意数字或者字母
[:alpha:] 任意字母
[:space:] 空格
[:lower:] 小写字母
[:digit:] 任意数字
[:upper:] 任意大写字母
[:cntrl:] 控制符
[:graph:] 图形
[:print:] 可打印字符
[:punct:] 标点符号
[:xdigit:] 十六进制数
[:blank:] 空白字符（未验证）
```

## node 下的 glob

### glob

### fast-glob

这是一款比 node-glob 速度更快的 glob 工具库，一些大家所熟知的比如 eslint、vite 等工具都是用了 fast-glob 作为依赖

## globby

基于快速glob，但添加了一堆有用的功能。