---
title: Daysnap全站
createTime: 2023-05-21 22:28
tags: 实战
coverUrl: /assets/images/WX20230517-173253@2x.png
abstract: Daysnap全站搭建，包含PC端、WAP端、移动端、起始页
---

## 简介

Daysnap 全站搭建，包含如下应用：

- 服务端
- PC 端
- WAP 端
- 移动端
- BOSS 端
- 起始页

## 功能

- 一期(`2023-05-22` ~ `2023-10-31`)
  - 登录/注册
  - 个人中心
  - 上传照片(限制只能上传、修改当天的照片，一天只能上传一张照片，核心功能)
  - 照片可设置私密/公开
  - 发现(用户所上传公开的照片)
  - 点赞
  - 收藏
  - 关注
  - 下载，支持下载原图
- 二期(待定)
  - 评论，楼中楼
  - 支持选取时间段内所上传的图合并成短视频
  - 合成短视频分享
  - 消息推送、提醒
  - 埋点

## 服务端

- 技术栈
  - `nest.js`
  - `typescript`
  - `mysql`
  - `TypeORM`
  - `redis`
  - `docker`
  - `jenkins`
- 一期开发周期：`2023-05-22` ~ `2023-07-16`

参考文档：

- [NestJS 中文文档](https://docs.nestjs.cn/9/firststeps)
- [数据库设计参考](https://open.yesapi.cn/list.html)
- [TypeORM 中文文档](https://typeorm.bootcss.com/)

## PC 端&WAP 端

支持响应式，PC 端和 WAP 端是一套代码

- 技术栈
  - `next.js`
  - `react`
  - `typescript`
  - `jenkins`
- 一期开发周期：`2023-07-16` ~ `2023-08-31`

## 移动端

- 技术栈
  - `Flutter`
  - `GetX`
  - `混合开发`
- 一期开发周期：`2023-09-01` ~ `2023-10-31`

## Boss 端

后台管理系统

- 技术栈
  - `vue3`
  - `vue-router`
  - `pina`
  - `ElementPlus`
- 一期开发周期：`2023-05-22` ~ `2023-08-31`

## 起始页

各浏览器起始页，一期先做 `chrome` 浏览器起始页

- 技术栈
  - `React`
- 一期开发周期：`2023-05-22` ~ `2023-10-31`
