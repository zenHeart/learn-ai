# ChatGPT Chrome 扩展

> 这是一份**教程**——让 ChatGPT 驱动**你的** Chrome 配置，从而操作你已经登录的网站。把每个页面都当不可信上下文。允许 Agent 继续之前，先审这个站。
>
> 官方落地页：[learn.chatgpt.com/codex/chrome-extension](https://learn.chatgpt.com/codex/chrome-extension)。文档：[Chrome extension](https://learn.chatgpt.com/docs/chrome-extension)。

## 先决条件

| 需要 | 要求 |
| --- | --- |
| 浏览器 | **只支持 Google Chrome**。其它 Chromium 浏览器不行 |
| 桌面 | 带 Work 或 Codex 的 [ChatGPT 桌面应用](https://learn.chatgpt.com/docs/app) |
| 商店项 | [ChatGPT Chrome 扩展](https://chromewebstore.google.com/detail/chatgpt/hehggadaopoacecdllhhajmbjkdcmajg) |

**学习目标**：装好插件 + 扩展；在当前标签开侧栏对话；从 Work / Codex 调用 `@Chrome`；配置允许 / 阻止列表；分清 Chrome 和内置浏览器。

**非目标**：Atlas（2026-08-09 已停）；Cloud Browser 登录（它用不了你的 cookie）；第二份桌面 Codex 教程（[产品线](./codex-ai)）。

## 三种浏览器，各干一件事

| 工具 | 是什么 | 何时用 |
| --- | --- | --- |
| **Chrome 扩展** | 控制**你的** Chrome，含已登录标签 | LinkedIn、Salesforce、Gmail、内部工具 |
| **内置浏览器**（`@Browser`） | 桌面应用里单独的 ChatGPT 配置 | localhost 预览、调研、别碰你的 Chrome |
| **Work 云端浏览器** | 网页上托管的、未登录浏览器 | 公开页面；没有本地标签或密码 |

任务中途可以换工具：有专用集成就用**插件**，要你的登录态就用 **Chrome**，localhost 用**内置浏览器**。

内置浏览器文档：[Browser](https://learn.chatgpt.com/docs/browser)。Atlas 已停，见 [学习地图](./)。

## 第 1 步 — 安装

桌面应用里打开 **Plugins**，安装 **Chrome**。按流程：

1. 安装 [Chrome 扩展](https://chromewebstore.google.com/detail/chatgpt/hehggadaopoacecdllhhajmbjkdcmajg)。
2. 批准 Chrome 权限提示。
3. 打开 Chrome，确认 ChatGPT 侧栏能加载。

必须用**装着扩展的那个 Chrome 配置**。换配置就要再装一次。

## 第 2 步 — 在页面旁边聊

1. 打开那个页面。
2. 点工具栏或 **Extensions** 里的 ChatGPT。macOS：`Cmd+Shift+.`。
3. 问页面，或给一个任务。

面板跟着这个标签。Chrome 里开的会话会出现在 ChatGPT 应用，应用里的最近会话也能在 Chrome 打开。

点名一个打开的标签，或把选中的文字带进对话。右键 **Ask ChatGPT** 从页面开始。

YouTube 上，有字幕时可以用带时间戳的转写。转写仍是不可信上下文。

## 第 3 步 — 从 ChatGPT 开 Chrome 任务

开一条 **Work** 或 **Codex** 会话。任务需要已登录站点时，ChatGPT 会用 Chrome。也可以显式写：

```text
@Chrome open Salesforce and update the account from these call notes.
```

Chrome 没开的话，ChatGPT 可以打开它。任务跑在 Chrome **标签组**里。

## 控制网站访问

默认按**主机名**（`example.com`）先问再动手。

| 选项 | 效果 |
| --- | --- |
| **Allow once** | 只这一次 |
| **Allow for this site** | 这个主机不再问 |
| **Allow for all sites** | 不再按站询问。风险升高 |
| **Decline** | 不用这个站 |

列表在桌面应用：**Settings → Computer Use → Google Chrome → Manage**。允许列表 = 不问。阻止列表 = 不用。从任一列表拿掉域名，就回到「再问一次」。

**Allow for all sites** 表示访问网站前不再确认。只有你信任 Agent 能碰这个 Chrome 配置里的任何标签时才选。

**浏览器历史**是另一条升高风险的单独询问。历史可能含内部 URL、搜索词、已登录设备上的活动。访问范围限于这次请求。历史**没有** always-allow。

## 数据与权限

Chrome 可能要调试器、全站数据、已登录设备上的历史、通知、书签、下载、原生消息、标签组。这些能力是为了跑浏览器工作流。ChatGPT 仍用自己的确认、允许列表和阻止列表。

Memories 跟随你的 Memories 设置。

OpenAI **不会**单独存一份完整的 Chrome 操作记录。只有进入会话上下文的浏览活动才会被保存（文本、截图、工具调用、摘要）。适用你的 ChatGPT 数据控制。除非你在场审每一条提示，否则不要把密钥送进浏览器任务。

## 排错

ChatGPT 连不上 Chrome 时：

1. 确认主机不在阻止列表。
2. 更新你还留着的每一份 ChatGPT / Codex 桌面应用。
3. 关侧栏，重启 Chrome，再开扩展。提示缺 native host 就卸了重装 Chrome 插件。
4. 应用里切到 **Work** 或 **Codex**。确认 Chrome 插件是开的。
5. 用装着扩展的那个 Chrome 配置。
6. 新开一条 Work 或 Codex 会话。
7. 重启桌面应用；最后手段是卸扩展再走一遍安装。
8. 侧栏能开但 Chrome 任务失败：`/feedback` 并带上 chat ID。

要从磁盘上传文件：Chrome → 扩展 **Details → Allow access to file URLs**，再重试任务。

## 常见陷阱

| 陷阱 | 结果 | 改做 |
| --- | --- | --- |
| 用 Edge / Arc / Brave | 扩展不受支持 | Google Chrome |
| 在个人配置上允许所有站点 | Agent 能碰银行 / 邮箱 / 管理后台 | 按站允许；单独开一个配置 |
| 想 always-allow 历史 | 官方就不提供 | 只批这一次请求 |
| 指望云端浏览器看见 Gmail | 云端浏览器是未登录的 | 用这个扩展，或用插件 |
| `@Chrome` 和 `@Browser` 搞混 | 配置错，缺 localhost 或 cookie | `@Browser` = 内置；`@Chrome` = 你的 Chrome |

## 实际用例

一个前端 bug 只在你已登录的 staging 后台复现。开 Codex 会话，`@Chrome` 那个标签，让它走失败路径，然后在本地改组件。工资和密码管理标签不要放在同一个 Chrome 配置里。

## 下一步

1. 内置浏览器和页面批注 → [Browser](https://learn.chatgpt.com/docs/browser)
2. 桌面 Computer Use（不止 Chrome） → [Computer Use](https://learn.chatgpt.com/docs/computer-use)
3. 托管公开页 → [Sites](./sites)

## 官方来源

- [Chrome extension（落地页）](https://learn.chatgpt.com/codex/chrome-extension)
- [Chrome extension（文档）](https://learn.chatgpt.com/docs/chrome-extension)
- [Chrome Web Store](https://chromewebstore.google.com/detail/chatgpt/hehggadaopoacecdllhhajmbjkdcmajg)
- [内置浏览器（帮助）](https://help.openai.com/en/articles/20001277-using-the-built-in-browser-in-the-chatgpt-desktop-app)
- [Browser](https://learn.chatgpt.com/docs/browser)
- [Computer Use](https://learn.chatgpt.com/docs/computer-use)
