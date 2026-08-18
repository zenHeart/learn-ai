# Security Agents

Security Agents 扫描代码里的 **安全 bug、危险模式和漏洞**。它们是 [Automations](https://cursor.com/automations/from-cursor/security) 上的 Cursor 托管 Agent，并且**需要 Cloud Agents**。

> 官方：[Security Agents](https://cursor.com/docs/security-agents)。
>
> 两种类型：**Security Reviewer**（PR / MR）和 **Vulnerability Scanner**（cron）。本地技能：`/review-security`。计费进**团队用量池**，不是你的个人配额。

## 先决条件

- 账号能用 Cloud Agents（付费计划；管理员已接源代码托管）
- 打得开 [Automations](https://cursor.com/automations/from-cursor/security)
- 要在编辑器或 [cursor.com/agents](https://cursor.com/agents) 用 `/review-security` / `/review`，需要 Cursor **3.7+**
- 若 [PR Routing](./pr-routing) 要读 Security Review Context，需要 **Team 或 Enterprise**

## 学习目标

读完本页你能：

1. 分清 Security Reviewer、Vulnerability Scanner，以及它们和 Bugbot 的差别
2. 配触发器、至少一个 tool / MCP、自定义指令
3. 推送前在当前分支跑 `/review-security`
4. 知道用量记在**团队池**，不记在你头上

---

## 两种 Agent

| 类型 | 触发 | 干什么 |
|------|------|--------|
| **Security Reviewer** | Automations 的 Git 触发：pull request / merge request | 在**代码审查时**拦漏洞 |
| **Vulnerability Scanner** | Cron | 扫**静止**代码库——存量问题、漏网的旧洞、PR 审查没看到的 |

两者都跑在 Automations 平台，都需要 Cloud Agents。可以用 Cursor 云，不必另搭 VM。

这**不是** Bugbot。Bugbot 审 PR diff（bug / 安全 / 质量）并留言。Security Agents 是另一组 Cursor 托管 Automation。PR Routing 可以**读**两边：[Bugbot Review Context](./pr-routing) 和 Security Review Context。

## 配置

打开 [Automations 里的 Security Agents](https://cursor.com/automations/from-cursor/security)。

1. 选 **Security Reviewer** 或 **Vulnerability Scanner**
2. 设 **triggers**（PR / MR 事件 vs cron）
3. 打开或关掉内置 **security checks**
4. 写 **custom instructions**：优先看什么、项目安全预期、Agent 该怎么表现
5. 接 **tools 和 MCPs** — 每个 Agent **至少要有一个** 才能跑
6. 保存。运行记录在 Automations 历史里

用 tools / MCP 把 finding 送到 Slack 或 issue tracker，说明何时调用哪个 MCP，并在报告前补上下文。

## 在你的 Agent 里跑

推送前用 `/review-security` 或 `/review`。

| 旋钮 | 官方默认 |
|------|----------|
| **审哪段 diff** | 当前**分支**相对 base：已提交 **和** 未提交的改动 |
| **对比哪条 base** | 默认 base 分支。若不是 `main`，告诉 Agent 要比哪条，或让它从上下文推断 |

想收窄时，明确说**只审未提交**改动。

`/review` 和 `/review-security` 在 **Cursor 3.7+** 以及 [cursor.com/agents](https://cursor.com/agents) 可用。**CLI 支持即将到来** — 不要写成现在就能 `agent /review-security`。

## 计费

Security Agents 按**团队用量**计费：

- 记入团队 **usage pool**
- 跑在**共享团队服务账号**下
- **不影响**任何个人用户的用量

Automations 会创建 Cloud Agents；底层模型费率见 [Cloud agent pricing](https://cursor.com/docs/models-and-pricing.md#model-pricing)。

## 分析与运行记录

三次运行汇总的三个指标：

| 指标 | 含义 |
|------|------|
| **Vulnerabilities found** | 报告的安全 finding |
| **Issues fixed** | 之后被修掉的 finding |
| **Resolution rate** | 已修复占已报告的比例 |

Cursor 用 **LLM 看增量 diff** 判断被标出的问题是否真的修了。

每次运行都记在 Automations：何时跑、用了哪些工具、最终状态、耗时。打开一次运行可看底下的 Cloud Agent。

## 什么时候用

- PR 门禁：Security Reviewer 挂在 pull / merge request 事件
- 定期基线：Vulnerability Scanner 走 cron，不依赖 PR 流量
- 本地推送前：对当前分支 `/review-security`
- 喂给 PR Routing：打开 **Security Review Context**，低风险自动批准要等这些 finding

只要通用 bug / 质量审查时，继续只用 Bugbot。

## 常见陷阱

| 陷阱 | 正确做法 |
|------|----------|
| 当成换了名字的 Bugbot | 不同产品。Bugbot 给 diff 留言；这是托管 Security Agent |
| 忘了 tool / MCP | 官方：每个 Agent **至少要有一个** 才能跑 |
| 指望今天就能在 CLI 用 | 官方：**CLI support is coming soon** |
| 以为扣你的个人配额 | 团队用量池 + 共享服务账号 |
| `/review-security` 却只想看「最后一个 commit」又不说 | 默认是**整条分支**，含未提交 |
| 没开 Cloud Agents / 没接源代码托管 | 这些 Agent **必须**有 Cloud Agents |

## 下一步

- [Cloud Agents](./cloud-agents) — 运行时
- [PR Routing](./pr-routing) — 可读 Security Review Context
- [Cookbook · Bugbot](./cursor-cookbook#用-bugbot-审-pr) — 通用 PR 审查
- 官方：[Security Agents](https://cursor.com/docs/security-agents)、[Automations](https://cursor.com/docs/cloud-agent/automations)
