# Origin

Origin 是 **Cursor 的 git forge**（early beta）：托管仓库、镜像 GitHub、在 [cursor.com/codebase](https://cursor.com/codebase) 浏览 / 搜索、开或合并 PR。它是**托管代码**产品，不是又一份 Rules。

> 官方：[Origin](https://cursor.com/docs/origin)。反馈：[hi@cursor.com](mailto:hi@cursor.com)。
>
> Origin CLI 的二进制是 **`origin`**。那不是 Cursor Agent CLI 的 **`agent`**。

## 先决条件

- **Pro / Teams / Enterprise**。免费计划**没有** Origin 代码存储
- 按阶段开放——计划已支持时，你也可能暂时看不到
- 仍在 **legacy privacy mode** 的团队**不能启用** Origin。先切到 [Privacy Mode](https://cursor.com/help/security-and-privacy/privacy.md#how-do-i-enable-privacy-mode)
- 会用 git。GitHub 是可选的（代码已经在那儿再镜像）

## 学习目标

读完本页你能：

1. 把 Origin 和 Rules、Bugbot、「又一个 GitHub 集成」分开
2. 占用 **codebase 名**，创建或镜像仓库
3. 用标准 git 或 Origin CLI clone / push
4. 知道 GitHub 镜像会同步什么、**不会**同步什么

---

## Origin 是什么（不是什么）

官方 early beta 清单：创建仓库（含 Cursor agent 代建）、标准 git clone / push / pull、[镜像 GitHub](https://cursor.com/docs/origin/mirror-github)、[开 / 审 / 合 PR](https://cursor.com/docs/origin/pull-requests)、在 `cursor.com/codebase/{owner}/{repo}` [浏览搜索](https://cursor.com/docs/origin/browse)、仓库与 codebase 设置、接第三方应用（Vercel、Depot、Buildkite）、接 [Automations 与 Cloud Agents](https://cursor.com/docs/origin/integrations)、装 [Origin CLI](https://cursor.com/docs/origin/cli)。

| 是 | 不是 |
|----|------|
| 团队代码的 git 托管 + 浏览器 | `.cursor/rules` 的替代品 |
| `https://cursor.com/codebase/{owner}/{repo}` 里的 `{owner}` 命名空间 | GitHub PR 上的 Bugbot check |
| 可选的 GitHub **镜像** | 自动拷走 GitHub Issues 或 Actions |

本站近亲：Cloud Agents 可以在 **Origin remote** 上 clone、开分支、commit、push、开 PR。Bugbot / Cursor Review 在 GitHub PR 上留言，**不必搬存储**。

## 谁能用

Origin 代码存储只在 **Pro、Teams、Enterprise**。免费计划没有。

**隐私：** Origin 跟随 **namespace owner**（拥有该仓库的团队或个人）的 [Privacy Mode](https://cursor.com/help/security-and-privacy/privacy.md)。

## 启用 Origin

必须先有人**占用 codebase 名**。这个名字就是 `{owner}`。

1. 打开 [cursor.com/codebase](https://cursor.com/codebase)
2. 选 **Get Started** 走完设置
3. 任意团队成员都可以占用这个名字
4. 管理员可随时在 Dashboard 关掉团队的 Origin
5. 名字占用后，管理员在 [codebase settings](https://cursor.com/docs/origin/codebase-settings.md#permissions) 建仓库并授权

仓库列表提供 **Find repo...**、**New**、**Sync from GitHub**。图标区分 Origin 托管仓和从 GitHub 同步的仓。

## 创建仓库

官方：[Create a repository](https://cursor.com/docs/origin/create-repository)。

从 [cursor.com/codebase](https://cursor.com/codebase)：

1. 选 **New**
2. 填 **Repo Name**
3. 可见性：**Internal**（能进团队 codebase 的人）或 **Private**（只给被授权的人）
4. **Create Repo**
5. 从绿色 **Code** 按钮复制 clone URL

代码已经在 GitHub，用 **Sync from GitHub**，不要用 **New**。

Cursor agent 可以在任务里代建 Origin 仓，权限跟你的 Cursor 账号一样。Cloud agents 可以对**已有** Origin 仓：clone、开分支、commit、push、开 PR。

空仓第一次 push：

```bash
git clone https://origin.cursor.com/{owner}/{repo}.git
cd {repo}
# add your files
git add .
git commit -m "Initial commit"
git push -u origin main
```

本地已有项目：

```bash
cd your-project
git remote add origin https://origin.cursor.com/{owner}/{repo}.git
git push -u origin main
```

## Clone、push、pull

官方：[Clone, Push & Pull](https://cursor.com/docs/origin/git)。HTTPS remote：

```text
https://origin.cursor.com/{owner}/{repo}.git
```

```bash
git clone https://origin.cursor.com/acme/checkout.git
```

第一次 git 操作前先登录 Origin CLI（若还没登过）：

```bash
curl -fsSL https://downloads.cursor.com/origin/install.sh | sh
origin auth login
origin --version
```

安装器把二进制放到 `~/.local/bin/origin`。若提示 `command not found: origin`，把该目录加进 `PATH`。登录同时配好 git credential helper。

评估期同时推 GitHub 和 Origin：

```bash
git remote set-url --add --push origin git@github.com:acme/checkout.git
git remote set-url --add --push origin https://origin.cursor.com/acme/checkout.git
```

要完整历史，优先**镜像**。

## 镜像 GitHub 仓库

官方：[Mirror a GitHub repository](https://cursor.com/docs/origin/mirror-github)。

**前提：** Pro / Teams / Enterprise 的 Origin 权限；已接 [Cursor GitHub app](https://cursor.com/docs/integrations/github)；源仓要有 **GitHub admin**。

1. 打开 [cursor.com/codebase](https://cursor.com/codebase)
2. **Sync from GitHub**
3. 选组织和仓库
4. 确认同步

| 会同步 | 不同步 |
|--------|--------|
| Git 历史、分支、tag | GitHub Issues |
| 可在 Origin 浏览 / 搜索的代码 | GitHub Actions 工作流和 secrets |
| PR（**双向**同步） | |
| 持续更新，保持 Origin 新鲜 | |

镜像仓上，Origin 是镜像，GitHub 仍是**事实源**。推到 Origin remote 会传到 GitHub。Origin 上开的 PR 会同步回 GitHub。

**Detach from GitHub**（Settings → General → Danger Zone）停止同步，Origin 变成事实源。GitHub 上的仓库不受影响。

如果只要 GitHub PR 上的审查评论，用 [Cursor Review](https://cursor.com/docs/cursor-review/overview) 或 [Bugbot](https://cursor.com/docs/bugbot)，不必搬存储。

## Pull requests

官方：[Pull requests](https://cursor.com/docs/origin/pull-requests)。

```bash
git checkout -b my-change
git push -u origin my-change
```

然后在 **Code** 页走创建 PR 流程。Cloud agents 也可以在任务里开 Origin PR。

每个 PR 四个页签：**Activity**、**Commits**、**Checks**、**Files Changed**。可以指定审人、行评、在审查和 CI 通过后合并。

**直接在 Origin 创建的仓**上的 PR 只留在 Origin，不会镜像到别处。

## Origin CLI 和 Cursor CLI

| 二进制 | 安装 | 干什么 |
|--------|------|--------|
| **`origin`** | `curl -fsSL https://downloads.cursor.com/origin/install.sh \| sh` | 登录、建 / 删仓、git helper |
| **`agent`** | `curl https://cursor.com/install -fsS \| bash` | 终端里的 Cursor 编程 Agent |

```bash
origin repo create my-project
origin repo delete acme/my-project
origin update
```

`origin repo create` 不含斜杠时建在你账号的 namespace。`origin repo delete` 必须写全 `org/name`。命令参考：[Origin CLI commands](https://cursor.com/docs/origin/cli/reference/commands)。

## 什么时候用 Origin

- 要 Cursor 托管的存储、浏览、搜索、PR，而不只是 GitHub 评论机器人
- Cloud Agent 或 Automation 要对 Origin remote 干活
- 在评估 GitHub 镜像，让 Agent 用 Origin 浏览 + PR 同步

策略禁止第二个托管、或只需要 Bugbot 评论时，继续只用 GitHub。

## 常见陷阱

| 陷阱 | 正确做法 |
|------|----------|
| 把 Origin 当成「更多 Rules」 | 它存的是**代码**。Rules 仍在 `.cursor/rules` / `AGENTS.md` |
| 指望免费计划 | 只有 Pro / Teams / Enterprise |
| 在 **legacy** privacy 上启用 | 先切到 Privacy Mode |
| 想调 forge CLI 却敲了 `agent` | 装 **`origin`** |
| 镜像是为了 Issues / Actions | 那些留在 GitHub |
| Detach 之后还以为 Origin push 会到 GitHub | Detach 后 Origin 才是事实源 |

## 下一步

- [Cloud Agents](./cloud-agents) — Agent 可以对 Origin remote 干活
- [Cursor CLI](./cursor-cli) — 编程 Agent 二进制是 `agent`，不是 `origin`
- [Security Agents](./security-agents) 与 [PR Routing](./pr-routing) — 代码托管之后的审查 / 路由
- 官方：[Origin](https://cursor.com/docs/origin)、[Create](https://cursor.com/docs/origin/create-repository)、[Mirror](https://cursor.com/docs/origin/mirror-github)、[Integrations](https://cursor.com/docs/origin/integrations)
