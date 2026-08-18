---
title: 阿里云百炼 Cookbook
description: 按场景抄：别混用 Key、挡住扣费、无代码问答、装百炼 CLI。不写灵码/千问完整教程。
domain: product
tags:
  - model-platform
role: cookbook
---

# 阿里云百炼 Cookbook

> 已经会发第一条请求。这里按问题给步骤。基础开通见 [教程](./bailian)。

## 把现有 OpenAI 代码迁到百炼

官方口径：改 **API Key、base_url、模型名称**。[产品简介](https://help.aliyun.com/zh/model-studio/what-is-model-studio)

1. `apiKey` 读 `process.env.DASHSCOPE_API_KEY`。
2. `baseURL` 换成该地域的 OpenAI 兼容主机，并填入 `{WorkspaceId}`（北京 / 新加坡 / 东京 / 法兰克福）。美国弗吉尼亚以[模型清单](https://help.aliyun.com/zh/model-studio/models)为准。
3. `model` 换成清单里的 ID。不要沿用 `gpt-4o` 这类名字。
4. 流式、tools 是否可用，看该模型在清单页标注的协议，不要假设「兼容 = 全功能对等」。

完整 Node / Python / curl 以[首次调用](https://help.aliyun.com/zh/model-studio/first-api-call-to-qwen)为准。

## 不要把三套凭证混在一起

这是扣费和 `invalid_api_key` 的第一来源。[Coding Plan](https://help.aliyun.com/zh/model-studio/coding-plan)、[Token Plan](https://help.aliyun.com/zh/model-studio/token-plan-overview)

| 计费方式 | Key 长什么样 | Base URL 认哪张纸 |
|----------|--------------|-------------------|
| 按量付费 | `sk-` 或 `sk-ws` | [首次调用](https://help.aliyun.com/zh/model-studio/first-api-call-to-qwen) / [模型清单](https://help.aliyun.com/zh/model-studio/models) 的 OpenAI 或 Anthropic 主机 |
| Coding Plan | `sk-sp-`（套餐页） | OpenAI：`https://coding.dashscope.aliyuncs.com/v1`；Anthropic：`https://coding.dashscope.aliyuncs.com/apps/anthropic` |
| Token Plan | 套餐专属 Key（官方写 `sk-sp-` 前缀） | **以 Token Plan 控制台当时展示的 URL 为准**，不要抄 Coding Plan 的主机 |

官方点名的混用后果：

- 通用 Key + 套餐 URL → `invalid_api_key`。
- 通用 Key + 按量 URL → **不抵扣套餐，按量出账**。
- 已买 Coding Plan 仍欠费：多半是工具里还留着 `sk-` 和 `dashscope.aliyuncs.com`。

Coding Plan **只允许编程工具**（官方举例：Claude Code、Qoder、Qoder CN、OpenClaw）。用套餐 Key 打自己的后端、脚本、批量任务，官方视为违规，可能停订阅或封 Key。

Token Plan 要求工具支持 OpenAI 或 Anthropic 协议。界面长得像官方工具但不通标准 API 的，不能抵扣套餐，应改用按量 `sk-` / `sk-ws`。

把 Key 填进某个客户端时，只打开官方对应页，不要在本站复制逐步截图：

- 总入口：[接入客户端/开发工具](https://help.aliyun.com/zh/model-studio/use-chat-client-or-development-tool/)
- 例：[Claude Code](https://help.aliyun.com/zh/model-studio/claude-code)、[Chatbox](https://help.aliyun.com/zh/model-studio/chatbox)、[Cursor](https://help.aliyun.com/zh/model-studio/use-chat-client-or-development-tool/)

通义灵码 / Qoder CN 的完整 IDE 教程不在本目录，见 #84。这里只记一句：官方说个人社区版 / 个人专业版可接入百炼，**企业版不支持**。[Qoder CN](https://help.aliyun.com/zh/model-studio/lingma-agent)

## 挡住新人额度耗尽后的按量账单

中国站规则见[新人免费额度](https://help.aliyun.com/zh/model-studio/new-free-quota)：

1. 额度只在**北京**，有效期 **90 天**，从开通、模型发布或申请通过之日取较晚者。
2. 只抵扣**实时推理**。不抵扣 Batch、调优、部署、自定义模型。
3. 每个模型（含带日期的快照）额度独立。官方写各模型「通常为 100 万 Token」——以控制台该模型详情为准，不要把营销页「超 7000 万」理解成一个池子。
4. 已认证账号：控制台打开「**免费额度用完即停**」，耗尽返回 `AllocationQuota.FreeTierOnly`，不再转按量。
5. 未认证账号：系统强制用完即停。
6. 账户一旦欠费，其它模型即使还有免费额度也调不了。

生产环境官方不建议开「用完即停」（额度耗尽服务会停）。生产用余额预警和删 Key。

Token Plan / Coding Plan 专属 Key **不消耗**这套新人免费额度。

## 零代码做一个知识库问答

1. 打开控制台，确认地域。
2. 按 [0 代码构建问答应用](https://help.aliyun.com/zh/model-studio/build-knowledge-base-qa-assistant-without-coding/) 建应用并挂知识库。
3. 新项目优先 [Agent 2.0](https://help.aliyun.com/zh/model-studio/new-single-agent-application)。官方：无旧版依赖时推荐新版。1.0 和 2.0 **不能互转**。
4. 发布后才能用 API / 渠道。未发布的草稿调不通。
5. 知识库和模型推理**分开计费**。知识库不支持节省计划 / 资源包。[产品简介](https://help.aliyun.com/zh/model-studio/what-is-model-studio)

不要在这里展开调优、专属部署。那是另一条轴，官方入口：[模型调优](https://help.aliyun.com/zh/model-studio/model-training-overview)、[模型部署](https://help.aliyun.com/zh/model-studio/model-deployment-introduction)。

## 安装百炼 CLI

这是**百炼自己的**命令行（给 Agent 调多模态原子能力），不是阿里云 OpenAPI 的 `aliyun bailian`。

官方安装说明：[bailian.aliyun.com/cli/install.md](https://bailian.aliyun.com/cli/install.md)

```bash
# Node.js ≥ 22.12.0，只用 npm 全局安装
npm install -g bailian-cli
bl --version

# 本机浏览器登录（推荐）
bl auth login --console

# 最小验证
bl auth status --output json
bl text chat --message "ping" --non-interactive --output json
```

命令名是 `bl` 和 `bailian`。装 Skills 的官方命令是 `npx skills add modelstudioai/cli --all -g`。

无法弹浏览器时：`bl auth login --api-key <用户粘贴的 Key>`。不要把 Key 写进仓库或聊天记录。

全球地域开关官方写的是 `--region cn|us|intl`，默认 `cn`。
