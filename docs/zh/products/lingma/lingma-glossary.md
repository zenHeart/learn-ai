---
title: 通义灵码术语表
description: "解释通义灵码为什么改名 Qoder CN、IDE 和插件不是一回事、三种会话模式差在哪。不教安装，不列价格。"
domain: product
tags:
  - coding-agent
role: glossary
---

# 通义灵码术语表

不教操作，只解释「是什么 / 不是什么」。上手回 [教程](./lingma)，选型回 [学习地图](./)。

## 通义灵码 / Qoder CN

**是什么：** 阿里云的智能编码助手。营销首页原文：「通义灵码是由阿里云提供的智能编码辅助工具，提供代码智能生成、智能问答、多文件修改、编程智能体等能力。」帮助中心把同一编码子产品定义为 Qoder CN 系列里「面向软件开发场景的核心子产品（原“通义灵码”）」。

**为什么改名：** 官方说明写于 2026-05-20。系列覆盖编码、办公、终端、数字员工、云端 Agent。公共云「通义灵码」升级为 Qoder CN 之后，编码桌面应用现名 **Qoder CN IDE**，并继续提供 JetBrains 插件。

**在生态中的角色：** 对位 Copilot / Cursor 这种「进编辑器干活」的产品，不是对位 ChatGPT 网页。

官方文档：[什么是 Qoder CN](https://help.aliyun.com/zh/lingma/what-is-qoder-cn)、[什么是 Qoder CN 系列](https://help.aliyun.com/zh/lingma/introduction-of-lingma)。

## Qoder CN IDE / Lingma IDE

**是什么：** 独立桌面 IDE，全面集成编码助手，**无需再装插件**。营销站下载页仍写 **Lingma IDE**；帮助中心和新品牌站写 **Qoder CN IDE**。

**为什么需要：** 官方把迭代重心放到这套 IDE（以及 JetBrains 插件）。VS Code 插件更新放缓或已停止维护时，这是官方建议的替代入口。

**与插件的区别：** 插件寄生在你已有的编辑器里；IDE 是另一个客户端。计费页写过升级路径：卸载原 Lingma IDE，再安装 Qoder CN IDE。

## IDE 插件

**是什么：** 装进 JetBrains IDEs、Visual Studio Code、Visual Studio 的扩展。市场 / 包名长期残留 `TONGYI Lingma`、`tongyi-lingma`。

**不是什么：** 不是 Qoder CN CLI，也不是 QoderWork 桌面办公助手。

**VS Code 的特殊地位：** 帮助中心仍教安装，同时宣布更新放缓；计费页写「停止演进」；docs.qoder.cn 写「已停止维护」；国际站更新日志写 discontinued。三份官方页不完全一致，正文按「可装、但不是现行主入口」处理。

## 智能问答 / 文件编辑 / 智能体

三种是**同一会话窗口里的模式**，不是三个产品。

| 模式 | 是什么 | 为什么单独存在 |
|------|--------|----------------|
| 智能问答 Ask | 只给方案，不改仓库 | 先搞懂，避免误改 |
| 文件编辑 Edit | 在你给的上下文里改多文件，强调精确、更快 | 你已经知道改哪 |
| 智能体 Agent | 自己拆任务、感知工程、用工具和终端 | 你只给目标 |

官方强调一次会话里可切换，不必新建会话。文件编辑在 Lingma IDE / JetBrains 上不存在；Visual Studio 暂仅问答。详细操作见 [Cookbook](./lingma-cookbook)。

## NES（行间建议预测）

**是什么：** Next Edit Suggestion。根据完整代码上下文、已做修改和光标位置，预测**下一处**变更。

**不是什么：** 不是普通的行间续写。续写补「下一行」；NES 预测「下一处要改的点」。帮助中心更新日志里，IDE 侧 NES 曾升级为 **NEXT**。

官方文档：[行间建议预测](https://help.aliyun.com/zh/lingma/next-edit-suggestion)。

## 工程自动感知 / 记忆感知

**工程自动感知：** 按任务描述感知框架、技术栈、相关文件、报错，不必手动把整个仓库贴进对话框。

**记忆感知：** 对话过程中积累针对个人、工程、问题的记忆，并自动整理。官方单独成页：[记忆](https://help.aliyun.com/zh/lingma/memory)。

这两项解释的是「为什么打开相关文件、连续对话会越来越准」，不是「模型已经训练了你的私有仓库」。本站不写模型内部机制，见 [Learn LLM](/zh/tech/fundamentals/LLM)。

## Quest / RepoWiki / Subagent / 专家团

帮助中心在「什么是 Qoder CN」里把它们列为 IDE 侧升级能力：

- **Quest 2.0**：复杂研发任务自动拆成可执行步骤。
- **RepoWiki**：工程级知识库。
- **Subagent**：子智能体。
- **专家团**：面向前后端、数据库、运维、测试等的专家智能体。

官方写：RepoWiki、Quest、Subagent 等核心能力按量抵扣 Credits、不限次数。本目录不把它们拆成独立教程——密度在产品介绍页，操作细节以 [docs.qoder.cn](https://docs.qoder.cn/) 为准。

## Credits

**是什么：** 2026-05-20 起订阅席位引入的用量单位。超额可买资源包。全家桶个人版 Credits 可跨 IDE / JetBrains / QoderWork / CLI 等共享（完成账号升级后）。

**不是什么：** 不是「免费就永远无限」。个人体验版官方写的是有限体验额度和 2 周试用。具体数字只看 [计费说明](https://help.aliyun.com/zh/lingma/billing-description)，不要背旧博客。

## 不是什么

| 名字 | 实际是 | 本站 |
|------|--------|------|
| **通义千问** | 通用 AI 助手（[qianwen.com](https://www.qianwen.com/)） | 家族图一行，#83 |
| **百炼** | 大模型服务 / Agent 开发平台 | 家族图一行，#85 |
| **Qoder CN CLI** | 终端子产品 | 家族图一行 |
| **QoderWork CN** | 办公桌面助手 | 家族图一行 |
| **QoderWake CN** | 数字员工 | 家族图一行 |
| **Cloud Agents** | 云端托管 Agent 平台 | 家族图一行 |
| **淘宝 / ECS / 支付** | 非 AI 产品 | 非本站 |
| 「通义灵码 = 通义千问的 IDE 皮肤」 | 错误说法 | 两个产品 |
| 「只有 VS Code 插件」 | 错误说法 | 官方主推 IDE + JetBrains |

## 已退役或已改名

| 旧说法 | 现状 |
|--------|------|
| 智能编码助手通义灵码（Lingma） | 2026-05-20 起系列名 Qoder CN |
| Lingma IDE | 现名 Qoder CN IDE；旧安装包需按官方路径卸载再装 |
| TONGYI Lingma 插件展示名 | 帮助中心改为 Qoder CN；市场 ID 仍是 `Alibaba-Cloud.tongyi-lingma` |
| 个人专业版限时免费 | 2026-05-20 18:00 结束，限免用户转个人社区 / 体验档 |

选哪个入口，看 [学习地图](./) 的决策树。
