# 阿里云百炼（Model Studio）维护参考

> 本文件只记录百炼文档特有的维护事实。通用维护流程见 [`maintenance-workflow.md`](./maintenance-workflow.md)，Diataxis 四象限见 [`documentation-architecture.md`](./documentation-architecture.md)。读者可见的数据源写在 `docs/zh/products/bailian/bailian-cheatsheet.md` 的「高质量信息源」，不要在本文件再抄一份。

## 产品形态调研（先于动笔，2026-08-19）

**结论**：百炼是**企业级大模型服务与应用开发平台**，不是聊天 App，也不是 IDE 插件。前端接 Qwen / 第三方模型 API、在控制台搭 Agent / RAG、用 Coding Plan / Token Plan 给编程工具供电，都走这里。

| 形态 | 官方入口 | 本站处理 |
|------|----------|----------|
| Web 控制台 / 模型体验 | [bailian.console.aliyun.com](https://bailian.console.aliyun.com/) | Tutorial 主路径 |
| 模型 HTTP API（OpenAI 兼容 / Anthropic 兼容 / DashScope） | [首次调用](https://help.aliyun.com/zh/model-studio/first-api-call-to-qwen) | Tutorial + Cookbook |
| Token Plan / Coding Plan 订阅 | [Token Plan](https://help.aliyun.com/zh/model-studio/token-plan-overview)、[Coding Plan](https://help.aliyun.com/zh/model-studio/coding-plan) | Cheatsheet 决策表；Cookbook 防混用 |
| 可视化应用（Agent 1.0 / 2.0、工作流、知识库、MCP） | 文档站「用户指南（应用）」 | Cookbook 一条；不拆独立教程 |
| 百炼 CLI（`bl` / `bailian`，npm `bailian-cli`） | [安装说明](https://bailian.aliyun.com/cli/install.md)、[落地页](https://bailian.console.aliyun.com/cli) | Cookbook；地图一行 |
| 模型调优 / 部署 / 评测 | 文档站 Fine-tuning / Deployment / Evaluation | 地图一行，轴 B 偏 ML 平台，不写操作教程 |
| 接入第三方编程工具 | [接入客户端/开发工具](https://help.aliyun.com/zh/model-studio/use-chat-client-or-development-tool/) | Cookbook 只写「去官方页填 Key + Base URL」 |

**本站只收**：大模型服务平台百炼（Alibaba Cloud Model Studio）。

**明确不收正文**（家族图一行或标「非本站」）：

- 通义千问（对话产品，#83）
- 通义灵码 / Qoder CN（原 Lingma，#84）
- 析言 GBI、全妙（落地页兄弟入口，密度是营销/模板）
- PAI、DashVector、ECS、OSS 及帮助中心侧栏其它非 AI 云产品

## 基本信息

- 工具名：大模型服务平台百炼（Alibaba Cloud Model Studio）
- 中国站产品页：<https://www.aliyun.com/product/bailian>
- 中国站文档根：<https://help.aliyun.com/zh/model-studio/>
- 国际站文档根：<https://www.alibabacloud.com/help/en/model-studio/>
- 控制台：<https://bailian.console.aliyun.com/>
- 发版节奏：模型清单与套餐页按周级更新；Key 格式、Base URL、套餐名会静默改
- 当前覆盖：以 2026-08-19 打开的中国站帮助文档 + 国际站侧栏为准

## 官方一级导航（产品家族）

> 排轴 A/B 之前先填完。规则见 [`family-completeness.md`](./family-completeness.md)。
>
> 百炼文档站（国际站「User Guide (Models)」侧栏，2026-08-19）的一级分组如下。同厂其它 AI 产品不在这棵树上。

| 官方一级入口 | 官方 URL | 本站去向 | 不拆页理由（若一行） |
|--------------|----------|----------|----------------------|
| 产品简介 / What is Model Studio | https://help.aliyun.com/zh/model-studio/what-is-model-studio | 独立页 `index` + `bailian` | |
| 首次调用 API | https://help.aliyun.com/zh/model-studio/first-api-call-to-qwen | 独立页 `bailian` | |
| 选择模型 / Models | https://help.aliyun.com/zh/model-studio/models | 地图一行 + Cheatsheet 链官方 | 清单周更，禁止抄全表 |
| 计费 / 新人免费额度 / Token Plan / Coding Plan | https://help.aliyun.com/zh/model-studio/billing-for-model-studio 等 | Cheatsheet + Cookbook | |
| 模型体验 / Playground | 控制台模型体验 | Tutorial 一步 | |
| 接入客户端/开发工具 | https://help.aliyun.com/zh/model-studio/use-chat-client-or-development-tool/ | Cookbook 一行 + 官方链 | 每个工具官方已有专页 |
| 智能体 / 工作流 / 知识库 / MCP | Agent 2.0、workflow、RAG、MCP 简介 | Cookbook + Glossary | |
| 调优 / 部署 / 评测 | 文档站 Fine-tuning / Deployment / Evaluation | 地图一行 | 轴 B：训练平台，非前端主路径 |
| 百炼 CLI | https://bailian.aliyun.com/cli/install.md | Cookbook | 安装说明足够，不拆第三套 CLI 教程 |
| 通义千问 | 另产品 | 地图一行 → #83 | 本 issue 禁止写完整教程 |
| 通义灵码 / Qoder CN（原 Lingma） | https://help.aliyun.com/zh/model-studio/lingma-agent | 地图一行 → #84 | 本 issue 禁止写完整教程 |
| 析言 GBI / 全妙 | 产品页 Tab | 地图一行「非本站」 | 营销/模板，不是编码主线 |
| ECS / OSS / PAI / DashVector 等 | 帮助中心侧栏 | 地图一行「非本站」 | 非本站、非本 issue |

易撞名：

- **百炼 ≠ 千问 ≠ 灵码**。百炼是平台；千问是模型/对话产品；灵码已改名为 Qoder CN，是 IDE。
- **`bl` / `bailian`（npm `bailian-cli`）≠ `aliyun bailian`（阿里云 CLI 的 OpenAPI 插件）**。
- **`DASHSCOPE_API_KEY` 是环境变量名，不是产品名**。DashScope 是旧接口品牌，现文档仍用这个变量。
- **三种 Key 前缀不要混**：按量 `sk-` / `sk-ws`；Coding Plan / Token Plan 专属 `sk-sp-`。专属 Key 必须配专属 Base URL。
- **Coding Plan ≠ Token Plan**。官方写两者无法迁移；Token Plan 页推荐新用户走 Token Plan。
- **中国站与国际站地域、免费额度、Base URL 不是同一张表**。中国站新人额度在北京；国际站简介写新加坡。禁止把一边的数字抄到另一边。

两份官方页打架时的取舍：

| 事实 | 以谁为准 | 另一份 |
|------|----------|--------|
| 数据是否用于训练 | [产品简介「重要」](https://help.aliyun.com/zh/model-studio/what-is-model-studio) + [Coding Plan](https://help.aliyun.com/zh/model-studio/coding-plan) + [Token Plan](https://help.aliyun.com/zh/model-studio/token-plan-overview)：按量与 Token Plan **团队版**不用于训练；Token Plan **个人版**与 Coding Plan 会用于服务改进 | FAQ / 国际站简介写「never」是简化口径 |
| 美国（弗吉尼亚）OpenAI 兼容 Base URL | [选择模型](https://help.aliyun.com/zh/model-studio/models) 写 `https://dashscope-us.aliyuncs.com/compatible-mode/v1` | 产品简介示例仍出现 `{WorkspaceId}.us-east-1.maas.aliyuncs.com`。教程示例用模型清单页 |
| 按量付费北京 OpenAI 兼容 Base URL | [首次调用](https://help.aliyun.com/zh/model-studio/first-api-call-to-qwen) / 模型清单：`https://{WorkspaceId}.cn-beijing.maas.aliyuncs.com/compatible-mode/v1` | Coding Plan 页仍写旧主机 `https://dashscope.aliyuncs.com/compatible-mode/v1`。写清「旧主机仍出现在套餐页，新调用以首次调用/模型清单为准」 |
| 新人免费额度在哪 | 中国站 [新人免费额度](https://help.aliyun.com/zh/model-studio/new-free-quota)：仅华北 2（北京） | 国际站产品简介：新加坡。分区站引用 |

## 文档文件结构（Diataxis）

```
docs/zh/products/bailian/       # 英文同构 docs/products/bailian/
├── index.md                    # 🗺️ 学习地图 + 家族图
├── bailian.md                  # 📘 Tutorial — 控制台 + 第一次 API
├── bailian-cookbook.md         # 🔧 How-to
├── bailian-cheatsheet.md       # 📐 Reference
└── bailian-glossary.md         # 📖 Explanation
```

| 文件 | 象限 | 写什么 | 不写什么 |
|------|------|--------|----------|
| `index.md` | 导航 | 家族图、决策树、千问/灵码一行 | 操作步骤、模型全表 |
| `bailian.md` | Tutorial | 开通、Key、第一次 Node 调用、选模型档 | 套餐数字、每个第三方工具逐步配置 |
| `bailian-cookbook.md` | How-to | 防混用 Key、免费额度用完即停、控制台问答、装 CLI | 灵码/千问完整教程、ECS/OSS |
| `bailian-cheatsheet.md` | Reference | 决策表、Key/URL、地域、数据源 | 概念散文 |
| `bailian-glossary.md` | Explanation | 撞名、Workspace、三种协议、两套套餐 | 参数清单 |

轴 A：先地图，再 Tutorial（控制台 + API 是后续所有页的前提），Cookbook / Cheatsheet / Glossary 紧跟。
轴 B：调优/部署/评测、析言/全妙、云主机往后压或一行。

## 监控页面

- 产品简介：https://help.aliyun.com/zh/model-studio/what-is-model-studio
- 模型清单：https://help.aliyun.com/zh/model-studio/models
- 计费项：https://help.aliyun.com/zh/model-studio/billing-for-model-studio
- 新人免费额度：https://help.aliyun.com/zh/model-studio/new-free-quota
- Token Plan：https://help.aliyun.com/zh/model-studio/token-plan-overview
- Coding Plan：https://help.aliyun.com/zh/model-studio/coding-plan
- API Key：https://help.aliyun.com/zh/model-studio/get-api-key
- 接入客户端：https://help.aliyun.com/zh/model-studio/use-chat-client-or-development-tool/
- 百炼 CLI 安装：https://bailian.aliyun.com/cli/install.md
- FAQ：https://help.aliyun.com/zh/model-studio/faq-about-alibaba-cloud-model-studio
- 国际站简介：https://www.alibabacloud.com/help/en/model-studio/what-is-model-studio

## Git 提交 scope

```
docs(bailian): ...
```

## 已知踩坑 / 特殊约定

- **模型 ID 与套餐白名单必须逐字匹配**。Coding Plan 官方写「禁止做版本兼容推理」：`qwen3-coder-max` 不在清单就不能当 `qwen3-coder-plus` 用。
- **Key 与 Base URL 必须成对**。Coding Plan 官方：通用 Key 配套餐 URL → `invalid_api_key`；通用 Key 配按量 URL → **不抵扣套餐、按量扣费**。
- **Coding Plan 严禁当普通后端 API 用**。官方：仅限编程工具，批量/脚本视为违规。
- **新 Key 只展示一次**，前缀 `sk-ws`（美国弗吉尼亚除外）。旧 `sk-` 仍可用。
- **北京 / 新加坡 / 东京 / 法兰克福** 的新 MaaS URL 要填 `{WorkspaceId}`；美国弗吉尼亚以模型清单页为准。
- **不要在正文写「通常」补全价格**。单价只链 [模型调用价格](https://help.aliyun.com/zh/model-studio/model-pricing) / [计费项](https://help.aliyun.com/zh/model-studio/billing-for-model-studio)。
- 机制（注意力、训练）不写，链 Learn LLM：`https://llm.zenheart.site/chapters/` 与本站 `/zh/tech/fundamentals/LLM`。
- 禁止改 `products-gallery.js`（本轮用户硬约束）。导航只改 `docs/.vitepress/sidebars/ai-coding.mjs`。
