# Codex Remote

> 这是一份**教程**——把 ChatGPT 手机应用和一台 Mac / Windows 主机配对，然后在手机上启动、带方向、审批、审 Codex 任务。**干活的是那台已连接电脑**。Remote 不是 Cloud。
>
> 官方落地页：[learn.chatgpt.com/codex/remote](https://learn.chatgpt.com/codex/remote)。安装与安全：[Remote connections](https://learn.chatgpt.com/docs/remote-connections)。

## 先决条件

| 需要 | 要求 |
| --- | --- |
| 主机 | 最新 [ChatGPT 桌面应用](https://learn.chatgpt.com/docs/app)，macOS 或 Windows，醒着且在线 |
| 手机 | 最新 ChatGPT iOS / Android，能看到 **Remote** |
| 账号 | 两端同一 ChatGPT 账号**和** workspace |
| 权限 | 该账号有 Codex；企业管理员可能要打开 Remote Control |

可用性取决于放量和 workspace 设置。不能从 CLI 或 IDE 发起配对。

**学习目标**：一对一配对；启动或续上任务；审批一条命令；看 diff；明白主机必须醒着。

**非目标**：托管环境（[Cloud](./codex-cloud)）；`codex app-server` JSON-RPC（[App Server](https://learn.chatgpt.com/docs/app-server)）；桌面 Work 与 Codex 对照（[Work](./chatgpt-work)）。

## Remote 是什么，不是什么

Remote 是**控制面**。手机发提示词、审批和追问。主机提供仓库、shell、插件、Computer Use、浏览器、凭证和沙箱。

```
手机（ChatGPT mobile · Remote）
        │  提示词 / 审批 / 审阅
        ▼
主机（ChatGPT desktop · Mac 或 Windows）
        │  文件、shell、插件、Computer Use
        ▼
可选：另一台机器上的 SSH 项目
```

它**不是**：

- [Codex Cloud](./codex-cloud)。Cloud 跑在 OpenAI 托管机上，不需要你的笔记本。
- 公网监听。配对走中继；不要把 `codex app-server` 暴露到互联网。
- 在你还要用的同一 Windows 会话里做 Computer Use。Windows 上 Computer Use 会占前台。

## 第 1 步 — 在主机上开始设置

在 Mac 或 Windows 上：

1. 打开 ChatGPT 桌面应用。
2. 进入 **Settings → Connections → Control this Mac or PC**。
3. 选 **Set up** 或 **Add**。
4. 批准远程访问，完成验证。

只配对你拥有且信任的设备。

## 第 2 步 — 扫二维码

用手机扫码。登录**同一**账号和 workspace。需要的话走完 MFA / SSO / passkey。主机就会出现在 **Remote** 里。

每台手机和每台主机都要分别配对。2026-06-08 之后没用过的旧连接，升级两端应用后重新配对。

## 第 3 步 — 从手机干活

打开 **Remote**，选已连接电脑，开新任务或续上旧的。

主机必须**醒着且在线**。关桌面应用、睡眠、掉网，Remote 就停。

| 主机细节 | 约束 |
| --- | --- |
| Mac 笔记本，开盖，插电 | Remote 可以保持 |
| Mac 笔记本，合盖 | 还要外接显示器 |
| 选择 **Sleep** | Remote 停 |
| Windows + Computer Use | 会话保持解锁；Computer Use 占前台 |

## 在手机上做什么

1. **看任务**，包括什么时候需要你输入。
2. **审批**命令和动作，Codex 才在那台主机上继续。
3. **审**回复、改动文件、diff、测试结果。
4. **开**针对某台已连接电脑和项目的新任务。

主机上的沙箱、审批策略和组织设置仍然生效。

## Remote vs Cloud vs app-server

| | Remote | Cloud | `codex app-server` |
| --- | --- | --- | --- |
| 活跑在哪 | 已配对的 Mac / Windows（或其 SSH 项目） | OpenAI 托管环境 | 你自己拉起的进程，通常给自研客户端 |
| 笔记本要醒着 | **要** | 不要 | 取决于那个进程 |
| 典型入口 | ChatGPT 手机 **Remote** | [chatgpt.com/codex](https://chatgpt.com/codex) | `codex app-server --listen …` |
| 何时用 | 手机审批 / 带方向本机会话 | 并行托管任务 | 把 Codex 嵌进产品 |

协议：[Codex App Server](https://learn.chatgpt.com/docs/app-server)。SSH 项目和会话交接：[Remote connections](https://learn.chatgpt.com/docs/remote-connections)。

## 常见陷阱

| 陷阱 | 结果 | 改做 |
| --- | --- | --- |
| 两端 workspace 不同 | 主机不出现 | 同一账号**和** workspace |
| 让笔记本睡觉 | 会话掉线 | 保持主机醒着；或改用 [Cloud](./codex-cloud) |
| 以为有 Cloud 那种隔离 | 手机在开**你的**机器 | 不要把 Remote 当沙箱 |
| 把 app-server 暴露到公网 | 放量期默认可能未认证 | 用官方 Remote 配对，或 `wss://` + 认证；优先 VPN |
| 在 CLI 里找配对 | 没有这条路径 | 从桌面应用开始 |

## 实际用例

下班前在桌面 Codex 里开一轮 test-and-fix。火车上打开 **Remote**，批一次 `pnpm test`，看 diff。笔记本要睡就别用 Remote——合盖前把活送到 [Cloud](./codex-cloud)。

## 下一步

1. 配对、SSH、交接、排错 → [Remote connections](https://learn.chatgpt.com/docs/remote-connections)
2. 合盖也要跑的托管任务 → [Cloud](./codex-cloud)
3. 桌面 Chat / Work / Codex → [Work](./chatgpt-work) · [产品线](./codex-ai)

## 官方来源

- [Codex Remote（落地页）](https://learn.chatgpt.com/codex/remote)
- [Remote（文档）](https://learn.chatgpt.com/docs/remote)
- [Remote connections](https://learn.chatgpt.com/docs/remote-connections)
- [ChatGPT desktop app](https://learn.chatgpt.com/docs/app)
- [App Server](https://learn.chatgpt.com/docs/app-server)
