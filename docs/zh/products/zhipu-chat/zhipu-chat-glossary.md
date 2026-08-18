---
title: 智谱清言 / Z.ai 术语表
description: 不教操作。只解释清言、Z.ai、ChatGLM、Coding Plan 为什么不是同一个东西。
domain: product
tags:
  - coding-agent
role: glossary
---

# 智谱清言 / Z.ai 术语表

不教操作。只解释名字为什么打架。选入口看 [学习地图](./index.md)。

## 都带「智谱 / GLM / Z.ai」的东西

| 名字 | 是什么 | 不是什么 |
|------|--------|----------|
| **智谱清言** | 国内消费端助手。协议定义：北京智谱华章科技有限公司经营的生成式人工智能产品（[付费协议 §1.1](https://chatglm.cn/pay/policy/vipservice)）。入口 [chatglm.cn](https://chatglm.cn) | 不是 Coding Plan，不是 API 控制台 |
| **Z.ai 对话** | 国际消费端助手。[chat.z.ai](https://chat.z.ai) title：Advanced AI Chatbot & Agent | 不是 `docs.z.ai` 里的 SDK 教程 |
| **Z.ai（公司站用法）** | 公司站 [zhipuai.cn](https://www.zhipuai.cn/zh) 把 Z.ai 既当品牌、又当原生产品之一 | 不等于「所有智谱产品都叫 Z.ai」 |
| **ChatGLM** | 2023 年发布的对话模型 / 清言商店文案里的旧称（[z.ai/company](https://z.ai/company) 时间线；App Store 介绍） | 不是现在要输入的产品 URL |
| **GLM** | 模型家族名。开放平台介绍：General Language Model（[docs.bigmodel.cn](https://docs.bigmodel.cn/cn/guide/start/introduction)） | 不是某一个 App |
| **GLM-5.2** | 2026-08-19 清言首页与 Z.ai 页面展示的旗舰模型名；研究页把它同时挂到聊天和 Coding Plan | 不是「聊天里永远只有这一个」 |
| **GLM Coding Plan** | 给 Claude Code 等编码工具的订阅（[z.ai/subscribe](https://z.ai/subscribe)） | 不是清言网页的安装步骤 |
| **ZCode** | 官方代码工具（[research/161](https://www.zhipuai.cn/zh/research/161)） | 不是 chat.z.ai 的聊天标签 |
| **AutoGLM** | 公司页与 [autoglm.zhipuai.cn](https://autoglm.zhipuai.cn) 上的 Agent / 报告助手 | 不是清言里某一个 Mode 的别名（官方把它单列成产品） |
| **AutoClaw** | 公司页原生产品；营销文案是本地 OpenClaw 客户端 | 不是 AutoGLM 的另一个拼写而已——公司页两者并排 |
| **CodeGeeX** | 官方新闻里的智能编程助手 | 不是清言 |
| **BigModel** | 国内开放平台 [bigmodel.cn](https://bigmodel.cn) | 不是聊天会员中心 |
| **清影** | 付费协议点名的生视频相关权益 | 不是独立于清言的本站教程 |

## 两套主体

| | 清言 | Z.ai |
|--|------|------|
| 产品 URL | chatglm.cn | chat.z.ai / z.ai |
| 协议里的运营方 | 北京智谱华章科技有限公司 | JINGSHENG HENGXING TECHNOLOGY PTE.LTD（[Terms](https://docs.z.ai/legal-agreement/terms-of-use)） |
| 官方有没有写「同一登录」 | 没有 | 没有 |

所以：**不要**把清言会员、Z.ai 登录、Coding Plan、开放平台 API Key 画成一口池子。清言协议只保证「清言会员」和「开放平台付费」独立且可叠加（§4.4），没说国际站共用。

## 对话里的 Agent 不是仓库 Agent

清言首页把自己写成 Agent：理解目标、调用工具、把回答变成交付结果。Z.ai description 写 Build websites、write code、long-horizon tasks。

这仍是**聊天面**：

- 没有官方「在仓库里跑清言 CLI」的步骤。
- 官方把仓库 / IDE 编码放到 **GLM Coding Plan** 和 **ZCode**（研究页「Agent」小节）。
- 对话里生成的页面或代码，不会自动变成你本机的 git commit。

对位关系：清言 / Z.ai 对话 ≈ Claude.ai；Coding Plan / ZCode ≈ 给别的编码工具供电，**不是**本目录的 Claude Code 教程。

## 禁止当事实写

- 「清言和 chat.z.ai 同一个账号」
- 「免费每天 N 次」（三方站常见，官方协议只说看会员页）
- 把 App Store 某一天的 ¥ 内购表写成全国统一价
- 产品名写成「ChatGLM 网页版安装 Coding Plan」
- 用 `docs.z.ai` 的 API 模型表当清言下拉框

## 相关页面

- [学习地图](./index.md)
- [教程](./zhipu-chat.md)
- [速查表](./zhipu-chat-cheatsheet.md)
