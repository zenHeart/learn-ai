# Connectors 连接器

> Connectors 让 Claude 直接接入你的应用和服务——读取数据、执行操作、触发工作流——全部在对话中完成，无需切换工具。这是将 Claude 从"问答助手"升级为"执行代理"的核心能力。

## 什么是 Connectors

Connector（连接器）是 Claude 与外部服务之间的授权通道。连接后，你可以在对话中直接让 Claude：

- 在 Gmail 里搜索邮件、起草回复
- 在 Google Calendar 上查看空档、新建会议
- 在 Notion 里创建或更新页面
- 在 Linear / GitHub 里提 Issue、查看 PR
- 在 Slack 里发消息、搜索历史记录

**底层实现**：Connectors 基于 [Remote MCP（Model Context Protocol）](https://code.claude.com/docs/zh-CN/build-with-claude/mcp)构建，每个连接器本质上是一个运行在云端的 MCP 服务器，向 Claude 暴露一组工具（Tools）。

**适用范围**：claude.ai 网页版、iOS/Android App、Claude Desktop（Cowork 和 Code 标签）、Claude Code CLI、API。

---

## 连接器类型

### 预置连接器（Pre-built Connectors）

官方内置，一键授权即用，无需配置。目前已有 50+ 个，覆盖以下类别：

| 类别 | 代表服务 | 核心能力 |
|------|---------|---------|
| **Google Workspace** | Gmail、Google Calendar、Google Drive | 读邮件/起草、查日程/建会议、搜索文件 |
| **Microsoft 365** | Outlook、Teams、SharePoint、OneDrive | 搜索邮件/文档、查看会议、浏览 Teams 消息 |
| **项目管理** | Linear、Asana、Jira、Notion | 创建/查询 Issue、更新任务、搜索页面 |
| **代码托管** | GitHub | 查看 PR、搜索代码、创建 Issue |
| **沟通协作** | Slack | 发消息、搜索历史、读取频道 |
| **设计工具** | Canva、Figma | 查看设计文件（部分支持交互渲染） |
| **CRM / 销售** | Salesforce、HubSpot | 查询记录、更新联系人 |

> **Interactive 标记**：部分连接器支持在对话中直接渲染动态界面（看板、仪表盘、设计稿预览），而不仅是文字回答。

### 自定义连接器（Custom Connectors / Remote MCP）

如果你的工具没有预置连接器，可以自己搭建：

1. 开发一个遵循 MCP 协议的服务器（支持 HTTP + SSE）
2. 部署到**公网可访问**的地址（Anthropic 云端需要能 reach 到它）
3. 在 Claude 设置中填入你的 MCP Server URL 和 OAuth 凭证
4. 完成后即可在对话中使用你自定义的工具

> 内网服务需要将 Anthropic 的出口 IP 加入防火墙白名单。参考 [Remote MCP 开发文档](https://code.claude.com/docs/zh-CN/build-with-claude/mcp)。

---

## 快速上手

### 步骤一：进入连接器目录

**路径 A（对话内）**：点击对话框左下角的 **`+`** 按钮 → 选择 **Connectors**

**路径 B（设置页）**：`Settings → Customize → Connectors` → 浏览目录

### 步骤二：连接服务

1. 找到目标连接器，点击查看其能力说明和读/写权限详情
2. 点击 **Connect**（预置）或 **Install**（远程 MCP）
3. 完成 OAuth 授权流程（跳转到对应服务的登录页）
4. 授权完成后，连接器出现在你的已安装列表

### 步骤三：在对话中启用

连接器安装后**不会自动在所有对话中激活**。在需要使用的对话里：
- 点击 **`+`** 按钮，勾选要启用的连接器
- 或者直接描述任务——Claude 会提示你是否启用相关连接器

### 步骤四：直接描述任务

连接器激活后，用自然语言表达需求即可：

```
帮我查一下本周 Gmail 里来自 acme.com 的邮件，
提取所有提到交货日期的内容，
然后在 Notion 里新建一个"Acme 跟进"页面记录下来。
```

Claude 会自动调用 Gmail 连接器搜索邮件，再调用 Notion 连接器创建页面。

---

## 主要连接器详解

### Google Workspace

**Gmail**
- 用自然语言搜索邮件（"上周 Alice 发给我关于预算的邮件"）
- 起草邮件（Claude 生成草稿，**需要你手动发送**，Claude 不能代为发送）
- 读取附件信息、管理标签和线程
- 列出已保存草稿

**Google Calendar**
- 查看个人和共享日历的事件
- 新建、编辑、删除活动，支持设置重复规则
- 查找多位参与者的共同空档
- 管理受邀人列表、响应邀请

**Google Drive**
- 搜索并检索文档内容（仅提取文本，不处理图片）
- 将文档添加到当前对话或 Project
- 查看文件权限和最近变更
- 将 Claude 生成的文件直接保存到 Drive（需开启代码执行）

### Microsoft 365

以**只读**方式访问，Claude 可以检索和分析，但**不能修改、删除或新建**内容：

- **Outlook**：搜索邮件线程，跟踪项目进展和客户反馈
- **Teams**：读取你参与的频道消息和聊天记录
- **SharePoint / OneDrive**：跨站点搜索并分析文档
- **Calendar**：读取会议摘要和参与者信息，为即将到来的会议做准备

### GitHub

- 搜索代码库、查看文件内容
- 创建 Issue、查看 PR 状态和评论
- 搜索提交历史

> Claude Code 用户注意：CLI 里通过 MCP 连接 GitHub 功能更全，支持创建 PR、合并等写操作。

### Slack

- 搜索频道历史消息
- 发送消息到指定频道或 DM（**需要你确认后执行**）
- 读取线程回复

### Linear / Asana / Jira

- 创建、查询、更新 Issue 和任务
- 搜索项目看板
- 获取 Sprint 状态

---

## 连接器与 Projects 组合使用

连接器在 **Projects** 里使用效果最佳：

1. 在 Project 里连接 Google Drive，Claude 可持续访问该项目的所有文档
2. 在 Project 里连接 Linear，Claude 记住项目的 Issue 规范和优先级标准
3. 结合 Project 的自定义指令，统一工作流规范

**示例**：创建一个"Q2 产品规划"Project，连接 Google Drive（需求文档）+ Linear（任务管理），让 Claude 成为能同时读取需求并同步创建任务的项目助手。

---

## 连接器 + 定期任务

连接器可以和[定期任务](./cowork#定期任务自动化)配合，实现自动化工作流：

```
每周一早上 9 点：
- 读取上周 Gmail 里的客户邮件（Gmail 连接器）
- 汇总关键问题和待处理事项
- 在 Notion 创建"客户周报"页面（Notion 连接器）
- 发送 Slack 通知给团队（Slack 连接器）
```

云端定期任务（通过 `/schedule` 创建）会携带你已授权的连接器权限，无需电脑开机。

---

## 权限与安全

### 权限模型

- **每个连接器独立授权**：连接 Gmail 不等于授权 Calendar，各服务单独 OAuth
- **最小权限原则**：Claude 只能访问你账户中你自己有权限访问的内容
- **读/写区分**：连接器详情页明确标注哪些操作是只读、哪些会写入数据
- **操作前确认**：涉及写操作（发消息、创建 Issue、修改日历）Claude 会在执行前展示操作计划

### 团队和企业注意

- **Team / Enterprise** 计划：组织 Owner 需要在 **Organization Settings** 中先启用 Connectors 功能，成员才能授权使用
- **数据传输**：所有连接器数据传输均加密
- **断开连接**：随时可以在 `Settings → Connectors` 中撤销某个服务的授权

### 最佳实践

- 定期检查已连接的服务，断开不再使用的连接器
- 不要在共享 Project 中开启包含个人邮件的连接器（其他成员可能触发查询）
- 对于包含敏感数据的服务（如财务系统），使用专用账号而非个人主账号授权

---

## 常见问题

**Q：Connectors 需要额外付费吗？**

不需要。Connectors 功能包含在 Pro（及以上）订阅中，无额外费用。

**Q：连接器能访问我在服务里所有的数据吗？**

只能访问你自己有权限访问的数据。连接 Google Drive 后，Claude 只能读取你有访问权限的文件，无法绕过原服务的权限控制。

**Q：Claude 会不会在我不知情的情况下自动操作我的服务？**

不会。涉及写操作（发邮件草稿、创建事件、发 Slack 消息）时，Claude 会先展示操作计划并等待你确认。

**Q：我的公司内网系统能接入 Connectors 吗？**

可以，通过自定义 Remote MCP 实现，但你的 MCP 服务器需要是公网可访问的（或将 Anthropic 出口 IP 加入白名单）。

**Q：连接器在 Claude Code CLI 里如何使用？**

Claude Code 通过 MCP 集成（`claude mcp add`）连接工具，与 claude.ai 的 Connectors UI 是两套入口，但底层协议相同。参见 [MCP 集成章节](./claude-code#第六部分mcp-集成)。

---

## 资源

- [连接器设置指南](https://support.claude.com/en/articles/10168395-set-up-claude-integrations)
- [Google Workspace 连接器](https://support.claude.com/en/articles/10166901-use-google-workspace-connectors)
- [Microsoft 365 连接器](https://support.claude.com/en/articles/12542951-enable-and-use-the-microsoft-365-connector)
- [自定义 Remote MCP 连接器](https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp)
- [预置 Web 连接器列表](https://support.claude.com/en/articles/11176164-pre-built-web-connectors-using-remote-mcp)
- [Connectors 完整集合](https://support.claude.com/en/collections/15399129-connectors)
