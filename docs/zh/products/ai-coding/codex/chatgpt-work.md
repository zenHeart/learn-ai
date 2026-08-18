# ChatGPT Work

> ChatGPT Work 是把一件事**做到可审结果**的代理模式：调研、做表、写稿、建站点、定期更新。它不是聊天，也不是写代码的 Codex。
>
> 官方原文：「ChatGPT Work is a way to delegate real work to ChatGPT。」入口：[Get started with ChatGPT Work](https://learn.chatgpt.com/docs/get-started-with-work)。

## 先决条件

| 项 | 要求 |
| --- | --- |
| 账号 | 任意 ChatGPT 套餐；具体入口和额度以[定价页](https://learn.chatgpt.com/docs/pricing)为准 |
| 网页 | [chatgpt.com](https://chatgpt.com/) 的 Work 开关 |
| 桌面 | [ChatGPT 桌面应用](https://learn.chatgpt.com/docs/app)（macOS / Windows；Linux 为预览） |
| 本地文件 / 本机应用 | 桌面应用里选 **Work locally** |
| 关电脑还能跑 | 选 **Cloud**，或直接在网页上用 Work |

**学习目标**：分清 Chat / Work / Codex；能交一件有明确产出的任务；知道本地和云端差在哪；会用插件和定期任务。

**非目标**：本页不讲 CLI 沙箱配置（见 [Codex CLI](./codex-cli)），不写价格数字（见 [套餐与访问](./chatgpt-plus)）。

## Work 是什么，不是什么

官方把同一桌面应用切成三种工作方式：

| 选 | 你要的是 | 例子 |
| --- | --- | --- |
| **Chat** | 问答、头脑风暴、短草稿 | 比方案、改一封邮件、澄清需求 |
| **ChatGPT Work** | 有结果可审的任务 | 八页 PPT、对比表、简报、定期议程 |
| **Codex** | 开发者视图和仓库级改动 | 修 bug、跑测试、审 PR、实现功能 |

Work 会拆步骤、拉文件和插件、做到一份你能打开检查的产出。你可以跟进度、改方向、在关键动作上点批准。

它**不是**：

- 替代 Codex 的编程界面（没有 PR 侧栏、默认隐藏 Git / shell 细节）
- 替代 Chat 的闲聊入口（短问题用 Chat 更省额度）
- 独立安装的第三个应用（2026-07-09 起，Work 和 Codex 都在 [ChatGPT 桌面应用](https://learn.chatgpt.com/docs/app)里）

> 官方说明：若你以前用 Codex 做非编程工作，可以继续留在 Codex，也可以改用 Work。能力重叠，界面不同——Work 面向日常知识工作。Work 与 Codex **共用用量额度**。

## 核心能力

| 能力 | 实际能做什么 | 官方页 |
| --- | --- | --- |
| 调研与分析 | 搜索、浏览、比来源、读文件、汇总 | [Use ChatGPT](https://learn.chatgpt.com/docs/use-chatgpt) |
| 文件与工具 | 上传、Projects、Library、Memories、插件 | [Projects](https://learn.chatgpt.com/docs/projects) · [Plugins](https://learn.chatgpt.com/docs/plugins) |
| 成品文件 | 文档、演示、表格、PDF，预览后再下 | [Work with files](https://learn.chatgpt.com/docs/artifacts-viewer) |
| 视觉与站点 | 生图、可视化、用 **Sites** 托管网页/应用 | [Sites](https://learn.chatgpt.com/docs/sites) |
| 浏览器与本机 | 内置浏览器、Chrome 扩展、Computer Use、Appshots | [Browser](https://learn.chatgpt.com/docs/browser) |
| 长任务 | 子代理拆分、长时间运行、中途改方向 | [Long-running work](https://learn.chatgpt.com/docs/long-running-work) |
| 重复工作 | 定期任务 + Skills | [Scheduled tasks](https://learn.chatgpt.com/docs/automations) |

能力随套餐、平台、地区、放量和 workspace 设置变化。管理员可以关 Work、插件、浏览器和网络。

## 快速上手

### 1. 切到 Work

网页或桌面应用里打开切换器，选 **Work**。好任务有三件事：明确产出、少量源材料、你能审的结果。

### 2. 选本地还是云端

桌面应用的输入框有 **Work locally**。若出现 **Cloud**，按任务选：

| | **Cloud** | **Work locally** |
| --- | --- | --- |
| 跑在哪 | OpenAI 托管的隔离环境 | 你的电脑 |
| 关应用 / 关机 | 能继续，可从网页或手机接着看 | 停 |
| 本地文件 / 本机应用 | 不能直接摸；靠上传、Project、已授权插件 | 可以 |
| 网页 Work | 网页上的 Work **就是**云端 | 仅桌面 |
| 适合 | 长任务、定时盯网页、跨设备续跑 | 整理本机目录、操控本机应用 |

云端定时任务不依赖电脑醒着。需要本机文件的定时任务，电脑要开机且桌面应用要开着。

### 3. 写清结果，而不是写清心情

差的提示：

```
帮我做一份客户调研 PPT。
```

官方推荐的形状：产出、来源、约束、何谓够好、何时停下来给你审。

```
审阅附件里的访谈笔记和问卷结果。为产品管理层会做八页演示。
只讲三个最常见的客户问题，每条附证据，发现和建议分开，证据不足的主张标出来。
源文档用 @Google Drive。先交一版草稿给我审，不要当成定稿。
```

## 官方建议先试的三件事

### 做演示稿

```
根据附件材料，为 [audience] 做八页演示。抓住主线，附证据，需要人审的地方标出来。先交草稿。
```

### 做对比表

```
为 [decision] 做一张对比表。用附件笔记和材料。列出最重要的标准、给每个选项打分、标风险和缺信息，并加一页摘要写推荐和下一步。
```

### 做定期更新

```
每周一早上，查看 @Slack 和 @Google Drive 里 [project] 的新更新。
刷新会议议程：决策、阻塞、负责人、未决问题。分享前先把草稿发给我。
```

定时任务的管理入口是侧栏 **Scheduled**。细节见 [Scheduled tasks](https://learn.chatgpt.com/docs/automations?surface=app)。

## 插件：接到你真正在用的工具

插件是 Work 侧对位 Claude Connectors 的东西：Slack、Google Drive、SharePoint、日历、邮件、CRM、项目跟踪。

1. 左侧 **Plugins** 打开目录并安装。
2. 提示词里用 `@插件名` 点名。
3. 可用性取决于套餐、workspace 和插件本身。

Enterprise / Edu 默认关插件；Business 默认开。管理员放开不等于你的账号已经授权——还要自己打开并登录。

编程仓库、CI、自建 MCP 仍走 [项目集成](./integration)，不要和 Work 插件混成一件事。

## Sites：需要托管页面时

[Sites](https://learn.chatgpt.com/docs/sites) 是公开测试：让 ChatGPT 创建、托管、改、分享网站、内部工具或小应用，不必另搭部署栈。网页入口 [chatgpt.com/sites](https://chatgpt.com/sites)。完整教程：[Sites](./sites)。

它**不是** Claude Design 那种「从代码库抽品牌规范再交接实现」的设计产品。它是托管工作流。

约束（官方原文级）：

- 每个部署 URL 都是生产环境。要先审，就让它 **save a version without deploying**。
- CLI / IDE **没有** Sites 管理界面；创建和发布在网页或桌面应用。
- 企业 workspace 默认关公网发布。
- 不支持数据驻留；不要用它处理 PHI 或卡数据。

前端工程师的用法：先在仓库里用 Codex 写和测，再让 Sites 发布；或用 Work 快速出内部看板，不要把它当成生产前端栈。

## 桌面上 Work 和 Codex 怎么选

官方对照（[Use ChatGPT](https://learn.chatgpt.com/docs/use-chatgpt#compare-chatgpt-work-and-codex-on-desktop)）：

| 差异 | ChatGPT（含 Work） | 桌面里的 Codex |
| --- | --- | --- |
| 从哪进 | 选 **ChatGPT**，再切 **Work** | 产品选择器里选 **Codex** |
| 看到的会话 | 网页/手机上的 Chat + Work | Codex 会话和开发项目 |
| 技术细节 | 默认藏起 Git / shell | 显示 diff、评审视图 |
| 说话方式 | 偏非技术、成品导向 | 可以很技术 |
| PR 面板 | Work 里没有 | 开启后可用 |

写代码、看 diff、处理 PR → Codex。要一份别人能打开的 PPT / 表 / 站点 → Work。

## 安全边界（够日常用的那几条）

- **云端浏览器**不是你电脑上的 Chrome：没有本地标签、扩展、历史、密码，也不能登录或付款。做不到的步骤它会停。
- **本机 Work** 能摸到你授权的本地文件和应用。不要把密钥目录交给它。
- 关键动作（花钱、改账号、对外发送）前先看批准提示。
- 管理员限制高于个人开关。「允许公网」不能盖过 workspace 策略。

企业侧的隔离、保留和合规见 [ChatGPT Work Overview](https://learn.chatgpt.com/docs/enterprise/chatgpt-work-overview)。

## 常见陷阱

| 陷阱 | 实际会发生什么 | 正确做法 |
| --- | --- | --- |
| 短问题也开 Work | 多步代理更费额度 | 问答用 Chat |
| 在 Work 里改仓库并指望 PR 面板 | Work 没有 PR 侧栏 | 切到 Codex |
| 关电脑还指望本地定时任务 | 任务不跑 | 不依赖本机的改 Cloud |
| 把 Sites 当预览环境 | 部署 URL 就是生产 | 先 save version，批准后再 deploy |
| 提示词里只写「做个 PPT」 | 空泛成品，证据对不上 | 写清受众、来源、停下来给你审 |
| 以为装了插件就等于已授权 | 企业默认关，还要个人登录 | 目录里启用并完成 OAuth |

## 实际用例

前端周会：Work 从 `@Slack` 和 `@Google Drive` 抽本周决策，出一页议程草稿；真正的代码改动丢给 [Codex CLI](./codex-cli) 或桌面 Codex。设计对话留在 Chat，实现会话不要混进同一条 Work 线程。

## 下一步

1. 分不清该用哪个 → 回 [学习地图](./) 的决策树。
2. 要写代码 → [Codex CLI](./codex-cli) 或 [产品线](./codex-ai)。
3. 要查套餐和 Chat 入口 → [ChatGPT 套餐与访问](./chatgpt-plus)。
4. 要把仓库接到 Agent → [项目集成](./integration)。

## 官方来源

- [Get started with ChatGPT Work](https://learn.chatgpt.com/docs/get-started-with-work)
- [Use ChatGPT](https://learn.chatgpt.com/docs/use-chatgpt)（Chat / Work / Codex 对照）
- [ChatGPT desktop app](https://learn.chatgpt.com/docs/app)
- [Scheduled tasks](https://learn.chatgpt.com/docs/automations)
- [Sites](https://learn.chatgpt.com/docs/sites)
- [Plugins](https://learn.chatgpt.com/docs/plugins)
- [ChatGPT Work Overview](https://learn.chatgpt.com/docs/enterprise/chatgpt-work-overview)（企业边界）
- [What's new](https://learn.chatgpt.com/docs/whats-new)（2026-07-09 Work 与桌面合并）
