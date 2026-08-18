---
title: 智谱清言 / Z.ai 对话
description: 写给谁：要在浏览器或官方 App 里用智谱助手的前端工程师。不需要仓库。
domain: product
tags:
  - coding-agent
role: tutorial
---

# 智谱清言 / Z.ai 对话

> 本页只根据官方产品页、付费协议、商店页和模型公告画对话面。对位 Claude.ai。
>
> 它**不是** GLM Coding Plan，也不是 ZCode。编码套餐见 [学习地图](./index.md) 那一行。

## 目标与非目标

**写给谁：** 前端工程师。你需要浏览器或清言 App。

**目标：** 写清两个官方对话入口实际是什么、能做什么、账号和付费边界在哪。

**非目标：** Coding Plan 安装、API SDK、臆造每日次数 / token 上限 / 现行会员价、模型内部（链 [Learn LLM](/zh/tech/fundamentals/LLM)）。

## 先决条件

- 能打开 [chatglm.cn](https://chatglm.cn) 或 [chat.z.ai](https://chat.z.ai)
- 国内面准备手机号 / 微信等清言支持的登录方式；国际面按 Z.ai 登录页为准
- 不需要 Git 仓库、不需要 API Key

## 学习目标

- 能选对「清言」还是「Z.ai」
- 能发出第一条对话，并认出官方能力芯片
- 知道会员权益绑在哪个账号上，以及为什么不能拿开放平台额度当清言会员

## 它是什么

一张对话面，两个官方入口。官方「在线体验」原文（[GLM-5.2 研究页](https://www.zhipuai.cn/zh/research/161)）：

| 入口 | 官方写法 | URL |
|------|----------|-----|
| 国内 | 智谱清言 App/网页版 | [chatglm.cn](https://chatglm.cn) |
| 国际 | Z.ai | [chat.z.ai](https://chat.z.ai) |

客户端（只写官方写过的）：

| 客户端 | 依据 |
|--------|------|
| 网页 | [chatglm.cn](https://chatglm.cn)、[chat.z.ai](https://chat.z.ai) |
| 官方 App | [chatglm.cn/download](https://chatglm.cn/download)；App Store [智谱清言](https://apps.apple.com/cn/app/id6450893458) |
| 浏览器插件 | Chrome Web Store「智谱清言：ChatGLM & AutoGLM」 |

这些页面上**没有**「把清言装成仓库 CLI」的官方步骤。对话里写代码仍是聊天，不是 checkout Agent。

## 智谱清言：打开就能聊

1. 打开 [chatglm.cn](https://chatglm.cn)。
2. 登录。付费协议把服务范围写成 **chatglm.cn 网站、智谱清言 App**（[付费服务协议](https://chatglm.cn/pay/policy/vipservice) §1.5）。
3. 在输入框发问题。页脚要求你读 [用户协议](https://chatglm.cn/agreement) 与 [隐私政策](https://chatglm.cn/privacypolicy)。

2026-08-19 首页可见的入口芯片：

| 芯片 | 只说明「官方把这件事放在首页」 |
|------|--------------------------------|
| **Agent** | 首页定位就是「能帮你把事办成的 Agent」 |
| **研究报告** | 官方首页入口 |
| **PPT制作** | 官方首页入口 |
| **数据分析** | 官方首页入口 |
| **GLM-5.2 / GLM-5.2快速** | 页面上的模型名；以你账号里实际能选的为准 |

下载页补充的能力（[chatglm.cn/download](https://chatglm.cn/download)）：对话、写作、编程、理解图片与文档；「可以对话聊天、也可以调用工具执行复杂任务」。

付费协议列出的权益**种类**（§1.6、§4.1，不是额度数字）：

- 各模型相关权益
- 各类型 Agent 权益
- 清影生视频
- 视频通话
- 更大的云知识库空间
- 更多 AI 画图功能

**具体次数、积分、是否仍叫 VIP/SVIP，以登录后的会员权益页为准。** 协议允许智谱改权益和价格，并要求你看服务页最新展示。

App Store 官方介绍还按场景写了通用问答、写作、学习、职场、编程、虚拟对话等。那是商店文案，用来理解产品面，不要当成命令清单。

### 浏览器插件

官方插件名：**智谱清言：ChatGLM & AutoGLM**（Chrome Web Store，开发者标识 zhipuextension）。商店原文能力：通用问答侧边栏、页面总结、页面对话、划线解释/总结/翻译、写作助手、勾选总结、站内高级检索。插件政策见 [chatglm.cn/advanced-authpolicy](https://chatglm.cn/advanced-authpolicy)。

## Z.ai：国际对话面

1. 打开 [chat.z.ai](https://chat.z.ai) 或顶栏带 **Chat** 的 [z.ai](https://z.ai)。
2. 按页面登录。Z.ai 顶栏同时有 **Chat / API / Coding Plan / Contact / Docs**（[z.ai/company](https://z.ai/company)）。**Chat** 才是本页；**Coding Plan** 和 **Docs** 不是清言教程。

官方对自己的定义（页面 description）：

> Meet Z.ai, the AI assistant powered by GLM-5.2. Build websites, write code, handle long-horizon tasks, and get instant answers.

2026-08-19 页面可见芯片：**Magic Design**、**Full-Stack**、**Write Code**。

官方 blog 对聊天面的补充（只抄原文能撑住的）：

- [glm-4.5](https://z.ai/blog/glm-4.5)：在 Z.ai 选模型即可聊；支持 artifacts、presentation slide、full-stack development。
- [glm-5.2](https://z.ai/blog/glm-5.2)：「Chat with GLM-5.2 on Z.ai」。同一篇把 Coding Plan / ZCode 写成另一条路径。

Z.ai 的法律文本在 [Terms of Use](https://docs.z.ai/legal-agreement/terms-of-use)（签约方 JINGSHENG HENGXING TECHNOLOGY PTE.LTD）。那份条款主要覆盖平台 / API 使用，**不要**用它反推清言国内会员规则。

## 账号与付费（只写协议原文）

清言付费协议（生效 2026-05-21）里，前端工程师最容易踩的几条：

| 规则 | 原文要点 |
|------|----------|
| 权益跟账号走 | 多个清言账号时，权益只进**购买时登录的那个**。账号之间充值 / 会员**不能**转移、迁徙、转让、分享（§3.1、§3.2.2） |
| 和开放平台不是同一份 | 清言会员与智谱其它产品（「包括但不限于智谱 AI 开放平台」）付费**独立不冲突**，重合权益可叠加，**不会**因此退款（§4.4） |
| 价格看页面 | 收费标准、优惠、付款方式会改；以服务页公示为准（§4.7） |
| 默认不退 | 付费服务不能退货退款、换货、兑现金；重复扣款或官方技术故障导致无法履约，走客服申诉（§4.5、§4.8.1） |
| 设备会不一样 | 软件版本、设备、操作系统不同，实际能用的服务可能有差别（§4.6） |

App Store 列出过内购档位（连续包月、月卡、清影智能体等）。**档位和价格会变**，不要把某一天的截图当价目表。查 [App Store 产品页](https://apps.apple.com/cn/app/id6450893458) 或清言会员页。

**不要假设** 清言会员 = Z.ai 登录 = Coding Plan 额度。官方没有这样写。

## 旁边那些面（别混）

| 产品面 | 是什么 | 去哪 |
|--------|--------|------|
| **智谱清言 / Z.ai 对话** | 本页 | chatglm.cn / chat.z.ai |
| **GLM Coding Plan** | 给编码工具的订阅 | [z.ai/subscribe](https://z.ai/subscribe) — 本目录不写安装 |
| **ZCode** | 官方代码工具 | [zcode.z.ai/cn](https://zcode.z.ai/cn) |
| **AutoGLM / AutoClaw** | 报告助手 / 本地客户端 | [autoglm.zhipuai.cn](https://autoglm.zhipuai.cn) |
| **API** | 模型 HTTP 接口 | [docs.z.ai](https://docs.z.ai)、[docs.bigmodel.cn](https://docs.bigmodel.cn) |

## 常见陷阱

- 打开 [z.ai/subscribe](https://z.ai/subscribe) 或 [bigmodel.cn/glm-coding](https://bigmodel.cn/glm-coding)，却以为在配置清言网页。
- 用 A 账号买会员、用 B 账号登录网页，然后以为「丢了订阅」。协议写明权益不搬家。
- 把开放平台 / Coding Plan 余额当成清言次数。协议写明两套付费独立。
- 把对话里生成的 HTML / 脚本当成已经改好了你的 Git 仓库。
- 把三方博客的「每日 50 次 / 某月 ¥xx」写进自己的笔记当官方规格。

## 官方文档

| 页面 | 用来干什么 |
|------|------------|
| [chatglm.cn](https://chatglm.cn) | 清言产品 |
| [chatglm.cn/download](https://chatglm.cn/download) | App / 客户端入口 |
| [付费服务协议](https://chatglm.cn/pay/policy/vipservice) | 会员、积分、账号边界 |
| [chat.z.ai](https://chat.z.ai) | Z.ai 对话 |
| [z.ai](https://z.ai) | 国际站顶栏（Chat / API / Coding Plan） |
| [zhipuai.cn/zh](https://www.zhipuai.cn/zh) | 厂商一级产品 |
| [GLM-5.2 研究页](https://www.zhipuai.cn/zh/research/161) | 官方「在线体验」两个 URL |
| [docs.z.ai](https://docs.z.ai) | API，不是清言 How-to |

## 相关页面

- [学习地图](./index.md)
- [速查表](./zhipu-chat-cheatsheet.md)
- [术语表](./zhipu-chat-glossary.md)
