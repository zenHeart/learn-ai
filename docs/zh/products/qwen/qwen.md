---
title: 千问教程
description: 写给谁：第一次打开 qianwen.com 的前端工程师。你会完成第一句对话，并知道电脑端和 App 的官方入口。
domain: product
tags:
  - chat
role: tutorial
---

# 千问教程

> 先打开 [qianwen.com](https://www.qianwen.com/) 或 [PC 客户端页](https://www.qianwen.com/download)。本页只复述能在官方页核对的入口和能力。

## 目标与非目标

**写给谁：** 第一次用千问的前端工程师。首页按钮文案是 **登录**；具体登录方式以页面为准。

**你会完成：** 在网页或客户端里发出第一句；知道电脑端和官方 App 怎么下。

**不会做：** 淘宝 / 支付宝注册教程、通义灵码 / Qoder 安装、百炼 API、编造会员价。

## 先决条件

- 能打开 `www.qianwen.com`（部分网络会把该域名解析到 `198.18.0.0/15`，先换 DNS / 关 Fake-IP 再判断「打不开」）。
- 客户端系统要求以官方页为准，两处不要混成一个数：
  - App Store：设备需装有 **iOS 14.0** 或更高版本；iPad 为 **iPadOS 14.0** 或更高。
  - Windows / Mac / Android / HarmonyOS 的数字门槛：2026-08-19 在下载页和协议里**没有**读到可引用的最低版本。<!-- TODO: 待核实电脑端与 Android 系统要求 -->

## 15 分钟内打开

### 1. 选一个官方入口

| 端 | 怎么走 | 来源 |
|----|--------|------|
| 网页 | 打开 [qianwen.com](https://www.qianwen.com/)，点 **登录** | 首页 |
| Windows / macOS | 首页 **下载电脑端**，或打开 [qianwen.com/download](https://www.qianwen.com/download)；Windows 也可走 [Microsoft Store · 千问](https://apps.microsoft.com/detail/xp8m1sgl1lzr2f)（id `XP8M1SGL1LZR2F`） | 首页、下载页、Microsoft Store |
| iOS / iPad | App Store「千问 - 阿里AI助手」（id `6466733523`） | [App Store](https://apps.apple.com/cn/app/%E5%8D%83%E9%97%AE-%E9%98%BF%E9%87%8Cai%E5%8A%A9%E6%89%8B/id6466733523) |
| Android | 应用宝「千问」，包名 `com.aliyun.tongyi` | [应用宝](https://sj.qq.com/appdetail/com.aliyun.tongyi) |

协议还写了 **HarmonyOS**、**浏览器插件**、**小程序**、**H5**（[用户服务协议](https://terms.alicdn.com/legal-agreement/terms/c_end_product_protocol/20231011201348415/20231011201348415.html) 1.1）。2026-08-19 没有找到这几个形态的千问助手独立安装页，本教程不写步骤。阿里云帮助中心的 [千问办公 HarmonyOS 指南](https://help.aliyun.com/zh/qwenwork/harmonyos-installation-guide) 是另一条产品线，不要当成 qianwen.com 助手安装。

登录：协议 5.1 写「通过手机号进行账号注册并登录，或者选择……第三方账号（淘宝、支付宝、Apple）」。那是登录手段，不是淘宝教程。

国际站 [chat.qwen.ai](https://chat.qwen.ai/) 页名是 **Qwen Studio**，按钮是 **Log in / Sign up**。它不是本页的安装路径。

### 2. 发出第一句

未登录首页可见：「你好，我是千问」。顶栏有 **API 服务**、**下载电脑端**、**登录**。当前模型标签是 **Qwen3.7-千问**。

登录后点 **新建对话**，在输入框提问。底部写「继续使用即表示您同意用户协议和隐私政策」——先打开协议再当免责套话忽略。

不要点顶栏 **API 服务** 当「开始聊天」。那是同厂 API 入口，教程在 #85，这里不写。

### 3. 电脑端：划词和侧边栏

只在需要桌面唤起时装客户端。官方下载页 title：`千问PC客户端 - 阿里AI助手`。搜索引擎收录的下载页原文包括：支持 AI 搜索、网页总结、AI PPT、AI 生图、PPT 创作和录音纪要；划词解读翻译。

用户协议 1.2 原文：Windows 及 Mac 客户端支持网页搜索与浏览，可借助**千问侧边栏**实现「边浏览边对话、边看边总结、即问即答」。

首页横幅另写：

| 动作 | 官方原文 |
|------|----------|
| 办公助理 | 「千问办公助理上线 解锁本地任务能力」；「支持手机远程操控，丰富技能与连接器，多格式交付」 |
| 划词 | 「千问快捷划词，全局使用的效率工具」；「随心划选浏览内容，即可唤醒千问总结、翻译和创作」 |
| 录音纪要 | 「断网也能稳定录，纪要自动整理，重要内容一句不漏」 |

电脑端快捷键：2026-08-19 **没有**在公开页读到可引用的组合键。<!-- TODO: 待核实电脑端快捷键 --> 以客户端设置为准，不要抄第三方博客。

## 官方能力（按出处分组）

### 首页在说什么

[qianwen.com](https://www.qianwen.com/) 可见：

- 侧栏：**新建对话**、**云空间**、**AI创作**、**定时任务**
- 模式：**快速**、**办公助理**、**本地电脑**
- 能力入口：PPT创作、AI生视频、AI生图、代码、翻译、AI写作、研究、录音纪要、千问高考、音视频速读
- 横幅：办公助理、千问输入法、录音纪要、快捷划词

「本地电脑」是产品里的一个模式，不是让你去装通义灵码。

### 商店长描述还列了什么

App Store 与应用宝「简介」在 2026-08-19 一致，包括：

- 对话问答：优质知识源、结构化答案、思考研究
- 办公助理：交付网页 / 应用 / PPT / Word / Excel / 图片；skills 技能
- 定时任务：周期性和一次性
- 语音通话：7×24；陪玩、睡前故事、带娃讲题、语音打车
- AI 智能体：智能体广场；对话里 `@` 唤起
- AI 生活帮手：外卖 / 酒店 / 餐厅 / 政务 / 购物建议
- AI 写作、AI PPT、智能编辑器（PDF / WORD / PPT / EXCEL 互转）
- 文档阅读：一次上传 10 个文档 / 图片，500 页超长文
- 代码处理：一句话生成小程序 / 网页 / 小游戏 / SQL；上传代码或截图检查与改写
- 实时记录：离线或实时语音转文字，会议纪要
- AI 创作：Wan 2.7 视频；Qwen-Image 2.0 生图 / P 图 / 修图
- 学习辅导：小讲堂、拍题、作业批改、5 亿资料库

这是**对话与交付**，不是克隆仓库、开 PR、接 MCP。仓库级编码去 [通义灵码 / Qoder CN](https://qoder.com.cn/)（本站 #84，这里不写教程）。

应用宝另有一段「通义介绍」仍写通义 APP、全民舞王、通义听悟、集成通义灵码。那是旧简介，**不要**当现行功能清单。

### 千问输入法

首页横幅：「千问输入法 App 全新上线」；「最快 300 字/分，说话即成稿，支持 9 种方言，无广告」。应用宝「厂商其它应用」列出 `com.qianwen.ime`。本教程不写输入法安装步骤。

## 模型文案不要选边

几处官方说法同时存在（2026-08-19）：

| 出处 | 原文 |
|------|------|
| 首页 | 模型标签 **Qwen3.7-千问**；description 写「最强Qwen大模型」 |
| App Store | 「最新、最强千问大模型」；创作侧写 **Wan 2.7**、**Qwen-Image 2.0** |
| Qwen Studio（国际站，非本教程） | 页上可见 **Qwen3.7-Plus** |
| 通义实验室 | 模型卡：Qwen3-Max / Qwen-Plus / Qwen-Flash 等 |

以你客户端里实际可选的名称为准。不要写「现在默认 Qwen3.7」。模型原理见 [Learn LLM](/zh/tech/fundamentals/LLM)。

## 协议与数据

使用前打开：

- [千问用户服务协议](https://terms.alicdn.com/legal-agreement/terms/c_end_product_protocol/20231011201348415/20231011201348415.html)（更新 2026-03-20，生效 2026-03-27）
- [千问产品隐私政策](https://terms.alicdn.com/legal-agreement/terms/privacy_policy_full/20231011201849846/20231011201849846.html)
- App 内购买另见 [会员协议](https://terms.alicdn.com/legal-agreement/terms/c_end_product_protocol/20260728154300619/20260728154300619.html)

协议服务范围原文包括网站、网页、客户端（iOS、Android、Windows、Mac、HarmonyOS）、浏览器插件、小程序、H5。条款正文以协议当前文本为准，本页不转述授权范围。

经营者原文：上海智信普惠科技有限公司。适用场合原文：「个人学习、研究、欣赏、日常生活、娱乐使用」。

套餐：App Store 标「免费 · App 内购买」。**没有**在 qianwen.com 找到价目表，不要编数字。

## 常见陷阱

- **把千问当成 Claude Code / Cursor。** 官方没有千问 CLI，也没有官方 IDE 插件页。编码工具是通义灵码 / Qoder CN（#84）。
- **把 `chat.qwen.ai` 收藏成「千问英文版」。** 那一页的产品名是 **Qwen Studio**。
- **跟着应用宝「通义介绍」写全民舞王 / 通义听悟。** 现行首页和 App Store 简介没有复现这些栏目。
- **为插件 / 小程序 / HarmonyOS 写安装步骤。** 协议有名字，没有找到千问助手独立安装页。
- **把百炼 Token Plan 的价格抄进笔记。** 那是 #85。
- **用淘宝账号登录之后开始写淘宝教程。** 登录手段 ≠ 产品范围。

## 下一步

- 回查入口和链接：[速查表](./qwen-cheatsheet.md)
- 分清名字：[术语表](./qwen-glossary.md)
- 回家族图：[学习地图](./index.md)
