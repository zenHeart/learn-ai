---
title: MiniMax Code 实战 Cookbook
description: 只收官方步骤能覆盖的配方：Agent Team、自备 Key、headless、ACP、签到积分。
domain: product
tags:
  - coding-agent
role: cookbook
---

# MiniMax Code 实战 Cookbook

跳着读。安装和第一次对话在 [教程](./minimax-code.md)。这里只写「我要解决 X」。

## 1. 让 Agent Team 拆复杂任务

来源：[Agent Team](https://agent.minimaxi.com/docs/code/agents/team)。

官方：「Agent Team 会根据任务复杂度引入多个专家 Agent 协作。你仍然只需要描述目标，MiniMax Code 会负责拆解任务、分配执行、跟踪进度和汇总结果。」

适合：

- 同时涉及代码、设计、文档、测试
- 需要长时间运行并持续跟进
- 需要分工执行和结果校验
- 需要多个方向并行探索

写法：给出清晰目标、验收标准和限制条件。进行中可以继续补充信息；官方写 Agent Team 会把新要求纳入后续执行。

M3 博文补充过 Producer + Verifier 对抗循环和「可连续跑数天」的产品声明（[minimax-m3](https://www.minimax.io/blog/minimax-m3)）。具体排队策略、并发上限以产品内和 [team](https://agent.minimaxi.com/docs/code/agents/team) 为准，不要把博文修辞抄成操作保证。

简单单文件修改不必开 Team。

## 2. 在 MiniMax Code 里用自己的 MiniMax API Key

来源：[MiniMax API Key](https://agent.minimaxi.com/docs/code/account/minimax-api)。

1. 进入用量与模型相关设置。
2. 选择 MiniMax API，输入 API Key 并保存。
3. 使用连接测试确认 Key 可用。

官方 Warning：「不要把 API Key 写进对话正文、代码仓库或公开文档。请只通过产品内的安全配置入口保存。」

CLI 侧用 `mcode provider`，或 `mcode provider --help` 看命令行配置（[CLI FAQ](https://agent.minimaxi.com/docs/cli/faq)）。

自定义供应商（Base URL、API Format、模型名）走 [BYOK](https://agent.minimaxi.com/docs/code/account/byok)，不要和 MiniMax 官方 Key 混成同一步。

## 3. 用 CLI 跑一次 Headless 任务

来源：[功能介绍](https://agent.minimaxi.com/docs/cli/features)。

`mcode exec` 不启动 TUI。

```bash
mcode exec "修复失败的测试"

mcode exec \
  --cwd ./repo \
  --file error.log \
  --output-format json \
  "分析错误日志，修复问题并运行相关测试"
```

官方参数：

| 参数 | 用途 |
|------|------|
| `--cwd` | 指定工作区目录 |
| `--file` | 添加附件，可重复 |
| `--model` | 仅本次指定模型 |
| `--session` / `--continue` | 在已有 Session 中跑 |
| `--permission` | `ask`、`smart`、`full` 或 `off` |
| `--timeout` | 如 `30s`、`2m` |
| `--max-steps` | 限制 Assistant 步数 |
| `--output-format` | `text`、`json` 或 `stream-json` |
| `--output-schema` | 用 JSON Schema 校验最终 JSON |

机器输出写 `stdout`，诊断写 `stderr`。只有显式 `--input -` 时才读标准输入，避免 CI 空等。

## 4. 把 `mcode` 接到 Zed（ACP）

来源：[功能介绍](https://agent.minimaxi.com/docs/cli/features)。

`mcode acp` 作为 ACP v1 Agent server，经 `stdin/stdout` 传 NDJSON。官方说不需要额外 HTTP 服务，也不要求编辑器安装 MCode 专用插件。

Zed External Agents 示例（官方原文）：

```json
{
  "agent_servers": {
    "minimax-code": {
      "type": "custom",
      "command": "mcode",
      "args": ["acp"],
      "env": {}
    }
  }
}
```

编辑器找不到命令时，把 `command` 改成 `mcode` 的绝对路径。官方约束：`mcode acp` 的 `stdout` 只用于协议消息，不要直接往里打自然语言，也不要让包装脚本把日志写进 `stdout`。

其它 ACP 宿主没有官方逐步截图时，不要编「官方 VS Code 插件」。

## 5. 看用量和签到积分

来源：[Token Plan 与积分](https://agent.minimaxi.com/docs/code/account/usage)。

设置的用量页可看：当前订阅、Token Plan 有效期、积分余额、用量额度、订阅 / 充值 / 发票 / 签到入口。

官方签到数字（同一页）：

- 每日签到 **400 积分**
- 连续第 4 天、第 7 天单日 **1000 积分**
- 完成一周累计 **4000 积分**
- 自到账之日起 **30 天内**有效

同一页最后一句：「具体计费和额度规则以产品内展示为准。」

下载页上的 Plus / Max / Ultra 月费和开放平台 Token Plan 美元档**不是同一张表**。不要在配方里合并报价。见 [速查表](./minimax-code-cheatsheet.md)。

## 6. 定时任务不跑时先查这三件事

来源：[桌面 FAQ](https://agent.minimaxi.com/docs/code/help/faq)。

「请确认电脑处于唤醒状态、MiniMax Code 正在运行，并且任务处于启用状态。」

CLI 没有桌面那套定时任务宿主。FAQ 原文：Browser、Computer Use「只有在当前宿主明确提供时才会出现；不能仅因为桌面端支持就假定 CLI 环境也支持。」

## 7. 常见安装翻车

| 症状 | 官方处理 |
|------|----------|
| `mcode: command not found` | 重开终端；查 `PATH`；VS Code 要整进程退出（[CLI FAQ](https://agent.minimaxi.com/docs/cli/faq)） |
| 安装失败 | 确认能访问 MiniMax 文件 CDN、Node.js 官网、npm registry；原生依赖还可能访问 GitHub。代理先设 `HTTP_PROXY` / `HTTPS_PROXY` / `ALL_PROXY` / `NO_PROXY` |
| Alpine / musl | 官方暂不支持 |
| Windows 桌面装不上 | 查系统版本、安装路径权限、企业代理（[download](https://agent.minimaxi.com/docs/code/get-started/download)） |
| 自定义模型连不上 | 查 Base URL、API Key、模型名、网络、API Format（[桌面 FAQ](https://agent.minimaxi.com/docs/code/help/faq)） |

把 MiniMax-M3 接到 Claude Code / Cursor 的步骤在 [text-ai-coding-tools](https://platform.minimaxi.com/docs/guides/text-ai-coding-tools)，不要写进本页当 MiniMax Code 配方。
