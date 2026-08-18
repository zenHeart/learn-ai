# Codex Cloud

> 这是一份**教程**——在隔离的托管环境里跑编程任务，审 diff，再开 PR。Cloud 是 Codex 的一个入口，不是第二个产品。沙箱、审批、`AGENTS.md` 同样生效。
>
> 官方落地页：[learn.chatgpt.com/codex/cloud](https://learn.chatgpt.com/codex/cloud)。文档：[Codex cloud](https://learn.chatgpt.com/docs/cloud)。入口：[chatgpt.com/codex](https://chatgpt.com/codex)。

## 先决条件

| 需要 | 要求 |
| --- | --- |
| 账号 | 含 Codex 的 ChatGPT 套餐。限额只看 [定价页](https://learn.chatgpt.com/docs/pricing) |
| GitHub | 能授权的 GitHub 账号，以及 Codex 可见的仓库 |
| 浏览器 | [chatgpt.com/codex](https://chatgpt.com/codex) |
| 可选 CLI | 已装 [Codex CLI](./codex-cli)，用来跑 `codex cloud` / `codex cloud exec` |

**学习目标**：建好一个 Cloud 环境；从网页或 CLI 派一次任务；会审摘要和 diff；知道什么时候该用 Cloud 而不是本机。

**非目标**：本机沙箱（[CLI](./codex-cli)）；IDE 第一次对话（[IDE](./codex-ide)）；安全扫描（[Security](./codex-security)）；套餐数字（[套餐](./chatgpt-plus)）。

## Cloud 是什么，不是什么

Cloud 把 Codex 跑在 OpenAI 托管机器上，对着你为仓库配好的**可复现环境**干活。每个任务一份隔离环境，可以并行。做完再审。

它**不是**：

- 第四个产品。托管 code review / QA 是 Cloud 上的工作流。
- 本机的替代品。对着当前文件的小改动，本地 CLI / IDE 更快。
- ChatGPT Work 的 Cloud。Work Cloud 出 PPT / 调研；Codex Cloud 写代码、开 PR。

桌面 Codex 仍在 [ChatGPT 桌面应用](https://learn.chatgpt.com/docs/app) 里。入口写在 [产品线](./codex-ai) 和 [Work 与 Codex 对照](./chatgpt-work#桌面上-work-和-codex-怎么选)，这里不再重复一整页。

## 什么时候用 Cloud

官方 “use Cloud when…”：

| 场景 | 为什么用 Cloud |
| --- | --- |
| 任务要在后台跑 | 不占本机 |
| 要并行试几次 | `--attempts` / 多开会话，再挑 |
| 活从 **GitHub / Linear / Slack** 来 | 官方集成直接派进 Cloud |
| 人不在开发机旁 | 网页或 `codex cloud exec` |

本机文件、对着当前进程的调试、已经打开的文件上 30 秒改动，留在本地（[IDE](./codex-ide)）。

## 前 15 分钟

### 1. 打开 Codex 并登录

打开 [chatgpt.com/codex](https://chatgpt.com/codex)，用和 CLI 同一套 ChatGPT 账号登录。

### 2. 连接 GitHub

按提示授权。只开 Codex 该看见的仓库。

### 3. 创建环境

打开 [environment settings](https://chatgpt.com/codex/settings/environments)，为仓库建环境。配好依赖、工具、环境变量和密钥。

细节：[Cloud environments](https://learn.chatgpt.com/docs/environments/cloud-environment)。联网：[Agent internet access](https://learn.chatgpt.com/docs/cloud/internet-access)。

### 4. 派第一个任务

回到 [chatgpt.com/codex](https://chatgpt.com/codex)，选环境，写**结果**，不要写感觉：

```text
Add a failing test for the date parser in packages/core, then make it pass.
Do not touch packages/legacy. Open a draft PR when tests are green.
```

可以盯日志，也可以让它后台跑。

### 5. 先审再合

读摘要和 diff。要改就追问，准备好了再开 PR。不要因为「看起来对」就合。

## 从 CLI 派

```bash
codex cloud                                            # 浏览环境（Ctrl+O 露出 ID）
codex cloud exec --env <ENV_ID> "run the migration dry run"
codex cloud exec --env <ENV_ID> --attempts 3 "..."     # 1–4 次
```

`--attempts` 给结果本身不确定的任务。挑最好的一次，不要平均。

## 从 GitHub、Linear、Slack 派活

不用离开 PR、issue、频道或线程。

| 从哪 | 官方页 |
| --- | --- |
| GitHub | [Use Codex with GitHub](https://learn.chatgpt.com/docs/third-party/github) |
| Linear | [Use Codex in Linear](https://learn.chatgpt.com/docs/third-party/linear) |
| Slack | [Use Codex in Slack](https://learn.chatgpt.com/docs/third-party/slack) |

IDE 也可以把长任务交给 Cloud，回到同一条会话审：[从 IDE 委派](https://learn.chatgpt.com/docs/cloud#delegate-from-the-ide-extension)。

## 托管评审是 Cloud，不是第四个产品

| 入口 | 做什么 |
| --- | --- |
| 本机 `/review` | 相对 base 或未提交 diff；不改树 |
| Cloud code review / QA | 托管环境里评审 / QA。合格客户用 **GPT-5.6 Sol**，模型由 Cloud 选 |
| Codex Security Review | PR + 仓库上下文 + 威胁模型。研究预览，见 [Security](./codex-security) |

本机 `/review` 是会话命令，不要和托管评审混名。

## 常见陷阱

| 陷阱 | 结果 | 改做 |
| --- | --- | --- |
| 不配环境就派活 | 缺依赖、空 diff | 先配环境 |
| 把 Cloud 当第二台笔记本 | 本机密钥和本地工具不在 | 密钥放进环境；本机活留本机 |
| 合第一个「看起来对」的 PR | 测试没跑，或跑错树 | 读 diff，要测试输出 |
| 和 Work Cloud 搞混 | 得到 PPT 而不是 PR | 进 **Codex**：[chatgpt.com/codex](https://chatgpt.com/codex) |
| 电脑睡着还指望 Remote 那种 Cloud | 产品不同 | [Remote](./codex-remote) 驱动**已配对电脑**；Cloud 不需要那台机器醒着 |

## 实际用例

前端 monorepo：三条 Cloud 会话用 `--attempts 3` 试同一次发飘的迁移。你继续在 [IDE](./codex-ide) 改设计系统。赢的那次开 draft PR。只有评审主机仍是那台笔记本时，才用 [Remote](./codex-remote) 在手机上看；否则直接用网页 Cloud。

## 下一步

1. 环境旋钮 → [Cloud environments](https://learn.chatgpt.com/docs/environments/cloud-environment)
2. 联网策略 → [Agent internet access](https://learn.chatgpt.com/docs/cloud/internet-access)
3. 编辑器交接 → [IDE](./codex-ide)
4. 手机批**本机**会话 → [Remote](./codex-remote)
5. 自建 CI → [项目集成](./integration)

## 官方来源

- [Codex cloud（落地页）](https://learn.chatgpt.com/codex/cloud)
- [Codex cloud（文档）](https://learn.chatgpt.com/docs/cloud)
- [Cloud environments](https://learn.chatgpt.com/docs/environments/cloud-environment)
- [Agent internet access](https://learn.chatgpt.com/docs/cloud/internet-access)
- [GitHub](https://learn.chatgpt.com/docs/third-party/github) · [Linear](https://learn.chatgpt.com/docs/third-party/linear) · [Slack](https://learn.chatgpt.com/docs/third-party/slack)
- [Code review](https://learn.chatgpt.com/docs/code-review)
- [What's new](https://learn.chatgpt.com/docs/whats-new)
