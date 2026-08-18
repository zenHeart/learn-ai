# ChatGPT Sites

> 这是一份**教程**——把一句提示词（或兼容的本地项目）变成**托管**网站或应用。Sites 是和 ChatGPT Work 并列的公开测试产品，不是脚注。每个部署 URL 都是生产。
>
> 官方落地页：[learn.chatgpt.com/codex/sites](https://learn.chatgpt.com/codex/sites)。文档：[Sites](https://learn.chatgpt.com/docs/sites)。管理：[chatgpt.com/sites](https://chatgpt.com/sites)。

## 先决条件

| 需要 | 要求 |
| --- | --- |
| 账号 | 套餐含 Sites。测试期限额全 Sites 共用——[定价](https://learn.chatgpt.com/docs/pricing) |
| 入口 | ChatGPT **网页**或**桌面应用**。CLI 和 IDE **没有** Sites 管理界面 |
| 可选 | 要发布的本地项目；仍可用 Codex CLI / IDE 改源码 |

可用性取决于套餐、地区和 workspace。撞上限会挡住新建、加存储或高流量公网站点；已有站点仍能改。

**学习目标**：从提示词开一个 Site；部署前先 save version；选访问范围；分清 D1 / R2 和不用存储。

**非目标**：把 Sites 当生产前端栈；Claude Design 那种品牌导入（这边没有这个产品）；CLI 沙箱（[CLI](./codex-cli)）。

## Sites 是什么，不是什么

Sites 让 ChatGPT **创建、托管、改、分享**网站、Web 应用和游戏。提示词里写 `website` 或 `@Sites` 就会进这条工作流。Site 是持久托管产物，创建它的 Work 会话结束了它还在。它**不是** ChatGPT Project。

它**不是**：

- Claude Design。没有「从代码库抽品牌规范再交接实现」的官方产品。
- 预发环境。部署 URL 对所选受众就是线上。
- Codex CLI / IDE 面板。创建、保存、部署、管理走网页或桌面。CLI / IDE 只改、测本地源码。

Work 仍是知识工作代理。本页是 Sites 产品。Work 里的短注在 [ChatGPT Work](./chatgpt-work#sites需要托管页面时)。

## 从哪打开

| 入口 | 怎么走 |
| --- | --- |
| 网页 | **More → Sites**，或 [chatgpt.com/sites](https://chatgpt.com/sites) |
| 桌面 | ChatGPT 桌面应用里打开 **Sites** |
| CLI / IDE | 没有管理界面。本地项目在那边改；发布走网页或桌面 |

## 第一个 Site（15 分钟）

### 1. 写清受众和结果

```text
Build a project request dashboard for my operations team. Let team members
submit requests, see who owns each one, update the status, and filter the list.
Require people to sign in with their workspace account, and keep the request
data saved between visits.
```

### 2. 审行为，不只看截图

查内容、数据处理、登录 / 未登录路径。

### 3. 改

直接说要改什么。证据是文件或截图就附上。

网页预览里 **Edit → Describe website edits**。需要额外上下文就用 **Screenshot** 或 **Add files and more**。

### 4. 先 save version，再 deploy

桌面 / 本地项目分两步：

1. **Save a version** — 可审候选。本地源码项目会绑到这次构建用的 Git commit。
2. **Deploy a version** — 发布该候选，给出生产 URL。

要先审，就让 ChatGPT **save a version without deploying**。

### 5. 用最窄的受众分享

新 Site 默认只有所有者和 workspace 管理员能看，直到你改访问。

## 项目、版本、`.openai/hosting.json`

桌面 / 本地项目里，Sites 把关联和可选存储绑定名写在 `.openai/hosting.json`。新 starter 可能还没有 `project_id`，托管建好后才会补。

```json
{
  "project_id": "<project-id>",
  "d1": "DB",
  "r2": null
}
```

**不要**把密钥写进这个文件。托管环境变量在 Site 的 **Settings**。本地 `.env` / `.env.example` 只对齐键名。

发布已有兼容应用：

```text
Deploy this project with Sites. Check whether it is compatible, make any
required changes, and give me the deployment URL.
```

## 选站点形态

| 需求 | 向 Sites 要 |
| --- | --- |
| 落地页 / 内容站 | 除非必要，不要持久应用状态 |
| 记录、分数、进度 | **D1**（关系库） |
| 上传（图、文档、媒体） | **R2**（对象存储） |
| 上传 + 可搜元数据 | D1 + R2 |
| 内部、当前 workspace 用户 | Workspace 身份 |
| 公网登录 | 打开认证的 Site |

主题开关不要持久存储。用户刷新后还要在的数据才要。

## 访问、Sign in with ChatGPT、域名

分享让人**访问**，不让人编辑。

常见选项（看账号和 workspace）：所有者 + 管理员；指定用户或组；workspace 内所有人；互联网任何人（仅当公网发布打开）。企业默认**关**公网发布。

Workspace 限制的 Site 已经用 ChatGPT 身份。公网站点可以继续开放，并加上可选 **Sign in with ChatGPT**：

```text
Add Sign in with ChatGPT to this public Site. Keep the Site available to
signed-out visitors. After they sign in, greet them with their full name
when available, or their email address otherwise. Keep authorization
decisions in server-side code.
```

平台路径：`/signin-with-chatgpt`、`/signout-with-chatgpt`。身份在 `oai-authenticated-user-email` 和可选的 `oai-authenticated-user-full-name`。授权放服务端。

自定义域名（可用时）：你已经拥有 apex 或子域；Sites 不代注册。企业上线时不可用。加上 Sites 给出的 DNS，等一会儿，刷新状态。

## 分析和下线

流量自动记，不用嵌分析 SDK：独立访客和 PV 随时间变化。打开 Site → **More actions → Analytics**。企业 workspace 拥有的 Site 暂无分析。

不下线删除：收紧分享，确认旧受众打不开。

永久删除：**Delete site** → 输入 slug → **Permanently delete**。不能恢复。

## 限制和不支持的用途

Sites 跑在受支持的运行时。部分框架、私网、数据库、后台服务、托管形态不支持。

上线时不支持数据驻留或推理驻留——包括站点代码、D1 / R2、产物和日志。

**NEVER** 用 Sites 处理 PHI、卡数据、13 岁以下（或当地数字同意年龄）儿童、金融交易、恶意软件、钓鱼、假冒，或其它违反政策的用途。现行政策：[Creating and managing ChatGPT Sites](https://help.openai.com/en/articles/20001339)。

## 常见陷阱

| 陷阱 | 结果 | 改做 |
| --- | --- | --- |
| 把部署当「预览」 | URL 就是生产 | 先 save version，审完再 deploy |
| 在 CLI 里找 Sites | 没有管理界面 | 网页或桌面 |
| 密钥写进提示词或 `hosting.json` | 泄露 | 托管密钥走 Site **Settings** |
| 把 Sites 当生产应用平台 | 运行时 / 驻留 / 政策限制 | 给内部工具和测试；真生产放别处 |
| 把 Site 和 ChatGPT Project 搞混 | 列表和生命周期都不对 | 去 [chatgpt.com/sites](https://chatgpt.com/sites) |

## 实际用例

前端组要一块内部需求板：写清受众，要求 workspace 登录，要 D1 让行能留下来，先 save version，让同事打开 URL，再 deploy。长寿命组件库在仓库里用 [Codex](./codex-cli) 写；Sites 只托管壳，不当设计系统。

展示（提示词和线上应用）：[developers.openai.com/showcase](https://developers.openai.com/showcase)。

## 下一步

1. Work vs Codex vs Sites → [学习地图](./)
2. Work 代理（PPT、插件、定时） → [ChatGPT Work](./chatgpt-work)
3. 本地源码 + review pane → [Code review](https://learn.chatgpt.com/docs/code-review?surface=app)

## 官方来源

- [Sites（落地页）](https://learn.chatgpt.com/codex/sites)
- [Sites（文档）](https://learn.chatgpt.com/docs/sites)
- [chatgpt.com/sites](https://chatgpt.com/sites)
- [Creating and managing ChatGPT Sites](https://help.openai.com/en/articles/20001339)
- [隐私 / 数据保护](https://help.openai.com/en/articles/20001340)
