---
title: 通义灵码实战 Cookbook
description: "已经装好通义灵码 / Qoder CN 之后：怎么选会话模式、怎么写需求、怎么让智能体跑终端、怎么接 MCP。"
domain: product
tags:
  - coding-agent
role: cookbook
---

# 通义灵码实战 Cookbook

面向「已经登录、能补全」的读者。每个配方解决一个具体问题。安装回 [教程](./lingma)；查键位回 [Cheatsheet](./lingma-cheatsheet)。

## 选对会话模式

目标：少付「选错形态」的税。

| 你要做的事 | 用哪个模式 | 官方依据 |
|------------|------------|----------|
| 解释这段 React 组件、对比两种写法 | **智能问答** | 「不会直接对工程文件进行修改」 |
| 只改点名的几个文件，自己看 diff | **文件编辑** | 「精确编辑……不会做出超出开发者预期的修改」；比智能体更快 |
| 加一个完整功能：改文件 + 装依赖 + 跑测试 | **智能体** | 可拆任务、用终端、接 MCP |
| 在 Lingma IDE / JetBrains 里做多文件修改 | **智能体**（不要找文件编辑） | 官方：这两端不支持文件编辑 |
| 在 Visual Studio 里 | **智能问答** | 官方：VS 暂仅问答 |

判断口诀：你能不能一眼看出它改错了。能 → 智能体；不能 → 退回问答，先要方案。

来源：[智能会话概览](https://help.aliyun.com/zh/lingma/overview-of-chat)、[文件编辑](https://help.aliyun.com/zh/lingma/edit)、[智能体](https://help.aliyun.com/zh/lingma/agent)。

## 把需求写成官方建议的结构

目标：少靠「再问一遍」补上下文。

官方原文（[智能会话概览](https://help.aliyun.com/zh/lingma/overview-of-chat)）：

> 结构化地描述需求：首先需要澄清我们需要通义灵码帮我们做什么，建议包含一个明确的目标，并通过步骤式的结构化描述，详细地描述您期望完成的编码任务和要求。
>
> 给出相关的上下文：可以选择代码文件、图片、codebase、codeChanges 等上下文。
>
> 明确生成要求：告诉通义灵码您期望它遵循的要求，比如语言、规范、格式、变更目标等，如“生成变更时，同时为每个方法生成英文注释”。
>
> 多多互动，逐步迭代。

可直接改的模板（结构来自上面四条，内容换成你的仓库）：

```text
目标：在 src/components/UserTable.tsx 给表格加上按 lastActiveAt 排序。

步骤：
1. 只改现有组件，不新建页面
2. 默认降序，点击表头切换
3. 补上 TypeScript 类型，不要 any

要求：
- 生成变更时，同时为每个方法生成英文注释
- 不要改 API 层
```

再在输入框里显式加上相关文件 / 图片 / codebase。Lingma IDE 的上下文**暂不支持知识库**（同一页官方说明）。

智能体还提供「优化输入」：先打草稿，再点优化按钮，让它结合已加上下文扩写成可执行提示（[智能体](https://help.aliyun.com/zh/lingma/agent)）。扩完仍要自己看一眼再提交。

## 让智能体跑一个有副作用的任务

目标：端到端改代码，但终端命令仍在你手里。

1. 切到 **智能体**。
2. 写清目标和边界（见上一节）。
3. 复杂任务可等它出规划，或主动发 `/plan`（官方：智能体会对复杂任务自动生成方案；也可用 `/plan` 触发）。
4. 终端命令弹出时，看懂再点 **运行**；看不懂点 **取消**。
5. 在 diff 里按文件接受或拒绝。

官方还允许把常用命令加入自动执行白名单（[智能体](https://help.aliyun.com/zh/lingma/agent)）：

> 具体配置路径为插件 **Chat** 设置页面的 **Auto-Run** 区域，在 **Terminal in Agent Mode** 下方的输入框中添加允许自动运行的命令。如需添加多个命令，可以使用英文逗号分隔。

第一周不要把 `rm`、`git push`、`npm publish` 放进白名单。

VS Code 里终端唤不起来时，先对 [终端执行异常说明](https://help.aliyun.com/zh/lingma/description-of-terminal-execution-exception)：官方写明 VS Code 插件依赖 Shell 集成 API，需要 **VS Code > 1.93**，且默认终端是受支持的 shell。这和「插件安装要求 1.68.0」不是同一条门槛。

## 给智能体接 MCP

目标：让智能体调用外部工具（设计稿、文档、数据库 schemas）。

官方能力边界（[MCP](https://help.aliyun.com/zh/lingma/guide-for-using-mcp)）：

> MCP（Model Context Protocol）是一种开放标准协议，使其智能体的能力和场景得到拓展。
>
> 热门 MCP 市场： [魔搭社区 MCP 市场](https://www.modelscope.cn/mcp) 、 [Higress MCP 市场](https://mcp.higress.ai/) 。
>
> 热门场景：数据库 schemas / DAO；在线文档；根据设计稿生成前端代码。

在 IntelliJ 里进入 MCP 页的官方步骤（[MasterGo 示例](https://help.aliyun.com/zh/lingma/use-lingma-mastergo-mcp-to-transforming-mastergo-design-draft-into-front-end-code)，侧栏图标在旧文档里仍写「通义灵码」）：

1. 单击 IDE 侧边栏图标进入 **智能会话**。
2. 进入 **MCP 服务** 页：欢迎语里的 **MCP 工具** 链接，或右上角头像 → **个人设置** → **MCP 服务**。
3. 切到 **智能体** 模式，再写提示词。
4. 智能体要调 MCP 时会先询问；点执行后，返回结果进入后续上下文。

不要把 Marketplace 评测里的第三方 JSON 当成官方配置格式。配置项以 [MCP 指南](https://help.aliyun.com/zh/lingma/guide-for-using-mcp) 打开的页为准。

## 打开行间建议预测（NES）

目标：改完一处之后，让它预测下一处修改。

官方定义（[行间建议预测](https://help.aliyun.com/zh/lingma/next-edit-suggestion)）：基于当前完整代码上下文，结合代码修改和光标位置动态预测变更；**Tab** 接受，**Esc** 拒绝。

开启入口同一页写：用快捷键 `⌘ ⇧ ,`（macOS）或 `Ctrl Shift ,`（Windows）打开个人设置，开启 **行间建议预测（NES）**。并写明：**Qoder CN IDE 仅支持 Auto 模式**。

帮助中心更新日志里，IDE 侧 NES 曾升级为 **NEXT**。若设置页已改名，以你装的客户端设置为准，不要混用旧教程截图。

## 常见坑

| 症状 | 先查什么 | 来源 |
|------|----------|------|
| 插件市场搜「通义灵码」找不到 / 搜「Qoder CN」找不到 | 营销站和帮助中心用的展示名不同，按你打开的那一页原文搜 | [下载页](https://lingma.aliyun.com/download)、[安装指南](https://help.aliyun.com/zh/lingma/installation-guide) |
| VS Code 侧栏没有入口 | 侧栏右键，勾选 Qoder CN | [安装指南](https://help.aliyun.com/zh/lingma/installation-guide) |
| JetBrains / Lingma IDE 找不到「文件编辑」 | 这两端官方不支持该模式，用智能体 | [智能会话概览](https://help.aliyun.com/zh/lingma/overview-of-chat) |
| VS Code 智能体跑不了终端 | VS Code > 1.93 + 受支持的 shell 集成 | [终端异常](https://help.aliyun.com/zh/lingma/description-of-terminal-execution-exception) |
| 还在用旧 Lingma IDE，功能对不上 | 官方升级路径：卸载原 Lingma IDE，改装 Qoder CN IDE | [计费说明](https://help.aliyun.com/zh/lingma/billing-description) |
| 把它当成通义千问来聊天 | 走错产品。千问是对话助手，见[学习地图](./) | [qianwen.com](https://www.qianwen.com/) |
