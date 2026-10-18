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
  "date_precision": "day",           // day | month —— 只精确到月时 released 用当月 1 日
  "homepage": "https://cursor.com",  // 必须是 https
  "desc": "…",                       // 一句话，≤12 词，读者语言
  "desc_zh": "…",
  "solves": "…",                     // 痛点：用了它之后什么事不再是问题
  "solves_zh": "…",
  "best_for": "…",                   // 场景：什么时候你会打开它
  "best_for_zh": "…",
  "surface": "standalone",            // standalone | in-product | plugin | extension
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
- 只有年月精度时用该月 1 日，**并把 `date_precision` 置 `month`**——校验器会核对它与 `released` 是否自洽，光在 `notes` 里写一句是不够的。
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

`form` 的 11 个取值：`cli` / `ide` / `web` / `desktop` / `api` / `self-hosted` / `hardware`。
`hardware` 是为 AI 眼镜一类穿戴设备加的——把它们塞进 `desktop` 是不诚实的。

### solves / best_for —— 写给普通用户的两个字段

**这是卡片上最重要的一行。** 读者想知道的是「这东西解决我什么问题、什么时候该用」，
不是它属于哪个分类、有哪些能力标签。

`solves` 先写痛、再写变化。`best_for` 写具体触发场景。

| | 好 | 坏 |
|---|---|---|
| `solves` | "Every video edit starts with the timeline. This one lets you cut by editing the transcript instead." | "A generative video platform for creators."（这是分类，不是痛点） |
| `solves` | "查一件事要开好几个网页才能拼出答案。豆包把搜索、写作和文件处理放在一起，直接问就行。" | "赋能用户高效获取信息"（营销填充物） |
| `best_for` | "When a meeting ends and someone has to write up what was decided." | "For productivity and efficiency."（什么都没说） |

- 英文 12–28 词，中文 20–45 字。说人话，不用「赋能 / 革新 / 无缝」这类词。
- `tags` **不要**再抄一遍——卡片上已经不放标签行了，标签只用于筛选。
- 中英两个字段都必须写。中文产品也要有英文版，反之亦然：站内两种语言都要读得通。
- 字段约定固定：`solves`/`best_for` 永远是英文，`solves_zh`/`best_for_zh` 永远是中文，
  与产品来自哪里无关。中文产品的英文写在基础键里，不要另开 `_en` 键——校验器和投影都只认这一对。

### desc —— 一句话摘要，不能截断

`desc` 是产品名下方的**一句话摘要**，回答「这是什么东西」。

**长度按本仓实际分布取值**（只数中文字符，不含英文单词与标点）：既有 226 条的
`desc_zh` 是 min 5 / 中位 17 / p90 22 / max 31 字，写 **10–30 字**就是房格。
英文 `desc` 的上限确实是 12 词（既有最长正好 12）。

> 别拿拍脑袋的整数当上限。定长度上下限之前先量一遍既有数据的分布，否则新写的
> 会跟旁边的卡片明显不是一个调子——这条已经踩过一次了。

**绝对不要**用 `solves[:90]` 这类截断去凑数：截断会切在词中间，卡片上会出现
「…and n」「…with no help. Co」这种碎片，比不写更糟。校验器会拦：

- `desc` 必须是 `solves` 的**前缀**（说明是截断）→ 报错
- `desc_zh` 与 `solves_zh` **完全相同**（说明是照抄）→ 报错
- `desc` 超过 14 词 → 报错

好例子：
- `dots` → "A ChatGPT agent that keeps running in the cloud after you leave." / "关掉标签页也在云端继续跑的智能体。"
- `adobe-generative-fill-in-photoshop` → "Remove an object from a photo by describing it in words." / "用一句话去掉照片里的物件。"

### revisions[] 只能记真实变化

`from == to` 的修订是噪声，会让下一个读账本的人以为发生过一次修改。记不下变化就**不要写这条**。

### surface —— 它住在哪

`standalone`（独立入口）/ `in-product`（集成在另一个产品里）/ `plugin` / `extension`。

**`in-product` 是一类必须收录的产品。** 判据：如果用户只能先打开一个更大的产品才能用到它，
它就不是 `standalone`。大厂把 AI 能力做进已有产品是主流形态——ChatGPT 里的 Dots、
Microsoft 365 里的 Copilot、Figma 里的 AI、钉钉/飞书里的 AI 助手。
**漏掉这类，就等于漏掉用户最常打开的那个入口。**

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

## 3. category

11 个类别，以 `data/products/taxonomy.json` 为准（校验器按那里的 id 校验）：

`chat-assistant`、`coding-agent`、`agent-platform`、`model-platform`、`developer-sdk`、
`enterprise-api`、`search`、`multimodal-creation`、`local-runner`、`eval-observability`、
`meetings`。

`meetings`（会议与纪要）是后加的：会议助手既不是聊天助手也不是 Agent 平台，
塞进 `agent-platform` 会让按分类浏览的人永远找不到它们。**遇到明显不属于现有类别的产品，
先加类别再加产品**，不要硬塞进最接近的那个。

## 4. tags

- 二级能力标签，kebab-case，2–4 个。
- **不要把 category 抄一遍**（`agent-platform` 已经是分类了，tag 再写一次是噪声）。
- 面向筛选，不是面向 SEO。没有公认说法就不要硬造。
