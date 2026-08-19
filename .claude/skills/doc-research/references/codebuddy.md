# CodeBuddy 维护参考

> 这是 [`_template.md`](./_template.md) 针对腾讯云 CodeBuddy 的具体化。读者可见的数据源写在 `docs/zh/products/codebuddy/codebuddy-cheatsheet.md` 的「高质量信息源」。

## 基本信息

- 工具名：腾讯云代码助手 CodeBuddy（Tencent Cloud Code Assistant CodeBuddy）
- 官方文档根地址：<https://www.codebuddy.cn/docs/>
- 国际站文档根地址：<https://www.codebuddy.ai/docs/>（中文镜像 <https://www.codebuddy.ai/docs/zh/>）
- 腾讯云产品页：<https://cloud.tencent.com/product/acc>
- 腾讯云文档（WorkBuddy Enterprise / 形态总览）：<https://cloud.tencent.com/document/product/1831/134343>
- 发版节奏：CLI 文档站「版本发布」按小版本连发（调研时侧栏头部约 v2.81.0）
- 当前覆盖版本：2026-08-18 官方文档快照（不以某一个 CLI 小版本号写进读者正文标题）

## 官方一级导航（产品家族）

> 排轴 A/B 之前先填完。规则见 [`family-completeness.md`](./family-completeness.md)。抓页见 [`official-fetch.md`](./official-fetch.md)。
>
> 文档站顶栏一级（2026-08-18 打开 <https://www.codebuddy.cn/docs/>、<https://www.codebuddy.cn/docs/cli/troubleshooting>）：**IDE / 插件 / CLI / WorkBuddy / WorkBuddy 小程序 / WorkBuddy 移动端 / 企业版**。
>
> 官网顶栏另有：WorkBuddy、定价、文档、博客、API 文档、活动。这些是资源栏，不是独立编码产品。

| 官方一级入口 | 官方 URL | 本站去向 | 不拆页理由（若一行） |
|--------------|----------|----------|----------------------|
| CodeBuddy IDE | <https://www.codebuddy.cn/docs/> · 安装 <https://www.codebuddy.cn/docs/ide/Getting-Started/Installation> · 下载 <https://www.codebuddy.cn/ide/> | 独立页（Tutorial 内） | |
| CodeBuddy 插件 | <https://www.codebuddy.cn/docs/plugin/> | 独立页（Tutorial 内） | |
| CodeBuddy Code（CLI） | <https://www.codebuddy.cn/docs/cli/> · 安装 <https://www.codebuddy.cn/docs/cli/installation> | 独立页（Tutorial 内） | |
| WorkBuddy | <https://www.codebuddy.cn/docs/workbuddy/> · 官网 <https://www.codebuddy.cn/work/> | 地图一行 | 办公工作台，不是编码主线；#78 明确不写正文 |
| WorkBuddy 小程序 | <https://www.codebuddy.cn/docs/workbuddymini/> | 地图一行 | WorkBuddy 移动入口；不写微信教程 |
| WorkBuddy 移动端 | <https://www.codebuddy.cn/docs/workbuddyapp/> | 地图一行 | WorkBuddy App，不是编码主线 |
| 企业版 | <https://www.codebuddy.cn/docs/ide/Codebuddy-enterprise-edition/Codebuddy-enterprise-purchase> · 云文档 <https://cloud.tencent.com/document/product/1831/134343> | 地图一行 | 购买 / 专享版流程，密度给企业管理员，不拆前端教程 |
| 元宝（同厂，非本站一级） | <https://yuanbao.tencent.com/> | 地图一行 | 另 issue #76；本目录不写教程 |
| 混元（同厂，非本站一级） | <https://hunyuan.tencent.com/> · 云产品 <https://cloud.tencent.com/product/tclm> | 地图一行 | 另 issue #77；本目录不写教程 |

**本站只收**：CodeBuddy 的三种编程形态（IDE / 插件 / CLI）。

**明确不收**：

- 元宝、混元的完整教程（家族图一行 + 官方链接）
- WorkBuddy / 小程序 / 移动端 / 企业版的完整教程
- 微信、QQ、企业微信、微信支付、云主机等非 AI 产品
- 官网营销数字（「提升编码效率 90%」一类）不当本站论断
- 模型内部机制（链 Learn LLM）

易撞名：

- **CodeBuddy ≠ WorkBuddy**。前者是编码产品族；后者官方定义是「全场景 AI 办公工作台」。
- **CodeBuddy 插件 ≠ CLI 的 plugin 系统**。插件是 VS Code / JetBrains 等编辑器扩展；CLI `codebuddy plugin` 是 CodeBuddy Code 自己的扩展包。
- **CodeBuddy Code ≠ 只在 IDE 里写代码**。官方产品名是 **CodeBuddy Code**，可执行文件是 `codebuddy`，npm 包是 `@tencent-ai/codebuddy-code`。
- **国内站 ≠ 国际站**。国内文档 / 登录走 `codebuddy.cn` 与 `copilot.tencent.com`；国际站走 `codebuddy.ai`。CLI 启动后四选一登录。
- **混元是模型，不是 CodeBuddy 产品**。CodeBuddy 官方写「支持混元、DeepSeek 等多种对话大模型」。
- **微信开发者工具**是插件官方支持的宿主 IDE 之一，不是本站要写的微信产品。

## 文档文件结构（Diataxis）

```
docs/zh/products/codebuddy/
├── index.md                    # 学习地图 + 家族图
├── codebuddy.md                # Tutorial：三种形态装上并跑通
├── codebuddy-cookbook.md       # How-to：官方工作流配方
├── codebuddy-cheatsheet.md     # Reference：安装 / 命令 / 斜杠命令 / 数据源
└── codebuddy-glossary.md       # Explanation：形态、权限、CODEBUDDY.md

docs/products/codebuddy/        # 英文，与中文同构
```

| 文件 | 象限 | 写什么 | 不写什么 |
|------|------|--------|----------|
| `index.md` | 导航 + 速查 | 家族图、决策树、学习路径 | 逐步安装 |
| `codebuddy.md` | Tutorial | 装 IDE / 插件 / CLI、登录、第一次对话 | 完整 flag 表、概念长文 |
| `codebuddy-cookbook.md` | How-to | `/init`、print 模式、自定义斜杠命令、MCP、从 Claude Code 迁移 | 安装、术语定义 |
| `codebuddy-cheatsheet.md` | Reference | 安装原文、CLI 命令、斜杠命令、键位、数据源 | 学习路径、概念散文 |
| `codebuddy-glossary.md` | Explanation | 是什么 / 不是什么 / 易撞名 | 命令清单 |

三种编程形态密度都够写，但 #78 指定一个 Tutorial 覆盖 IDE / 插件 / CLI，不拆成三份主教程。

## 监控页面

- CLI 安装：<https://www.codebuddy.cn/docs/cli/installation>
- CLI 快速开始：<https://www.codebuddy.cn/docs/cli/quickstart>
- CLI 参考：<https://www.codebuddy.cn/docs/cli/cli-reference>
- 斜杠命令：<https://www.codebuddy.cn/docs/cli/slash-commands>
- 故障排查：<https://www.codebuddy.cn/docs/cli/troubleshooting>
- IDE 安装：<https://www.codebuddy.cn/docs/ide/Getting-Started/Installation>
- 插件安装：<https://www.codebuddy.cn/docs/plugin/>
- 定价：<https://www.codebuddy.cn/pricing/>
- 腾讯云产品页：<https://cloud.tencent.com/product/acc>
- CLI 版本发布侧栏：<https://www.codebuddy.cn/docs/cli/troubleshooting>（侧栏「版本发布」）

## Git 提交 scope

```
docs(codebuddy): ...
```

## 已知踩坑 / 特殊约定

- **安装命令以安装页为准，快速开始页另一套 URL 并存**：安装页原生安装是 `curl -fsSL https://www.codebuddy.cn/cli/install.sh | bash` 与 `irm https://www.codebuddy.cn/cli/install.ps1 | iex`。快速开始页写的是 `https://copilot.tencent.com/cli/install.sh` / `install.ps1`。两边都是官方页，不要合成一条，并排引用。
- **Node.js 口径不完全一致**：CLI 安装页与故障排查写 **Node.js 18.20+**；文档总览 CLI 节写 **Node.js 18.0+**；腾讯云国际站产品 FAQ 写过 **Node.js 22+**。本站以 [安装指南](https://www.codebuddy.cn/docs/cli/installation) 的 18.20 为 CLI 包管理器通道的事实源，其它口径在正文标差异。
- **国内站 / 国际站文档树不完全同步**：`www.codebuddy.ai/docs/` 英文总览曾写「两种形态（IDE 和 CLI）」；中文总览与腾讯云文档明确写 **IDE、插件、CLI 三种**。本站以中文文档站 + `cloud.tencent.com/document/product/1831/134343` 为准。
- **`www.codebuddy.cn` / `www.codebuddy.ai` 在部分代理（fake-ip 198.18.x）下 curl 会 404**。核对安装原文用页面阅读器，不要用失败的 curl 当「页面不存在」。
- **不要把 WorkBuddy 写进 Tutorial**。安装页提到 `CODEBUDDY_CONFIG_DIR` 可避免与 WorkBuddy 配置冲突，那是配置提示，不是 WorkBuddy 教程。
- **不要写微信 / QQ 产品教程**。插件支持「微信开发者工具」只作为官方宿主表一行。
- **额度**：官方只写「CLI、CodeBuddy IDE 和 CodeBuddy Plugin 共享同一账号的资源配额」。定价页是前端渲染，不要臆造套餐数字。链 <https://www.codebuddy.cn/pricing/>。
- **不写精确 CLI 小版本到正文标题**。版本发布侧栏更新很快。
