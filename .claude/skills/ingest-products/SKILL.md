---
name: ingest-products
description: learn-ai 仓的 AI 产品增量入库流程：从上次检查点（账本最大发布日）之后的窗口发现新发布或此前遗漏的 AI 产品，核实官网与首次公开发布日期，按产品档 schema 写入 data/products/products/，更新投影 data/products/products → product-hub.js，过数据层与投影陈旧两道门禁后提交推送。只要用户提到"增量捞取/扫描/入库新产品、更新产品时间轴、补新产品、跑一次产品入库、按厂商补产品"，都应使用本技能——即使用户没有说出"入库"两个字。
---

# AI 产品增量入库（ingest-products）

## 你在做什么，为什么这样做

`/products/` 与 `/zh/products/` 页面上的每一个产品卡片、时间轴结点、分类计数、场景选型列表，全部是构建时从**产品账本**（`data/products/`）现算的派生视图。所以本技能只做一件事：**把经过核实的产品档案写进账本**，然后让构建与门禁保证站点正确。**不要手改 `docs/.vitepress/theme/data/product-hub.js`，也不要手改任何 HTML 或构建产物**——它是生成物。

字段语义与判定口径的唯一所有者是本技能 `references/product-schema.md`；厂商入口与发现渠道见 `references/discovery-channels.md`。**动手前先读这两份**，本文件不复制其内容。

**本技能与 evals 仓 `ingest-releases` 的两点刻意差异**（不要照搬那套）：

1. **不归档正文。** evals 会把模型发布页 HTML 抓下来存进 `models/`。本技能**不抓取、不保存**产品发布页内容——只留元数据与一句话简介。产品会改版，存下来的 HTML 明天就是误导。
2. **面向普通用户。** 页面最终给的是想选工具的普通人，不是做数据审计的人。`desc` / `desc_zh` 写读者语言，**禁止**把内部流程词（账本、检查点、窗口、已核验、待核验、证据）写进面向读者的字段。

**dry-run 模式**：用户说"先看看有什么新的 / 别写文件 / dry-run"时，只执行第 0、1 步并输出候选清单，不写任何文件。

---

## Step 0 · 前置与增量窗口

1. 记录 `git status` 与基线 commit。独立入库要求工作区干净；与用户授权的修复同批执行时，只提交本任务变更，不回滚或混入无关工作。
2. 计算扫描窗口：

```bash
node scripts/products/checkpoint.mjs status
```

输出里的 `window_since → window_until` 就是本次发现窗口。锚点会自动回退 14 天重叠——产品官网可能事后补印发布日期，搜索索引也可能滞后于实际发布。

3. 门禁基线必须先是绿的，否则分不清是你弄坏的还是本来就坏：

```bash
node scripts/products/validate-products.mjs && node scripts/products/build-hub.mjs --check
```

---

## Step 1 · 发现增量产品

先看覆盖缺口，再看增量：

```bash
node scripts/products/coverage-audit.mjs
```

它按 `references/discovery-channels.md` 的两张矩阵（大厂产品线、品类下限）报出「该有却没有」的位置。
**这是漏检的主要防线**——账本不会因为漏了三个月前的产品而报错，只会安静地少一格。

然后按 `data/products/vendors.json` 的在册厂商分区派发。`coverage_tier: 1` 的厂商必扫，`2` 的低频扫。

对每个分区：

- 检索窗口内新发布的产品，以及**存量漏网**的产品（新厂商、新产品线、被并购后改名）。
- 每条候选记录：**厂商、���品名、官方首页 URL、首次公开发布日期、日期的证据来源**。
- 官方域名白名单外的传闻站、聚合站、榜单站一律不作为来源；发现无一级来源 → 不建档，进报告的「跳过清单」。
- **不要把一个产品的不同版本当多个产品**（同一款 IDE 的 v2/v3 是同一产品）；也不要**把同一产品的不同形态拆成多条**（Claude.ai / Claude Code / Claude Desktop 是三个产品，因为它们是三个独立的入口与订阅）。
- **覆盖完整性铁律**：不可把厂商等同于单一旗舰品牌。字节跳动必须覆盖豆包、扣子、Trae、火山方舟；腾讯必须覆盖混元、元宝、元器、CodeBuddy；阿里必须覆盖千问、通义、灵码/Qoder、百炼。漏一个就是整条产品线从时间轴上消失。

dry-run 到此为止：输出候选清单后结束。

---

## Step 2 · 逐产品建档

对每个候选/需复核的产品：

1. **核实官网**。抓一次，确认它解析到该产品且不是 404。遇到 403（Cloudflare 等反爬）**不算核实通过**——记 `notes` 注明"官网反爬未确认"，不要凭记忆断言它可用。
2. **核实首次公开发布日期**。日期必须有证据：官方发布文 / 官方博客 / RSS / 官方公告。**凭记忆的日期一律不收**。只知道年月就用该月 1 日，并在 `notes` 写明"仅精确到月"。
3. **判场景与形态**。`use_cases` 从 `data/products/use-cases/*.json` 里选 1–3 个——按**普通用户会为什么事用它**来选，不是按厂商的自我定位。`form` 从 `cli|ide|web|desktop|api|self-hosted` 选。
4. **判手册状态**。已有本站手册 → `written` + `route`（必须双语都有）。没有但**值得后续写**的（用户会问"这个怎么用"的主流产品）→ `candidate`。其余 → `none`。**这是后续决定写哪些学习手册的依据，不要留空。**
5. **写产品档** `data/products/products/<id>.json`，逐字段模板见 `references/product-schema.md`。
   - `id` 全表唯一，供 Vue `:key` 用。取产品名的 kebab slug；**非拉丁名要人工给一个英文/拼音 id**（`lingma`、`bytedance`），不要让 slug 退化成 `x` 或空串。
   - 改既有档案时**只追加**：`notes` 追加说明，字段修正走 `revisions[]`，**不要静默改写**既有的 `released` / `homepage`。
   - 产品已改名或被并入别的产品：`status` 置 `renamed` / `merged`，`superseded_by` 指向新名字对应的档案 id。**不要删除历史条目**——时间轴的价值就在于记录演变。

---

## Step 3 · 门禁（顺序执行，全绿才继续）

```bash
node scripts/products/validate-products.mjs
node scripts/products/coverage-audit.mjs
node scripts/products/build-hub.mjs
node scripts/products/build-hub.mjs --check
node scripts/product-docs-audit.mjs
pnpm docs:build
```

> **环境提示**：Windows 下调试 .mjs 脚本时，避免在命令行直接拼接含复杂 JSON 的命令，建议写入临时 `.mjs` 文件运行。

然后本地起服务（`pnpm docs:preview`）抽查：

- `/products/` 时间轴出现新结点，位置在正确的年份段；
- `?use=<新场景>` 能命中新产品；
- 新产品带 📖 的手册链接点得开（`written` 状态才该有链接）；
- 中英页面各自取到正确文案；
- 全文没有出现内部流程词。

---

## Step 4 · 收口

1. 记录扫描检查点（锚点只前进不回退）：

```bash
node scripts/products/checkpoint.mjs commit --max-release-date <本批最大发布日>
```

2. 在 `data/products/generated/` 之外**不要**新建审计文件；检查点文件本身就是审计轨迹，且随 git 可追溯。
3. 提交并推送。commit message 沿用仓内风格（英文、`feat:`/`fix:` 前缀、一行说清本批增量）。
4. 向用户交付报告。

---

## 交付报告模板

```
## 产品增量入库报告（window_since ~ today）
- 新增产品：N 个（逐条：vendor / 产品 / 首次发布日与证据来源）
- 补录此前遗漏：M 个（逐条：vendor / 产品 / 为什么之前没进账本）
- 修正既有档案：K 个（逐条：产品 / 改了什么 / 依据）
- 官网未确认：清单（产品 — 原因：404 / 反爬 403 / 域名变更）
- 日期仅精确到月：清单
- 跳过清单：产品 — 原因（无一级来源 / 只是版本更新 / 同一产品的重复入口）
- 手册候选：本次新增 candidate 的产品（后续据此决定写哪些学习手册）
- 门禁：validate-products ✓ / build-hub --check ✓ / product-docs-audit ✓ / build ✓
```

---

## 红线（违反任何一条 = 本批无效）

1. **不臆造**：官网没核实就说核实了、日期凭记忆就写进 `released`——一律禁止。读不到就写进报告的待确认清单。
2. **无官方一级来源不建档。**
3. **只追加**：不改写既有产品档的 `released` / `homepage`；勘误走 `revisions[]` 并在报告说明。
4. **不删历史条目**：产品改名、被并购、并入别的产品，都用 `status` + `superseded_by` 表达，不删档。
5. **不并行写共享文件**：`taxonomy.json` / `vendors.json` / `use-cases/` / `product-hub.js` 由收口阶段单进程改写。并行 agent 各自只写自己分区厂商的 `data/products/products/<id>.json`，天然无冲突。
6. **不手改生成物**：`product-hub.js` 只能由 `build-hub.mjs` 生成。
7. **公开文案不出现内部流程词**（已核验 / 待核验 / 账本 / 窗口起点 / 证据链），一律读者语言。
