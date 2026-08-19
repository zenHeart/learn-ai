---
title: MiniMax Agent 速查表
description: "只查不学。入口、模式、撞名和数据源。没有官方 Commands 页，就不编命令表。"
domain: product
tags:
  - coding-agent
role: cheatsheet
---

# MiniMax Agent 速查表

只查不学。覆盖 2026-08-19 打开的官方页。命令、flag、积分日签若只出现在 Code changelog，不抄进本表。

## 入口

| 用途 | URL |
|------|-----|
| 国内工作台 | https://agent.minimaxi.com/ |
| 海外工作台 | https://agent.minimax.io/ |
| 技能市场 | https://agent.minimaxi.com/skills |
| 文档索引 | https://agent.minimaxi.com/docs/llms.txt |
| Changelog | https://agent.minimaxi.com/docs/changelog |
| 下载桌面端（当前品牌 Code） | https://agent.minimaxi.com/download |
| 厂商站 | https://www.minimaxi.com/ |
| 海外厂商站 | https://www.minimax.io/ |

## 模式

来源：[M2 新闻](https://www.minimaxi.com/news/minimax-m2)

| 模式 | 官方原文 | 选它当 |
|------|----------|--------|
| Lightning 高效模式 | 对话问答 / 轻量级搜索 / 轻量级代码，极速输出 | 短任务 |
| Pro 专业模式 | 复杂长程任务；深度研究 / 全栈开发 / PPT / 报告 / 网页 | 要交付物的长任务 |

## 决策：Agent 还是别的门

| 场景 | 选 |
|------|----|
| 网页里做完研究 / PPT / 报告 / 站点 | Agent |
| 本机仓库 + 终端 | Code |
| 只出视频 | Hailuo |
| 只出语音 / 音乐 | Audio |
| 角色社区 | 星野 / Talkie |
| 创作画布 | Design（Hub 为英文 About / 旧域名） |
| 自己的程序调模型 | 开放平台 |

术语索引（一句话，详见 [术语表](./minimax-agent-glossary.md)）：

| 术语 | 钩子 |
|------|------|
| MiniMax Agent | 通用网页工作台 |
| MiniMax Code | 桌面端，不是本页主教程 |
| Hub / Design | 创作产品；两份官方名打架，以落地页为准 |
| Mini-Agent | GitHub 示例，不是产品 |
| Lightning / Pro | 两种官方模式 |
| Agent Team | Leader / Worker / Verifier |
| MaxHermes / MaxClaw | Agent 站内入口，不是一级产品 |
| Token Plan | 计费，不是产品 |

## 计费（并列原文，不合并）

| 声明 | 出处 |
|------|------|
| 限时免费，直到服务器撑不住 | [M2 新闻](https://www.minimaxi.com/news/minimax-m2) |
| 统一计费，打通 Token Plan | [技能市场](https://agent.minimaxi.com/skills) |
| Plus ¥49 / Max ¥119 / Ultra ¥469 | [下载页](https://agent.minimaxi.com/download)（页面标题是 MiniMax Code） |

以登录后的套餐页为准。

## 常见错误

| 症状 | 原因 | 处理 |
|------|------|------|
| 在本教程里找 `minimax` CLI / 工作区 | 那是 Code | 打开 [Code 欢迎页](https://agent.minimaxi.com/docs/code/welcome) |
| 短问答又慢又贵 | 开了 Pro / Team | 改 Lightning |
| 长报告做到一半停 | 单 Agent 提前汇报 | 写验收条件，或开 Team |
| 把 Hub 教程和 Agent 写在一起 | 英文 About 仍写 Hub | Hub 当前是 Design |
| 引用转载站数字 | 无官方原文 | 删掉或标待核实 |

## 高质量信息源

最后核实：2026-08-19。只收录亲自打开的页面。

### 一手官方

| 来源 | 用途 |
|------|------|
| [agent.minimaxi.com](https://agent.minimaxi.com/) | 国内产品入口 |
| [agent.minimax.io](https://agent.minimax.io/) | 海外产品入口 |
| [skills](https://agent.minimaxi.com/skills) | 技能市场 |
| [features/zh.html](https://agent.minimax.io/features/zh.html) | 消费向功能说明 |
| [faq/en.html](https://agent.minimax.io/faq/en.html) | 海外 FAQ（偏生活向，不是工程参考） |
| [changelog](https://agent.minimaxi.com/docs/changelog) | 更新记录；后期主体是 Code |
| [llms.txt](https://agent.minimaxi.com/docs/llms.txt) | 文档树索引 |
| [Agent Team](https://agent.minimaxi.com/docs/techblog/agent-team.md) | Team 设计与何时使用 |
| [靠谱](https://www.minimaxi.com/news/minimax-agent) | 产品定位（2025-06-19） |
| [M2 & Agent](https://www.minimaxi.com/news/minimax-m2) | Lightning / Pro、限时免费原文 |
| [Code 欢迎页](https://agent.minimaxi.com/docs/code/welcome) | 用来划清边界，不是本目录教程 |
| [design.minimaxi.com](https://design.minimaxi.com/) | Design 当前落地页 |
| [hub.minimaxi.com](https://hub.minimaxi.com/) | 打开后加载 Design |
| [hailuoai.com](https://hailuoai.com/) | Hailuo |
| [minimaxi.com/audio](https://www.minimaxi.com/audio) | Audio |
| [xingyeai.com](https://www.xingyeai.com/) | 星野 |
| [talkie-ai.com](https://www.talkie-ai.com/) | Talkie |
| [platform.minimaxi.com](https://platform.minimaxi.com/) | 开放平台 |

### 待核实

| 名称 | URL | 为什么怀疑 |
|------|-----|------------|
| Agent 网页是否仍免费 | 套餐页（需登录） | M2 新闻的限时免费和 Token Plan 打通同时存在 |
| 插件市场是否已进网页 Agent | changelog / 首页弹层 | 公告写的是 MiniMax Code |

**访问提示**（2026-08-19）：部分抓取器访问 `minimaxi.com` / `agent.minimaxi.com` 会落到 198.18 代理或被拦截。用浏览器或页面阅读器。`docs/llms.txt` 可读。

## 相关页面

- [学习地图](./index.md)
- [教程](./minimax-agent.md)
- [Cookbook](./minimax-agent-cookbook.md)
- [术语表](./minimax-agent-glossary.md)
