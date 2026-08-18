# PR Routing & Approval

PR Routing & Approval 按所有权和提交历史**把 PR 派给对的审人**，并在满足你的条件时**批准低风险改动**。它跑在 Automations 上。它**不替代完整 code review**。

> 官方：[PR Routing & Approval](https://cursor.com/docs/approval-agents)。配置入口：[Automations](https://cursor.com/automations/from-cursor/pr-routing-and-approval)。
>
> 政策文件：文件名必须精确为 **`APPROVAL_POLICY.md`**，外加可选的 `.cursor/approval-policies/ROUTING.md`。

## 先决条件

- 关心的组织 / 仓库已接源代码托管
- 团队管理员才能**编辑**这条 Automation（非管理员只能看）
- 可选：要在决策里读 finding，就先开 Bugbot 和 / 或 [Security Agents](./security-agents)
- Security Review Context 需要 Security Agents，且计划是 **team 或 enterprise**

## 学习目标

读完本页你能：

1. 分别打开「派审人」和「自动批准」
2. 在对的目录放下受信任的 `APPROVAL_POLICY.md`
3. 知道哪些文件名会被**忽略**
4. 明白「同一个 PR 里改政策来放宽审查」不会生效

---

## 它做什么

Agent 根据**代码所有权和提交历史**指定审人。能否批准，要同时看你的 **approval criteria**、**风险设置**、**政策文件**、**AI 审查 finding** 和**当前审查状态**。

两项能力分开开：

| 能力 | 官方开关 | 干什么 |
|------|----------|--------|
| 派审人 | **Enable PR Routing and Requests for Review** | 请求审人 |
| 按风险批准 | **Automatically Approve PRs** | 配好标准后才批准 |

## 它能读的信号

### AI 审查感知

- **Bugbot Review Context** — Bugbot finding 进入批准决策
- **Security Review Context** — Security Agent finding 进入批准决策

打开后，Agent **会等**这些检查跑完。若 Bugbot 或 Security Agents 报告了需要人看的 finding，PR Routing **不会批准**。

Security Agents 需要 **team 或 enterprise** 计划。

### 风险打分

- **Use Risk Score** — 给 PR 分风险（可用 prompting 再定制）
- **Maximum Risk Threshold** — Agent 最多能批到哪一档

超过阈值就不会批。

## 政策文件

### `APPROVAL_POLICY.md`

对每个被改的文件，Agent 从该文件所在目录往上走，找这个**精确**文件名：

```text
APPROVAL_POLICY.md
```

只信任精确 basename。下面这些会被**忽略**：

- `POLICY.md`
- `approval_policy.md`
- `APPROVAL_POLICY.md.bak`
- `team_APPROVAL_POLICY.md`

**最近**的那份优先级最高。祖先目录的政策仍然生效，除非和更具体的一份冲突。

### `.cursor/approval-policies/ROUTING.md`

顶层路由文件。YAML 列表，每项一个产品：

- `product` — 产品或区域名
- `boundary` — 语义边界，或相对仓库的路径 / glob
- `policies` — 政策提示指针（路径或语义描述）

没有 `ROUTING.md` 时，基于目录的 `APPROVAL_POLICY.md` 发现**仍会跑**。缺路由不会削弱政策发现。

### 优先级

适用的 approval policy 提示会覆盖通用批准标准、风险阈值、选审人指引、自定义批准指令，以及默认的自动审查姿态。

政策冲突：跟**最具体**的。说不清谁更具体：跟**更严**的，并**避免自动批准**。

若某个 PR **改了** approval policy、路由文件、被路由到的政策文件或审人专用政策文件，Agent **不会**用这次改过的内容给**同一个 PR** 放宽审查。能拿到就用 **base 分支**上的版本，否则要求人审。

最小示例（只示范形状 — 规则写成你们团队真正要的）：

```markdown
# APPROVAL_POLICY.md  （例如只放在 docs/）

本目录的错字和文案修改可以自动批准。
任何碰到鉴权、计费或依赖版本的改动，必须有人审。
```

## 配置

打开 [Automations 里的 PR Routing & Approval](https://cursor.com/automations/from-cursor/pr-routing-and-approval)。

1. 打开路由和 / 或自动批准
2. 选组织和仓库
3. 配 **triggers**：
   - **PR opened**
   - **PR pushed / updated**
   - **PR commented**（评论匹配正则）
4. 在 **Configuration** 里选信号：Bugbot 上下文、Security 上下文、风险分、最高风险
5. 可选 **Custom Prompt** 写团队预期。适用文件仍以政策文件为准。空着就用 Cursor 托管默认
6. 工具：Agent **至少要有一个**主动作 — **Request Reviewers** 和 / 或 **Approve PR**。可选：Slack、Microsoft Teams、额外 MCP
7. 保存。之后在详情页开关

触发器可以按仓或按组织收窄。团队管理员可以配更宽的团队范围。

## 什么时候用

- 大 monorepo：按所有权把 PR 派给对的人
- 低风险文档 / 生成文件：只在 `APPROVAL_POLICY.md` 允许的地方自动批
- 和 Bugbot + Security Agents 一起：自动批准要**等**这些 finding

鉴权、支付、以及政策标成禁区的东西，继续人审。这个产品**不替代**那一步。

## 常见陷阱

| 陷阱 | 正确做法 |
|------|----------|
| `approval_policy.md` 或 `POLICY.md` | 精确名字 **`APPROVAL_POLICY.md`** |
| 以为没有 `ROUTING.md` 政策就不跑 | 目录发现仍会跑 |
| 同一个 PR 里改政策来放宽 | Agent 用 **base 分支**副本，或要求人审 |
| 开了自动批准却没开主动作 | 需要 **Approve PR**（和 / 或 **Request Reviewers**） |
| 无视 Bugbot / Security finding | 这些上下文开着且需要人看时，**不会自动批** |
| 当成 Bugbot | Bugbot 留言；这个**派审人，并可能批准** |

## 下一步

- [Security Agents](./security-agents) — Security Review Context
- [Cookbook · Bugbot](./cursor-cookbook#用-bugbot-审-pr) — Bugbot Review Context
- [Cloud Agents](./cloud-agents) — Automations 跑的是 Cloud Agents
- 官方：[PR Routing & Approval](https://cursor.com/docs/approval-agents)、[Automations](https://cursor.com/docs/cloud-agent/automations)
