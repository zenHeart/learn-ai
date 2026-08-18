# 腾讯混元 / Tencent Hy 维护参考

> 通用维护流程见 [`maintenance-workflow.md`](./maintenance-workflow.md)；高质量数据源清单发布在 `docs/zh/products/hunyuan/hunyuan-cheatsheet.md` 的「高质量信息源」章节。文档架构见 [`documentation-architecture.md`](./documentation-architecture.md)。

## 产品形态调研结论（写教程前必须先有这一节）

调研时间：2026-08-19。以下每条都来自一手官方来源，来源标在括号里。

**结论一：本 issue 的产品是「混元 / Hy」模型与开放能力，不是元宝、也不是 CodeBuddy。**

- 官方首页 [hunyuan.tencent.com](https://hunyuan.tencent.com/) / [hy.tencent.com](https://hy.tencent.com/) 一级导航：模型、研究、Co-design、International、试用 Hy；页脚「产品」列出 **WorkBuddy / 元宝 / ima**。
- 品牌正在从「腾讯混元 / Tencent Hunyuan」迁到「Tencent Hy」。GitHub org [Tencent-Hunyuan](https://github.com/Tencent-Hunyuan) 的官网写的是 `https://hy.tencent.com/`。国际通稿原文：「Tencent Hy, formerly known as Tencent Hunyuan」。
- 元宝是 C 端助手（[yuanbao.tencent.com](https://yuanbao.tencent.com/)），自称「已接入最新的混元 Hy3 模型」。CodeBuddy 是腾讯云代码助手（[codebuddy.cn](https://www.codebuddy.cn/)）。二者是同厂其它产品，本目录只在家族图占一行。

**结论二：前端工程师要调用混元，当前官方主路径是 TokenHub，不是单独再学一套「混元云 API 产品树」。**

- TokenHub 文档根：[cloud.tencent.com/document/product/1823](https://cloud.tencent.com/document/product/1823)。产品概述原文：「整合腾讯自研的混元大模型能力，并引入优质第三方模型」。
- Hy3 调用指南：[混元调用指南](https://cloud.tencent.com/document/product/1823/132252)。`hy3` 兼容 OpenAI Chat Completions、OpenAI Responses、Anthropic Messages。端点：`https://tokenhub.tencentmaas.com/v1`。
- 快速入门：[1823/130058](https://cloud.tencent.com/document/product/1823/130058)。步骤：注册并实名 → 控制台开通 → 模型广场领免费体验包 → 创建 API Key → 调 `chat/completions`。
- 老产品页 [cloud.tencent.com/product/hunyuan](https://cloud.tencent.com/product/hunyuan) 与文档树 [product/1729](https://cloud.tencent.com/document/product/1729) 仍在，但 2026-07 之后的 Hy3 正文写在 TokenHub（1823）。**本站以 TokenHub + hunyuan.tencent.com 为准**；1729 上的 Hunyuan-T1 / TurboS 当历史规格，不要当当前旗舰。
- 同站产品页 [cloud.tencent.com/product/tclm](https://cloud.tencent.com/product/tclm) 已列出 Hy3（295B / 21B 激活、192K 入 / 128K 出、`no_think` / `think_low` / `think_high`，更新 2026-07-06）。

**结论三：Hy3 同时是托管 API 模型和开源权重，本站两条线都写，但不写自建机房运维手册。**

- 仓库 [Tencent-Hunyuan/Hy3](https://github.com/Tencent-Hunyuan/Hy3) / Hugging Face [tencent/Hy3](https://huggingface.co/tencent/Hy3)：295B MoE、21B 激活、3.8B MTP、256K 上下文、Apache-2.0。推荐参数 `temperature=0.9`、`top_p=1.0`。推理模式 `reasoning_effort`: `no_think`（默认）/ `low` / `high`。
- 官方部署：vLLM `vllm serve tencent/Hy3`（`--tool-call-parser hy_v3`）；SGLang `--tool-call-parser hunyuan`。8 卡、推荐 H20-3e。
- TokenHub 侧 `hy3`：上下文 256k、最大输入 192k、最大输出 128k；能力：深度思考（保留式）、结构化输出、Function Calling、Cache。价格（后付费，元/百万 tokens）：输入 1 / 输出 4 / 缓存命中 0.25（[模型价格](https://cloud.tencent.com/document/product/1823/130055)，2026-08-14）。
- `hy3-preview` 官方标注 **2026-08-31 下线**。教程默认写 `hy3`。

**结论四：混元还有多模态与专项模型；本站只收官方已给 slug 的表，不拆独立教程。**

官方模型页分类（[hunyuan.tencent.com/model/hy-model](https://hunyuan.tencent.com/model/hy-model)）：语言模型、视觉语言模型、视觉生成模型、语音识别模型。已核到的 Hy 系 slug（TokenHub [模型列表](https://cloud.tencent.com/document/product/1823/130051)）：

| 官方名 | model 参数 | 本站处理 |
|--------|------------|----------|
| Hy3 | `hy3` | Tutorial + cheatsheet 主线 |
| Hy3 preview | `hy3-preview` | 地图/速查一行，标下线日 |
| Hy-MT2-Pro / Plus / Lite | `hy-mt2-pro` / `hy-mt2-plus` / `hy-mt2-lite` | 速查一行 |
| Hy-Role-Latest / Hy-Role | `hunyuan-role-latest` / `hy-role` | 速查一行 |
| HY-Image-V3.0 / Hy-Image-Lite | `hy-image-v3.0` / `hy-image-lite` | 地图一行 |
| HY-Video-1.5 | `hy-video-1.5` | 地图一行 |
| HY-3D-3.0 / 3.1 / Express | `hy-3d-3.0` / `hy-3d-3.1` / `hy-3d-express` | 地图一行 |
| HY-Vision-2.0-Instruct 等 | `hy-vision-2.0-instruct` 等 | 地图一行 |
| Hy-ASR-3.0-Preview | TokenHub 定价页出现 | 地图一行 |

开源仓（[github.com/Tencent-Hunyuan](https://github.com/Tencent-Hunyuan)）置顶还有 HunyuanVideo、HunyuanImage-3.0、Hunyuan3D-2.1、HunyuanOCR 等。开源权重名与 TokenHub slug **不要混抄**。

**结论五：适合本站「前端工程师」定位，但形态是模型 + API，不是第一方编码 CLI。**

- 有 OpenAI / Anthropic 兼容 HTTP，官方给了 Node.js 示例（[132252](https://cloud.tencent.com/document/product/1823/132252)）。
- TokenHub 快速入门列出「在 Claude Code / Cursor / OpenClaw / CodeBuddy Code 中调用」。Hy3 专项页：[1823/131903](https://cloud.tencent.com/document/product/1823/131903)。
- Hy3 README 原文把 frontend design、coding 列为生产力场景；SWE-Bench Verified 在 CodeBuddy / Cline / KiloCode 上方差 ≤ 4%。
- **没有**第一方 `hunyuan` CLI。编码 agent 产品是 CodeBuddy（#78），办公 agent 是 WorkBuddy。本目录不写它们的教程。
- 本地跑满血 Hy3 需要 8×H20 级 GPU，对个人前端不现实。教程只给官方启动命令并链仓库，不写「笔记本也能跑」。

**结论六：两套官方页会打架，写作时必须点名以谁为准。**

| 事实 | 以谁为准 | 另一份 |
|------|----------|--------|
| 当前旗舰语言模型 | TokenHub 模型列表 + hunyuan.tencent.com 的 Hy3 | product/hunyuan 上的 Hunyuan-T1 / TurboS |
| API 端点与鉴权 | TokenHub `tokenhub.tencentmaas.com/v1` + Bearer API Key | 1729 老混元 API / 云 API 签名 |
| 思考档位 | TokenHub：`thinking` + `reasoning_effort`（`hy3` 默认 `low`；带 tools 时 `low` 映射为 `high`） | tclm 产品页：`no_think` / `think_low` / `think_high`；开源 README：`chat_template_kwargs.reasoning_effort` |
| 价格 | [1823/130055](https://cloud.tencent.com/document/product/1823/130055) | 营销页摘抄；过期立即以该页为准 |

## 基本信息

- 工具名：腾讯混元 / Tencent Hy（旗舰语言模型 Hy3）
- 官方文档根地址：<https://hunyuan.tencent.com/> ；API：<https://cloud.tencent.com/document/product/1823>
- 发版节奏：模型按发布日滚动（Hy3 正式版 2026-07-06；Hy3 Preview 约 2026-04 下旬）。不要写死「每 X 天一版」。
- 当前覆盖：Hy3 正式版 + TokenHub 文档（模型列表 / 混元调用指南 / 快速入门 / 模型价格，复核 2026-08-19）

## 官方一级导航（产品家族）

> 排轴 A/B 之前先填完。规则见 [`family-completeness.md`](./family-completeness.md)。

| 官方一级入口 | 官方 URL | 本站去向 | 不拆页理由（若一行） |
|--------------|----------|----------|----------------------|
| Hy / 混元官网（模型） | https://hunyuan.tencent.com/ https://hunyuan.tencent.com/model/hy-model | 独立页 `index` + `hunyuan.md` | |
| 研究 | https://hunyuan.tencent.com/research https://hy.tencent.com/research/hy3 | 地图一行 | 论文/研究站，不是操作面 |
| Co-design | https://hunyuan.tencent.com/ 页头「Co-design」 | 地图一行 | 官网一级栏目，公开密度是营销/合作，不拆教程 |
| International | 官网页头 International | 地图一行 | 语言切换 / 国际入口，不是新产品 |
| 试用 Hy / Hy AI Studio | https://aistudio.tencent.com/ | Tutorial 一节 | 对话/多模态体验台，步骤薄 |
| 开源模型（GitHub / HF） | https://github.com/Tencent-Hunyuan https://huggingface.co/tencent/Hy3 | Tutorial 一节 + cheatsheet | |
| TokenHub（托管推理） | https://cloud.tencent.com/product/tokenhub https://cloud.tencent.com/document/product/1823 | Tutorial + cookbook + cheatsheet | 本站只写 **调混元**；三方模型不展开 |
| 腾讯混元大模型（老云产品 1729） | https://cloud.tencent.com/product/hunyuan https://cloud.tencent.com/document/product/1729 | 地图一行 | 与 TokenHub 重叠；Hy3 正文已迁 1823 |
| 元宝 | https://yuanbao.tencent.com/ | 地图一行 → #76 | 同厂 C 端助手，不写正文 |
| CodeBuddy | https://www.codebuddy.cn/ | 地图一行 → #78 | 同厂编码工具，不写正文 |
| WorkBuddy | https://www.workbuddy.cn/ https://cloud.tencent.com/product/workbuddy | 地图一行 | 同厂办公 Agent，不写正文 |
| ima | https://ima.qq.com/ | 地图一行 | 同厂知识管家，不写正文 |
| 招聘机会 | 官网页脚 | 非本站 | 不是产品 |
| 人脸识别 / 云服务器 / 短信 / 域名等 | 腾讯云一级 nav | 非本站 | 非 AI 或非混元 |

易撞名：

- **混元 / Hy ≠ 元宝**。混元是模型与开放能力；元宝是消费级助手，只是接入了 Hy3。
- **Hy3 ≠ Hy AI Studio ≠ TokenHub**。Hy3 是模型；AI Studio 是试用台；TokenHub 是云上模型网关（还卖别人的模型）。
- **TokenHub ≠ 老「腾讯混元大模型」1729**。调 Hy3 以 TokenHub 为准。
- **CodeBuddy / WorkBuddy 不是混元 CLI**。混元没有第一方编码 CLI。
- **开源权重名（HunyuanImage-3.0）≠ TokenHub slug（`hy-image-v3.0`）**。
- **`hy3-preview` ≠ `hy3`**。Preview 已标下线日。

## 文档文件结构（Diataxis）

```
docs/zh/products/hunyuan/
├── index.md                 # 🗺️ 学习地图 + 家族图
├── hunyuan.md               # 📘 Tutorial — 试用、TokenHub 第一次调用、开源权重入口
├── hunyuan-cookbook.md      # 🔧 How-to — Node 调用、思考档、工具调用、接到 Claude Code
├── hunyuan-cheatsheet.md    # 📐 Reference — slug / 端点 / 价格 / 数据源
└── hunyuan-glossary.md      # 📖 Explanation — 撞名、双文档树、思考档位两套词

docs/products/hunyuan/       # 英文同构
```

| 文件 | 象限 | 写什么 | 不写什么 |
|------|------|--------|----------|
| `index.md` | 导航 + 速查 | 家族图、决策树、本目录收/不收 | 操作步骤；元宝/CodeBuddy 教程 |
| `hunyuan.md` | Tutorial | 试用 Studio、开通 TokenHub、第一次 `hy3` 调用、开源入口 | 完整参数表；自建 8 卡集群运维 |
| `hunyuan-cookbook.md` | How-to | 流式、思考、Function Calling、接到 Claude Code | TokenHub 上的 DeepSeek/Kimi 选型 |
| `hunyuan-cheatsheet.md` | Reference | slug、价格、端点、协议、信息源 | 概念散文 |
| `hunyuan-glossary.md` | Explanation | 是什么 / 不是什么 / 两套官方页谁赢 | 参数清单 |

轴 A：先地图，再 Tutorial（先能调通），再 How-to，Reference / Explanation 殿后。
轴 B：TokenHub 调 Hy3 是前端读者主线；开源权重部署相关度中、排 Tutorial 后段；元宝/CodeBuddy 只占地图。

## 监控页面

- 官网 / 模型：<https://hunyuan.tencent.com/> <https://hunyuan.tencent.com/model/hy-model>
- Hy3 研究帖：<https://hy.tencent.com/research/hy3>
- TokenHub 文档根：<https://cloud.tencent.com/document/product/1823>
- 模型列表：<https://cloud.tencent.com/document/product/1823/130051>
- 混元调用指南：<https://cloud.tencent.com/document/product/1823/132252>
- 快速入门：<https://cloud.tencent.com/document/product/1823/130058>
- 模型价格：<https://cloud.tencent.com/document/product/1823/130055>
- Claude Code × Hy3：<https://cloud.tencent.com/document/product/1823/131903>
- 开源：<https://github.com/Tencent-Hunyuan/Hy3> <https://huggingface.co/tencent/Hy3>
- 试用：<https://aistudio.tencent.com/>
- 控制台：<https://console.cloud.tencent.com/tokenhub>
- 老产品树（对照用，不要当主源）：<https://cloud.tencent.com/document/product/1729>

## Git 提交 scope

```
docs(hunyuan): ...
```

## 已知踩坑 / 特殊约定

1. **官网是 SPA**。`curl` / 普通抓取经常只拿到导航壳；正文用阅读器或浏览器渲染。`hunyuan.tencent.com` 与 `hy.tencent.com` 是同一站两域名。
2. **禁止把 TokenHub 写成「混元专用网关」**。它明确聚合第三方模型。本目录只示范 `hy3`。
3. **禁止把 1729 的 Hunyuan-T1 / TurboS / hunyuan-lite 写成当前默认模型**。当前旗舰 slug 是 `hy3`。
4. **思考参数有三套词**：TokenHub `thinking` / `reasoning_effort`；产品页 `no_think` / `think_low` / `think_high`；开源 `chat_template_kwargs.reasoning_effort`。教程里并列引用，禁止猜哪套覆盖哪套。
5. **带 `tools` 时 TokenHub 会把 `reasoning_effort=low` 映射成 `high`**（[132252](https://cloud.tencent.com/document/product/1823/132252) 原文）。不要写成「low 在 toolcall 下仍是 low」。
6. **开源 parser 名字不一致**：vLLM `hy_v3`，SGLang `hunyuan`。按官方 README 抄，不要统一成一个。
7. **免费额度只写「控制台 + 新人免费体验包为准」**。营销页有「100 万 tokens」，不要把它写成所有模型的固定配额。
8. **不写元宝 / CodeBuddy / WorkBuddy / ima 的操作步骤**；不写人脸识别、云主机、短信等非 AI 腾讯云。
9. **不写模型内部机制**（MoE 路由、MTP 训练）。规格数字可以抄官方表，原理链 [Learn LLM](https://llm.zenheart.site/chapters/)。
