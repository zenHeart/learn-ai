# 产品档 schema 与判定口径

产品档唯一位置：`data/products/products/<id>.json`。文件内 `id` 必须与文件名一致（不带 `.json`）——这是 `validate-products.mjs` 的硬校验。

## 1. 字段模板

```jsonc
{
  "id": "cursor",                    // kebab，全表唯一，供 Vue :key
  "name": "Cursor",                  // 官方名，中文产品保持原字形，不音译
  "name_zh": "Cursor",               // 有通行中文名则填，否则与 name 相同
  "vendor_id": "anysphere",          // 外键 → data/products/vendors.json
  "region": "intl",                  // intl | cn
  "category": "coding-agent",        // 外键 → data/products/taxonomy.json
  "use_cases": ["coding", "office"], // 外键 → data/products/use-cases/*.json，1–3 个
  "form": "ide",                     // cli | ide | web | desktop | api | self-hosted
  "released": "2023-03-01",          // 首次公开发布，YYYY-MM-DD
  "homepage": "https://cursor.com",  // 必须是 https
  "desc": "…",                       // 一句话，≤12 词，读者语言
  "desc_zh": "…",
  "tags": ["ai-ide", "agentic-coding"],  // 二级能力标签，kebab-case
  "handbook": {
    "status": "written",             // none | candidate | written
    "route": { "en": "/products/cursor/", "zh": "/zh/products/cursor/" }
  },
  "status": "active",                // active | renamed | merged | discontinued
  "superseded_by": null,             // 指向新名字对应的档案 id
  "last_verified_at": "2026-10-04",  // 最近一次核实官网+日期的日期
  "notes": "",                       // 读者不需要知道的内部说明也写这里
  "revisions": []                    // 勘误追加
}
```

## 2. 判定口径

### released（首次公开发布日）

- 取**产品**首次对公众可用的日子：公测、GA、公开 beta 都算；公司成立日、融资日、模型权重发布日**不算**（除非该产品就是那个权重）。
- 只有年月精度时用该月 1 日，并在 `notes` 写 `仅精确到月`。
- 证据必须可指认：官方发布文、官方博客、官方公告、官方 RSS。**凭记忆的不收。**
- 改日期必须走 `revisions[]`，并在对账报告里单独列出。

### homepage

- 指向产品的稳定入口页，不是文档页、不是博客文章、不是 changelog。
- 必须是 `https://`（校验器强制）。
- 抓一次确认不是 404。**反爬 403 不算核实通过**：照常建档，但在 `notes` 写明，并在报告的「官网未确认」清单里列出。
- 域名变更走 `revisions[]` + `notes`，不要新建一条档案。

### form

| 值 | 判定 |
|---|---|
| `cli` | 终端里跑，装完敲命令 |
| `ide` | 编辑器/IDE 形态（Cursor、VS Code 插件也算） |
| `web` | 浏览器打开就用 |
| `desktop` | 桌面客户端（Electron / 原生） |
| `api` | 主要价值是给开发者调接口 |
| `self-hosted` | 主要价值是你自己部署 |

判不准选最贴近的，不要新增枚举值。

### use_cases

- 从 `data/products/use-cases/*.json` 的 id 里选，**1–3 个**，多了会让选型失去意义。
- 判据是**普通用户为什么事会打开它**，不是厂商怎么自我定位。Cursor 既是 `coding` 也可能是 `office`（在真实项目里写代码）；Sora 是 `video` 也是 `image-design`。
- 一个都没有是非法的（校验器会拦：每个场景至少要有 3 个产品）。
- 新场景不要就地造——先写 `use-cases/<id>.json` 并走校验，再在产品档里引用。

### handbook.status

| 值 | 含义 | 是否带 route |
|---|---|---|
| `none` | 本站没写，也不打算写 | 否 |
| `candidate` | 没写，但值得写——**后续写手册的依据** | 否 |
| `written` | 本站已有手册 | 是，中英各一条 |

- `written` 的 route 会被校验器逐个查磁盘，**写错就是构建失败**。本站产品页在 `docs/products/<slug>/index.md` 与 `docs/zh/products/<slug>/index.md`。
- 单文件页（如 `docs/products/ollama.md`）路由带 `.html` 后缀，别写成目录形式。
- `candidate` 的判断标准：普通用户会搜"X 怎么用"且本站现在答不上来。内部工具、极小众产品保持 `none`。

### status 与 superseded_by

时间轴要能讲出"这个产品后来怎么了"，所以**改名/并购/合并都不删档**：

- 改名 → 旧档 `status: "renamed"`，`superseded_by` 指向新档 id，`notes` 写明"YYYY-MM 改名"。
- 并入别的产品 → `status: "merged"`，`superseded_by` 指向承接方。
- 停运 → `status: "discontinued"`，`notes` 写停运时间。
- 例：Windsurf 被 Cognition 收购后更名 Devin Desktop；Claude Cowork 并入 Claude；通义灵码更名 Qoder。

### id

- 取官方名的 kebab slug：`Claude Code` → `claude-code`。
- **非拉丁名必须人工给英文/拼音 id**：通义灵码 → `lingma`，字节跳动 → `bytedance`。
- slug 退化（中文名 slug 成空串、被 `-2`/`-7` 之类序号兜底）是 bug，校验器会拦 `^x(-\d+)?$` 形态的 vendor id，产品 id 同理——给人看的 id 要能读。

## 3. tags

- 二级能力标签，kebab-case，2–4 个。
- **不要把 category 抄一遍**（`agent-platform` 已经是分类了，tag 再写一次是噪声）。
- 面向筛选，不是面向 SEO。没有公认说法就不要硬造。
