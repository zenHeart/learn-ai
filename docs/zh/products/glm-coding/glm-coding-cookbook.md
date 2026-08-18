---
title: GLM Coding Plan 实战手册
description: 已经订好套餐之后：按官方原文切换 GLM-5.3、加套餐 MCP、处理 1113 与团队 Key。
domain: product
tags:
  - coding-plan
role: cookbook
---

# GLM Coding Plan 实战手册

面向已经订上套餐、工具能连上的读者。每个配方只解决一个问题。还没接到工具，先看 [教程](./glm-coding.md)。

## 1. 切到当前套餐模型（GLM-5.3）

事实源：[如何切换模型](https://docs.bigmodel.cn/cn/coding-plan/latest-model)。overview / FAQ：所有套餐已支持 **GLM-5.3**、GLM-5-Turbo、GLM-4.7。

`tool/claude` 的 FAQ 仍写 GLM-4.7 / GLM-4.5-Air 映射。**切模型不要抄那张旧表。**

开始前确认：

1. 套餐有效，Key 能用。
2. 端点正确：
   - Claude Code / Goose（Anthropic）：`https://open.bigmodel.cn/api/anthropic`
   - Codex：`https://open.bigmodel.cn/api/v1`（`latest-model` 原文；国内 [适用工具](https://docs.bigmodel.cn/cn/coding-plan/tool/others) 卡未列入 Codex）
   - 其它 OpenAI 兼容：`https://open.bigmodel.cn/api/coding/paas/v4`

### Claude Code

在 `~/.claude/settings.json`（Windows：`%USERPROFILE%\.claude\settings.json`）加入或替换：

```json
{
  "env": {
    "CLAUDE_CODE_AUTO_COMPACT_WINDOW": "1000000",
    "ANTHROPIC_DEFAULT_HAIKU_MODEL": "glm-4.7",
    "ANTHROPIC_DEFAULT_SONNET_MODEL": "glm-5.3[1m]",
    "ANTHROPIC_DEFAULT_OPUS_MODEL": "glm-5.3[1m]"
  }
}
```

1M 上下文必须带 `[1m]` 后缀，并设置上面的 `CLAUDE_CODE_AUTO_COMPACT_WINDOW`。若提示模型不存在，先 `claude update`。

新开终端，跑 `claude`，输入 `/status`：Settings source 应指向你的 `settings.json`，Model 显示 `glm-5.3` 或 `glm-5.3[1m]`。

会话里用 `/effort` 切思考强度，默认 max。关闭思考会被转成 low，**不会**换模型（`latest-model` 原文）。

### Cline 一类自定义模型工具

`latest-model` 以 Cline 为例：

- API Provider：`OpenAI Compatible`
- Base URL：`https://open.bigmodel.cn/api/coding/paas/v4`
- 模型：自定义，如 `glm-5.3`
- 取消勾选 Support Images
- Context Window Size：`1000000`

不能自定义模型的 Agent：官方写明只能等后续支持。

## 2. 给 Claude Code 加套餐 MCP

所有档位都支持视觉、联网搜索、网页读取、开源仓库 MCP，与模型**共享**套餐积分（[FAQ](https://docs.bigmodel.cn/cn/coding-plan/faq)）。除套餐包外，官方暂未提供其它调用这些 MCP 的接入方案。

个人用套餐概览里的 Key；团队必须用团队套餐 Key。

### 视觉理解（本地 `@z_ai/mcp-server`）

来源：[vision-mcp-server](https://docs.bigmodel.cn/cn/coding-plan/mcp/vision-mcp-server)。需要 `>= 0.1.2`。老缓存可删 npx cache，或强制 `@z_ai/mcp-server@latest`。

Claude Code 用套餐时，服务端已内置 `image_analysis`。要全套视觉工具再装：

```bash
claude mcp add -s user zai-mcp-server --env Z_AI_API_KEY=YOUR_API_KEY -- npx -y "@z_ai/mcp-server"
```

重装前：

```bash
claude mcp list
claude mcp remove zai-mcp-server
```

国内手配时设 `Z_AI_MODE=ZHIPU`。`Z_AI_MODE` 可选 `ZHIPU` 或 `ZAI`。

官方原文：除 Claude Code 外，「直接在客户端粘贴图片无法调用此 MCP Server」；最佳实践是把图片放在当前目录，用路径点名（例如 `What does demo.png describe?`）。

### 联网搜索（Remote）

来源：[search-mcp-server](https://docs.bigmodel.cn/cn/coding-plan/mcp/search-mcp-server)。Claude Code 用套餐时服务端已内置搜索；给其它模型再用：

```bash
claude mcp add -s user -t http web-search-prime https://open.bigmodel.cn/api/mcp/web_search_prime/mcp --header "Authorization: Bearer YOUR_API_KEY"
```

### 开源仓库 Zread（Remote）

来源：[zread-mcp-server](https://docs.bigmodel.cn/cn/coding-plan/mcp/zread-mcp-server)。

```bash
claude mcp add -s user -t http zread https://open.bigmodel.cn/api/mcp/zread/mcp --header "Authorization: Bearer YOUR_API_KEY"
```

网页读取 MCP 的命令以 [reader-mcp-server](https://docs.bigmodel.cn/cn/coding-plan/mcp/reader-mcp-server) 为准，本页不另抄。

## 3. 报错 `1113 余额不足` 或开始扣账户余额

来源：[FAQ](https://docs.bigmodel.cn/cn/coding-plan/faq)。官方把这类报错归为**未满足套餐使用条件**：

1. 工具必须在 [指定名单](https://docs.bigmodel.cn/cn/coding-plan/tool/others#%E4%B8%80%E3%80%81%E9%80%82%E7%94%A8%E5%B7%A5%E5%85%B7) 里。
2. Base URL 必须是套餐端点：
   - Claude Code：`https://open.bigmodel.cn/api/anthropic`
   - Cherry Studio：`https://open.bigmodel.cn/api/coding/paas/v4/`
   - 其它工具：`https://open.bigmodel.cn/api/coding/paas/v4`
3. 官网体验中心不支持编码套餐。

是否扣的是编码套餐：到 [费用明细](https://bigmodel.cn/finance/expensebill/list) 看抵扣资源包。

额度耗尽后应等待下一个 5 小时周期，系统**不会**自动改扣资源包 / 余额。若仍在扣余额，先查端点，不要加钱试。

套餐过期后：Claude Code **暂不支持**其它资源包；其它编码工具把 Base URL 改成 `https://open.bigmodel.cn/api/paas/v4` 才能走资源包（FAQ 原文）。那已经不是套餐额度。

## 4. Helper 装不上 / 网络错误

来源：[coding-tool-helper](https://docs.bigmodel.cn/cn/coding-plan/extension/coding-tool-helper)。

```bash
coding-helper doctor
```

| 症状 | 官方做法 |
|------|----------|
| `Network Error` | 查网络；Node **不会**自动用系统代理，要设 `HTTP_PROXY` / `HTTPS_PROXY` |
| 安装超时 | 查网络 / 代理，或换国内 npm 源 |
| `EACCES: permission denied` | `sudo`、管理员终端、改用 `npx @z_ai/coding-helper`、或 nvm |
| `droid: command not found` | 把 Factory Droid 可执行路径加进 PATH |
| Claude Code 插件市场状态不对 | `claude update` 到 **2.0.70+** |
| API Key 无效 | 核对复制；官方还写了检查账户余额 |

代理示例（官方原文结构）：

```bash
export HTTP_PROXY=http://your.proxy.server:port
export HTTPS_PROXY=http://your.proxy.server:port
```

## 5. 团队席位与两把 Key

来源：[team](https://docs.bigmodel.cn/cn/coding-plan/team)。

- 每位成员加入团队后，在「团队编程套餐」取**自己的**团队套餐 Key。
- 个人套餐和团队套餐可以同时存在；同一团队里一人同时只有一个生效席位。
- 主管理员默认**不占席位**。要用席位额度，给自己分配一个席位。
- 2 席起购；不可多人共用同一席位；标准版与高级版席位暂不可混买。
- 额度按席位单独限制。管理员可开超额按量（限时按 [API 刊例价](https://bigmodel.cn/pricing) 9 折，以团队页当时说明为准）。
- 个人并发建议：Lite 单项目；Pro 1–2 个；Max 2+。团队：标准版 1–2；高级版 2+（[usage-notes](https://docs.bigmodel.cn/cn/coding-plan/usage-notes)、team）。

取消自动续费：个人在 [套餐概览](https://www.bigmodel.cn/coding-plan/personal/overview) 操作，须在下一扣费日**至少 3 天前**。订阅一经购买不支持退款（[usage-notes](https://docs.bigmodel.cn/cn/coding-plan/usage-notes)）。

## 6. Cursor 自定义模型被拒

国内 Cursor 页原文：非**高级会员及以上**会报 `The model GLM does not work with your current plan or api key`。先核对 Cursor 自己的订阅，再核对 Base URL 是否为 `https://open.bigmodel.cn/api/coding/paas/v4`，模型名是否按该页要求使用大写。
