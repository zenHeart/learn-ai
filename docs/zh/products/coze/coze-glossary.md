---
title: 扣子 / Coze 术语表
description: "对齐扣子、扣子编程、智能体、工作流、技能、插件、Studio、罗盘。写清不是什么，避免和豆包、Trae、官方 Claude Code 撞名。"
domain: product
tags:
  - agent-builder
role: glossary
---

# 扣子 / Coze 术语表

解释「是什么 / 不是什么」。操作在 [教程](./coze.md) 和 [Cookbook](./coze-cookbook.md)。参数在 [速查表](./coze-cheatsheet.md)。

## 概念关系图

```
                    字节跳动 AI
          ┌────────────┼────────────┐
        豆包 #79      扣子家族        Trae #80
                         │            火山方舟 #82
        ┌────────────────┼────────────────┐
        │                │                │
     扣子工作台        扣子编程          扣子罗盘
   (coze.cn)        (code.coze.cn)     Prompt/评测/Trace
        │                │                │
   扣子/云端/本地      低代码 | AI编程      商业版
     Agent            智能体/工作流      Coze Loop 开源核
                         │
                    Coze Studio 开源核
```

订阅套餐是一层：个人 / 团队 / 企业决定积分和协作。搭建面在扣子编程。消费面在扣子。评测面在罗盘。

---

## 扣子

**是什么**：官方定义是「面向 Agent 时代的新一代 AI 团队协作平台」（[what_is_coze](https://docs.coze.cn/what_is_coze)）。网页、macOS / Windows 桌面、移动端同步。

**不是什么**：不是低代码画布，不是豆包，不是 Trae。对话里的 AI 编程只封装了网页 / App / 小程序 / 导入项目。

**为什么单独存在**：人和多个 Agent 要共享项目、文件、日程、邮箱、云设备。这和「发布一个客服 Bot」不是同一件事。

---

## 扣子编程

**是什么**：AI 驱动的应用开发平台，产出智能体、工作流、技能、网页、App、小程序（[guides_welcome](https://docs.coze.cn/guides_welcome)）。入口 `code.coze.cn`。

**不是什么**：不是 Trae，不能私有化（用 Studio）。低代码项目是它「较为早期的版本」，但低代码智能体今天仍从这里进。

---

## 低代码智能体

**是什么**：对话式 AI 项目。用户说话，模型按人设调用插件 / 工作流 / 知识库再回复。旧文档称 **Bot**。

**不是什么**：不是全代码 AI 编程项目，也不是扣子工作台上用模板创建的「扣子 Agent」。

**典型场景**：客服、虚拟伴侣、个人助理、外教（[about-low-code-project](https://docs.coze.cn/about-low-code-project)）。

---

## 全代码智能体

**是什么**：在扣子编程首页「智能体」选项卡里，用自然语言生成的可部署项目（[guides_vibe_coding_agent](https://docs.coze.cn/guides_vibe_coding_agent)）。

**不是什么**：不是拖拽编排页。部署形态偏 API 服务，和低代码「发到微信客服」不是同一条发布表。

---

## 工作流 / 对话流

**是什么**：节点编排的可执行指令。工作流面向功能与数据；对话流面向 Chatbot（[guides_workflow](https://docs.coze.cn/guides_workflow)）。

**不是什么**：不是技能（技能不锁死路径）。不是插件（插件只是其中一个节点类型）。

---

## 插件

**是什么**：一组同域名 API 工具，用来扩模型边界（[guides_plugin](https://docs.coze.cn/guides_plugin)）。

**不是什么**：不是技能。技能还带「何时、如何用」的说明书。

---

## 技能 Skill

**是什么**：`SKILL.md` + 可选 scripts / references / assets。智能体按需、渐进式加载（[guides_skill_overview](https://docs.coze.cn/guides_skill_overview)）。

**不是什么**：不是全程生效的系统提示词，不是固定工作流，不是 MCP 本身。

---

## 知识库

**是什么**：开发者维护的静态检索库，用来补事实、压幻觉。分扣子知识库和火山知识库。

**不是什么**：不是记忆。记忆是用户侧动态数据，不能跨智能体。

---

## 扣子 Agent / 云端 Agent / 本地 Agent

消费端（扣子）的三种运行位置（[cozespace_agent_overview](https://docs.coze.cn/cozespace_agent_overview)）：

| 类型 | 跑在哪 | 适合 |
|------|--------|------|
| 扣子 Agent | 扣子原生工作台 | 办公、创作、行业模板 |
| 云端 Agent | 扣子云电脑 | 不想自己养环境的 Claude Code / Codex / OpenClaw / Hermes 框架 |
| 本地 Agent | 你的电脑 | 要碰本机文件和工具链 |

云端框架**不是** Anthropic / OpenAI 官方应用，不能登录对方账号，模型由扣子提供。

---

## Coze CLI

**是什么**：npm 包 `@coze/cli`，可执行文件 `coze`。把扣子编程的创建 / 开发 / 部署变成命令，给人和 Agent 用。

**不是什么**：不是 Trae 的一部分，也不是扣子桌面端。Trae 只是官方举例的一个 Skill 安装目标。

---

## 扣子罗盘

**是什么**：面向开发者的 Agent 开发运维平台：Prompt、评测、Trace（[cozeloop_what-is-cozeloop](https://docs.coze.cn/cozeloop_what-is-cozeloop)）。套餐逻辑与扣子编程相同。

**不是什么**：不是搭建画布。开源对应物是 Coze Loop，商业版指标和企业治理更多。

---

## Coze Studio

**是什么**：开源「一站式 AI agent development tool」，Apache-2.0。官方 README：可视化创建、调试、部署智能体 / 应用 / 工作流。

**不是什么**：不是扣子编程商业版。Studio 是单机核，不含工作空间、企业组织、多人协作（[guides_FAQ](https://docs.coze.cn/guides_FAQ)）。

---

## Coze Pro / 企业版

**是什么**：火山引擎产品页 [coze-pro](https://www.volcengine.com/product/coze-pro) 与文档里的企业套餐（标准 / 旗舰）。混合计费：包年包月 + 按量。

**不是什么**：不是一个和扣子编程并列的第三套画布。权益、SSO、VPC 以 [guides_edition](https://docs.coze.cn/guides_edition) 为准。

---

## 豆包 / Trae / 火山方舟

**是什么**：同厂其它 AI 产品。豆包是聊天。Trae 是 IDE。方舟是模型 API。

**不是什么**：不是本目录该展开的搭建教程。低代码智能体曾经能发到豆包渠道，该入口已下线。不要把「在人设里选了豆包模型」说成「这就是豆包产品」。

---

## 已下线或改名

| 说法 | 现状 |
|------|------|
| Bot | 现称低代码智能体 |
| 发布到豆包 | 2026-07-01 下线入口 |
| 抖音分身 | 2025-09-03 下架 |
| 工作流 / 图像流商店 | 已下架 |
| 扣子编程私有化 | 官方：暂不支持，改 Studio |
| 商店里复制别人完整配置 | 商店为私有配置；抄结构用模板商店 |
