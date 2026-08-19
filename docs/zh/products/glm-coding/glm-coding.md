---
title: GLM Coding Plan 教程
description: 订阅智谱编码套餐，用官方 npx @z_ai/coding-helper 或手配，把额度接到 Claude Code 与 Cursor。
domain: product
tags:
  - coding-plan
role: tutorial
---

# GLM Coding Plan 教程

本页带你从订阅走到**第一次**在 Claude Code 或 Cursor 里用上套餐额度。参数与名单见 [速查表](./glm-coding-cheatsheet.md)，切模型 / MCP / 报错见 [Cookbook](./glm-coding-cookbook.md)。

官方路径：[快速开始](https://docs.bigmodel.cn/cn/coding-plan/quick-start)。本页默认**国内**端点。海外用 `api.z.ai`，见 [docs.z.ai/devpack/quick-start](https://docs.z.ai/devpack/quick-start)。

## 1. 先确认你买的是对的东西

你买的是**指定工具里的订阅额度**，不是清言会员，也不是开放平台资源包。

- 套餐只在官方 [指定工具与产品环境](https://docs.bigmodel.cn/cn/coding-plan/tool/others#%E4%B8%80%E3%80%81%E9%80%82%E7%94%A8%E5%B7%A5%E5%85%B7) 里生效。
- 自建应用、网站、机器人、SaaS 走标准 API，**不可享用** Coding 套餐额度（[FAQ](https://docs.bigmodel.cn/cn/coding-plan/faq)）。
- 官网体验中心也不吃这套餐。

## 2. 订阅并拿到套餐 Key

1. 打开 [智谱开放平台](https://open.bigmodel.cn) 注册 / 登录。
2. 到 [套餐详情页](https://zhipuaishengchan.datasink.sensorsdata.cn/t/Gd) 选个人或团队套餐（[快速开始](https://docs.bigmodel.cn/cn/coding-plan/quick-start) 原文链接）。
3. 取 Key：
   - **个人**： [个人编程套餐 > 套餐概览](https://bigmodel.cn/coding-plan/personal/overview) 新建 API Key。
   - **团队成员**： [团队编程套餐 > 我的套餐](https://bigmodel.cn/coding-plan?z_plan=team) 取 Key。

> **团队套餐 Key 与平台其他 API Key 不通用。** 要用团队额度，必须用团队套餐 Key。

不要把 Key 写进仓库。

## 3. 推荐路径：Coding Tool Helper

[一键安装助手](https://docs.bigmodel.cn/cn/coding-plan/extension/coding-tool-helper) 原文：Coding Tool Helper 把 **GLM 编码套餐** 装进你喜爱的编码工具。前提：**Node.js >= v18.0.0**。

当前 Helper **自动支持**的编码工具只有：

- Claude Code
- OpenCode
- Crush
- Factory Droid

Cursor / Cline / TRAE 等**不在**这张表里，跳到第 5 节手配。

### 方式一（官方推荐：npx 即用）

```bash
npx @z_ai/coding-helper
```

### 方式二：全局安装

```bash
npm install -g @z_ai/coding-helper
coding-helper
```

全局安装后也可以跑 `chelper`。权限不够时，官方示例是 `sudo npm install -g @z_ai/coding-helper`，或退回 npx。macOS 更建议用 nvm 装 Node，避免 `EACCES`。

向导顺序（官方原文）：选择界面语言 → 选择编码套餐 → 输入 API 密钥 → 选择要管理的工具 → 自动安装工具（如需要） → 进入工具管理菜单 → 装载编码套餐到工具 → 管理 MCP 服务（可选） → 启动编码工具。

非交互命令见 [速查表](./glm-coding-cheatsheet.md)。国内直接写 Key 的官方命令是：

```bash
coding-helper auth glm_coding_plan_china <token>
```

出问题先跑：

```bash
coding-helper doctor
```

## 4. 接到 Claude Code

官方页：[tool/claude](https://docs.bigmodel.cn/cn/coding-plan/tool/claude)。先装 Claude Code，再配套餐。装完**不要**立刻裸跑 `claude`（官方：可能因网络或地区限制无法使用）。

前提：Node.js 18+。Windows 还要 [Git for Windows](https://git-scm.com/download/win)。

```bash
npm install -g @anthropic-ai/claude-code
claude --version
```

### 4.1 用 Helper（推荐）

```bash
npx @z_ai/coding-helper
```

在向导里选 Claude Code，装载套餐。

### 4.2 脚本（仅 macOS / Linux，官方写明不支持 Windows）

```bash
curl -O "https://cdn.bigmodel.cn/install/claude_code_env.sh" && bash ./claude_code_env.sh
```

脚本会改 `~/.claude/settings.json`，写入：

```json
{
  "env": {
    "ANTHROPIC_AUTH_TOKEN": "your_zhipu_api_key",
    "ANTHROPIC_BASE_URL": "https://open.bigmodel.cn/api/anthropic",
    "API_TIMEOUT_MS": "3000000",
    "CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC": 1
  }
}
```

并在 `~/.claude.json` 加上 `"hasCompletedOnboarding": true`。

### 4.3 手改配置（macOS / Linux / Windows）

路径：

- macOS / Linux：`~/.claude/settings.json` 与 `~/.claude.json`
- Windows：`用户目录/.claude/settings.json` 与 `用户目录/.claude.json`

`settings.json` 的 `env` 与上一节脚本写入的字段相同。JSON 逗号多一个少一个都会让配置静默失败。

配完**新开一个终端**，进入仓库：

```bash
cd your-project
claude
```

若弹出「Do you want to use this API key」，选 Yes。官方建议用新版本；他们验证过 `2.0.14` 等版本，升级：

```bash
claude --version
claude update
```

默认是**服务端模型映射**：界面仍可能显示 Claude 模型名，实际打到 GLM。不要为了「看起来像 GLM」去硬编码映射——`tool/claude` 明确不推荐，升级时不好跟。要主动切到 GLM-5.3，用 [Cookbook](./glm-coding-cookbook.md) 里 `latest-model` 的原文，不要抄 `tool/claude` FAQ 里仍写着的 GLM-4.7 表。

## 5. 接到 Cursor

官方页：[tool/cursor](https://docs.bigmodel.cn/cn/coding-plan/tool/cursor)。**Helper 不会替你配 Cursor。**

> 由于 Cursor 的限制，只有订阅了 Cursor **高级会员及以上**的用户才支持自定义配置模型。若非 Cursor 高级会员，配置后会报错 `The model GLM does not work with your current plan or api key`。

1. 从 Cursor 官网安装。
2. 打开 **Models** → **Add Custom Model**。
3. 选 **OpenAI 协议**。
4. **OpenAI API Key** 填智谱套餐 Key（个人从 [API Keys](https://bigmodel.cn/usercenter/proj-mgmt/apikeys) / 套餐概览取；团队用团队套餐 Key）。
5. **Override OpenAI Base URL** 换成：

   `https://open.bigmodel.cn/api/coding/paas/v4`

6. 模型编码按 Cursor 页填写。官方原文：「需要输入模型的**大写名称**，如 `GLM-5.2`，不能填小写名称。」

套餐当前全量模型名单以 [overview](https://docs.bigmodel.cn/cn/coding-plan/overview) 为准（GLM-5.3 / GLM-5-Turbo / GLM-4.7）。Cursor 页示例仍是 `GLM-5.2`。本页不发明 `GLM-5.3` 的 Cursor 写法；以该工具页当时示例为准。

保存后，在主页切到刚建的 Provider。

## 6. 第一次对话

官方 [quick-start](https://docs.bigmodel.cn/cn/coding-plan/quick-start) 给的例子：

```text
请帮我创建一个 React 组件，包含用户登录表单
```

```text
我的 API 请求返回 404 错误，请帮我检查代码
```

```text
这个函数性能不好，请帮我优化一下
```

用量在 [用量统计](https://www.bigmodel.cn/coding-plan/personal/usage) 看。个人积分与高峰规则见 [速查表](./glm-coding-cheatsheet.md)。

下一步：切到 GLM-5.3、加视觉 / 搜索 MCP、处理 `1113`，去 [Cookbook](./glm-coding-cookbook.md)。
