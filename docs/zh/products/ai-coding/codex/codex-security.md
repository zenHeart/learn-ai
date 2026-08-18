# Codex Security

> 这是一份**教程**——在你有权评估的仓库上跑一次只读扫描，然后读报告。Codex Security 是应用安全 Agent，**三扇门**：桌面插件、CLI/SDK、Cloud。本页是地图和第一次扫描，不抄官方每一条工作流。
>
> 官方落地页：[learn.chatgpt.com/codex/security](https://learn.chatgpt.com/codex/security)。文档：[Codex Security](https://learn.chatgpt.com/docs/security)。

## 先决条件

| 需要 | 要求 |
| --- | --- |
| 权限 | **只**扫你拥有或已获授权评估的代码 |
| 账号 | 具备 Codex Security 访问。效果最好：[Trusted Access for Cyber](https://chatgpt.com/cyber) |
| 桌面插件 | 带 Codex 的 [ChatGPT 桌面应用](https://learn.chatgpt.com/docs/app) |
| CLI / SDK | 能跑 `npx`；可选 TypeScript 应用 |
| Cloud | 仓库已在 [Codex Cloud](./codex-cloud) 里可见 |

**学习目标**：分清三扇门；装好插件或跑通 CLI help；完成一次只读首扫；知道 Cloud Security 是研究预览。

**非目标**：写 exploit / PoC；完整 SARIF/CI 手册（看官方 CI 文档）；Agent 沙箱理论（[CLI](./codex-cli)）。

## 三扇门，同一套扫描器

```
Codex Security
├── Plugin          桌面工作台 + CLI `/plugins`
│                   Scans · Findings · Repositories
├── CLI / SDK       @openai/codex-security
│                   本机、批量、CI、TypeScript
└── Cloud           研究预览
                    经 Codex Cloud 扫已连接的 GitHub 仓库
```

桌面 **Security** 工作台和 Codex CLI 都走 **Codex Security 插件**。Cloud 经 Codex Cloud 扫 GitHub。沙箱、审批、管理员策略仍是 [agent security](https://learn.chatgpt.com/docs/agent-approvals-security)——Security 不替代它们。

| 门 | 何时用 | 从哪开始 |
| --- | --- | --- |
| 插件 | 桌面里交互分诊 | [Plugin quickstart](https://learn.chatgpt.com/docs/security/plugin) |
| CLI / SDK | 可重复本机扫描、批量清单、CI | [CLI quickstart](https://learn.chatgpt.com/docs/security/cli) · [SDK](https://learn.chatgpt.com/docs/security/sdk) |
| Cloud | 托管扫已连接的 GitHub 仓库 | [Cloud setup](https://learn.chatgpt.com/docs/security/setup) |

从 ChatGPT 装插件：[分享链接](https://chatgpt.com/plugins/share/676aca3811d54fa7bcdef5255236b3c4)。

## 第一次本机扫描（插件）

官方首扫路径：[Plugin quickstart](https://learn.chatgpt.com/docs/security/plugin)。质量默认：`gpt-5.6-sol` + `xhigh` 推理。

### 桌面

1. 在 ChatGPT 桌面应用里打开 Codex。
2. **Plugins** → 搜 **Codex Security** → 安装并启用。
3. 侧栏打开 **Security**。没有就升级应用和插件。
4. **Scans → + Scan**。选仓库或文件夹。第一次先关 **Deep scan**。
5. 开始扫描。审 **Findings**、覆盖率和 `report.md`。

工作台：**Scans**（进度和历史）、**Findings**（问题和证据）、**Repositories**（仓库历史）。细节：[Security workbench](https://learn.chatgpt.com/docs/security/plugin/workbench)。

### 经插件的 CLI 会话

```bash
cd ~/code/your-repo
codex
```

然后 `/plugins` → 安装 **Codex Security** → `/new`，发送：

```text
Run a Codex Security scan on this repository.
```

等到结束。先看终端摘要，再读 `report.md`。任何配置改动都要先读完补丁再批。

## CLI 和 SDK 包

公开包：[`@openai/codex-security`](https://github.com/openai/codex-security)。

```bash
npx @openai/codex-security --help
```

同一套扫描器跨仓库、跨时间：发现 GitHub 仓库、恢复批量扫描、跟踪 findings、记录误报、设费用上限、进 CI。TypeScript SDK 把扫描、进度和取消嵌进工具。

| 工作 | 官方页 |
| --- | --- |
| 第一次终端扫描 | [CLI quickstart](https://learn.chatgpt.com/docs/security/cli) |
| 批量 / CSV 清单 | [Bulk scans](https://learn.chatgpt.com/docs/security/cli/bulk-scans) |
| CI 里 PR / MR，SARIF | [CLI in CI](https://learn.chatgpt.com/docs/security/cli/ci) |
| flag 和退出码 | [CLI reference](https://learn.chatgpt.com/docs/security/cli/reference) |
| 从应用代码调用 | [TypeScript SDK](https://learn.chatgpt.com/docs/security/sdk) |

这**不是**通用 [Codex SDK](https://learn.chatgpt.com/docs/codex-sdk)（`@openai/codex-sdk`）。结构化安全 findings 才用 Security SDK。

## Cloud（研究预览）

Codex Security cloud 按提交扫已连接的 GitHub 仓库。它建仓库专属威胁模型，在隔离环境里验证高信号问题，再给出带证据和补丁建议的排序结果。

仓库看不见时，先确认它在 Codex Cloud workspace 里可见，或联系 OpenAI 客户团队。

威胁模型：[Improving the threat model](https://learn.chatgpt.com/docs/security/threat-model)。PR 评审：[Security Review](https://learn.chatgpt.com/docs/security/security-review)。

## 首扫之后

| 下一步 | 官方页 |
| --- | --- |
| 更深、更慢的扫描 | [Deep scans](https://learn.chatgpt.com/docs/security/plugin/deep-scans) |
| 审 PR / 分支 / 补丁 | [Code changes](https://learn.chatgpt.com/docs/security/plugin/code-changes) |
| 消化已有 backlog | [Triage](https://learn.chatgpt.com/docs/security/plugin/triage-backlog) |
| 有界修复并验证 | [Fix findings](https://learn.chatgpt.com/docs/security/plugin/fix-findings) |
| 导出 / 跟踪 | [Export findings](https://learn.chatgpt.com/docs/security/plugin/export-findings) |

完成的扫描通常写出 `report.md`，可选 `findings/<slug>/` 和 `hardening/`，以及 `scan-manifest.json`、`findings.json`、`coverage.json`。目录要整份留着，`report.md` 里的链接才不断。

## 常见陷阱

| 陷阱 | 结果 | 改做 |
| --- | --- | --- |
| 扫无权评估的仓库 | 政策和法律问题 | 停下。只评估已授权代码 |
| 把 finding 当铁证 | 仍有误报 | 读证据；Cloud/插件会验证，你仍要拍板 |
| 要一份能用的 exploit | 本教程不做 | 看官方证据；这里不写 exploit PoC |
| Security SDK 和 Codex SDK 搞混 | 装错包 | `@openai/codex-security` vs `@openai/codex-sdk` |
| 跳过 Trusted Access | 扫描变弱 | 符合条件就去 [chatgpt.com/cyber](https://chatgpt.com/cyber) |

## 实际用例

发版前对 `packages/api` 做一次**只读**插件扫描。接受一条 finding，要有界补丁，再跑相关测试。PR diff 走 Security CLI。workspace 有研究预览就把 Cloud 开在 GitHub org 上。

## 下一步

1. 插件首扫 → [Plugin quickstart](https://learn.chatgpt.com/docs/security/plugin)
2. 可重复 CLI → [CLI quickstart](https://learn.chatgpt.com/docs/security/cli)
3. 托管 GitHub → [Cloud setup](https://learn.chatgpt.com/docs/security/setup)
4. Agent 沙箱（另一层） → [Agent approvals & security](https://learn.chatgpt.com/docs/agent-approvals-security)

## 官方来源

- [Codex Security（落地页）](https://learn.chatgpt.com/codex/security)
- [Codex Security（文档）](https://learn.chatgpt.com/docs/security)
- [Plugin quickstart](https://learn.chatgpt.com/docs/security/plugin) · [Workbench](https://learn.chatgpt.com/docs/security/plugin/workbench)
- [CLI](https://learn.chatgpt.com/docs/security/cli) · [SDK](https://learn.chatgpt.com/docs/security/sdk)
- [Cloud setup](https://learn.chatgpt.com/docs/security/setup) · [Cloud FAQ](https://learn.chatgpt.com/docs/security/faq)
- [Security Review](https://learn.chatgpt.com/docs/security/security-review)
- [openai/codex-security](https://github.com/openai/codex-security)
