# Claude Design:前端工程师使用手册

Claude Design 是 Anthropic 于 2026 年 4 月 17 日作为 Anthropic Labs 的研究预览产品发布的全新 AI 设计界面,它为前端工程师关心的闭环而设计:吸收一个代码库、生成符合品牌规范的原型、通过对话迭代,然后把结果交接给 Claude Code 去发布上线。它由 **Claude Opus 4.7**(Anthropic 最强的视觉模型)驱动,在 onboarding 阶段会读取你真实的代码仓库——颜色、字体、组件命名、间距规范、状态模式——并把之后每一个项目都视作这个系统的延伸,而不是一张白纸。

需要理解的战略定位是:**Claude Design 是探索端的前台,Claude Code 是生产端的后台,Canva 是下游的发布出口**。Figma 明显不在导出目标之列。本手册教你如何利用这个闭环更快地做网站,而不是被工具拖累。

---

## 概览:Claude Design 究竟是什么

Claude Design 让你描述一个网站、原型、落地页、演示文稿、或前沿交互(shader、3D、语音、视频),几秒内返回一个工作版本且符合品牌规范。它**只跑在 Web 端,访问地址 claude.ai/design**,采用左右双栏界面:左侧对话、右侧实时画布。底层一切皆代码——通常是渲染到画布 artifact 里的 HTML/CSS/JS——这就是为什么**"导出为独立 HTML"和"交接给 Claude Code"是工程师天然的终点**,而 Canva、PDF、PPTX 服务的是非工程端。

有三个设计原语让它区别于 v0、Lovable、Bolt 和 Figma Make。

第一,**设计系统从真实代码库中抽取**(GitHub 仓库链接或本地目录上传),并提炼成组织级的系统,每一个未来项目都自动继承——颜色 token、间距规范、字体、组件结构、CSS 方式(Tailwind、CSS Modules、styled-components 都能识别)、框架模式。

第二,**Web capture 工具可以抓取任意 URL 的实时元素**,让原型能贴合真实产品,而不是粗略模仿。

第三,**细粒度控制结合了四种编辑模式**:对话式的结构性 prompt、针对具体元素的 inline comment、画布上直接文字编辑、**adjustment knobs——Claude 根据每个设计动态生成的滑块**,用于间距、颜色、圆角、栅格、透明度、字体。

模型选择也影响输出质量。Opus 4.7 有明显的"个人风格"——暖色米白背景(约 #F4F1EA)、衬线展示字体、斜体点缀、陶土色调——这让编辑风和作品集类的作品很美,但**在仪表板、开发工具、金融科技、企业级 UI 上会翻车,除非你显式反向 prompt**。预算方面,Opus 4.7 价格为输入 $5/M tokens、输出 $25/M tokens,而 Claude Design 使用自己的每周配额,独立于 Claude 日常对话和 Claude Code——把这个配额视为硬约束。

### 各套餐可以用到什么

| 套餐 | 访问权限 | 配额画像 | 备注 |
|---|---|---|---|
| **Pro** | 默认开启 | 快速探索,一次性使用 | PCWorld 评测者 25 分钟 3 个变体烧掉周配额 80%,请量力而为 |
| **Max 5x** | 默认开启 | 半常规使用——PM 和工程师做常规 mockup | 适合稳定出活的前端工程师 |
| **Max 20x** | 默认开启 | 重度使用——设计师和创意工作者 | 真正的生产量级 |
| **Team** | 默认开启 | 按席位每周配额(Standard / Premium) | 支持组织范围的共享 |
| **Enterprise(传统席位)** | **默认关闭**——管理员需开启 | 按席位每周配额,分 Standard 和 Premium | 通过自定义角色(RBAC)控制 |
| **Enterprise(按用量计费)** | 默认关闭 | 标准 API 价格;**一次性额度约 20 个 prompt,2026 年 7 月 17 日过期** | 额度先于组织账户消耗 |

配额**按用户独立,不共享**。超出后可按 API 价格购买额外用量。没有免费方案。目前还不支持数据驻留;审计日志和用量分析也尚未就绪——这些都是 Labs 时期的已知空缺。

---

## 快速上手:前 30 分钟

打开 **claude.ai/design**,或点击 claude.ai 左侧边栏的调色板图标。Enterprise 用户如果看不到,让管理员去 *Organization settings → Capabilities → Anthropic Labs → Claude Design* 打开开关。首页提供四种项目类型——原型(线框或高保真)、幻灯片、从模板开始、其他——左侧是项目设置面板,右侧是设计档案。

**所有事情开始之前,先把 design system 设好**。多位一手评测者都说这是单步收益最高的动作,它决定了"通用 AI 输出"和"看起来就是我们家产品"的分水岭。从 *Organization settings → Design system* 进入,可以选择链接 GitHub 仓库、上传本地目录,或者单独上传品牌资源(字体、logo、调色板)。

**针对真实代码库,链接一个具体的子目录,不要整个 monorepo**——Chrome 会卡大文件树,而且 Anthropic 明确警告不要包含 `.git/` 或 `node_modules/`。预计大型代码库需要 15–20 分钟吸收完毕,纯资源上传不到 5 分钟。Claude 处理完颜色系统、字体、组件清单(按钮、卡片、弹窗、导航)、间距规范、框架模式之后,记得打开 **Published** 开关,这样每个新项目都会应用这个系统。团队可以维护多个系统来支持多品牌场景,**Remix** 按钮会打开一个对话式编辑器,让你之后细化 token。

配置完成后,第一个项目就可以跑了:在对话框里描述你想要什么、看 Claude 在画布上生成、迭代。Claude 会主动抛出澄清问题——**请认真具体地回答**,评测者普遍反馈这轮开场对话决定了最终质量的大部分。

---

## 建站工作流:四种端到端模式

### 模式 1:全新营销页或落地页

适用于你有品牌规范但没有具体页面先例的场景。在画布上用结构化 prompt 开始(模板见下文),让 Claude 问它的 3–5 个澄清问题,接受首版,然后按这个顺序迭代——对话处理结构、inline comment 处理区块、滑块处理微调、直接编辑处理文案。

布局稳定后,提 `"给我展示注册表单的空态、错误态和加载态"`,让这些变体也进入导出包。最终导出为 **standalone HTML**(用于静态托管部署)或**交接给 Claude Code**(如果你想要针对仓库里已有组件写出生产级代码)。

### 模式 2:重建或扩展现有产品页

这里 **web capture** 就真正派上用场。代码库已经链接好的前提下,开一个新项目并 prompt:`"用 web capture 抓取 acme.com/pricing 的 hero 区和 pricing 区,然后用我们的 design system 重建这个页面,但把定价档位替换成这三档:[具体内容]"`。

Claude 会拉取实时 DOM、把视觉元素映射到你的 token 上、渲染一个视觉上忠实但由真实组件构建的版本。Brilliant 报告这种模式把复杂页面从**在其他工具里的 20+ prompts 压缩到 Claude Design 里的 2 个 prompt**。

### 模式 3:仪表板或数据密集型 SaaS UI

Opus 4.7 的编辑风默认美学在这里是负资产。**必须显式反向 prompt**:写明"密集信息布局、无衬线字体(避免 Inter/Roboto/系统字体)、可选暗色主题、数据优先层级、最小化装饰"。通过组件名引用你的 design system(`"使用 PrimaryButton、DataTable、FilterChip"`)。

**一开始就要 2–3 个布局变体**,而不是对一个烂选项反复迭代——既省 token 也更快收敛。交互状态要这样 prompt:`"添加筛选交互、按列排序、点击行打开抽屉的钻取"`。在交接之前,带着 Claude 走一遍空态、错误态、加载态。

### 模式 4:代码之前的多方评审

当设计需要共识时,分享一个**组织范围的链接**,给评论或编辑权限。编辑权限会解锁**和 Claude 的群聊**,所以多位同事可以在同一个画布、同一个对话里一起迭代——这和 Figma 的多人光标模式功能上就不是一回事,按 HN 早期评测者的说法,**在对话式工作里可能是更强的协作模型**。

达成共识后,用 `"保存现在这个版本,试一个完全不同的方向"` 做个快照分支,再交接下一步。

### 官方的端到端闭环流程

摘自 Anthropic 自己的 tutorial:**(1)** prompt 描述功能 → **(2)** Claude 根据组织 design system 和链接的代码库生成首版 → **(3)** 通过 inline comment 和对话迭代 → **(4)** 分享内部 URL 做异步评审 → **(5)** 生成替代方案 → **(6)** 验证是否使用了真实组件 → **(7)** 导出 → 交接给 Claude Code → **(8)** Claude Code 从原型出发写生产代码,而不是从零开始。

---

## 提示词模板:复制即用

官方的 prompt 结构是 **Goal + Layout + Content + Audience**(目标 + 布局 + 内容 + 受众)。漏任何一项 Claude 都会追问——具体地回答。以下模板把这个结构内建进去了。

### 营销页 / 落地页

```
为 [产品名] 构建一个落地页,它是 [一句话定位]。
受众:[主要用户画像、痛点、专业程度]。
从上到下依次包含:hero 区(含 [具体 CTA])、社会证明条、
三栏特性网格、交互式 demo、定价(3 档:[档位名])、FAQ、页脚。
语调:[例如技术但亲切、非销售导向]。
使用我们的 design system,优先 [暗色|亮色] 主题。
给我 hero 区的 2 种布局变体。
```

### 定价页

```
设计一个定价页,3 档([档位名])加一张企业咨询卡。
包含月付/年付切换(展示 % 省多少)、定价卡下方的特性对比表、
FAQ 区块。中间档位在视觉上推荐。使用我们的 PrimaryButton 
和 PricingCard 组件。受众:[技术决策者 | 中小企业主]。
```

### 产品页 / SaaS 应用界面

```
为 [产品] 设计一个 [页面名]。这是一个 [数据密集型仪表板 |
内容优先的阅读界面 | 交易型工作流]。
关键元素:[列表]。
交互:[列表,例如筛选、排序、钻取]。
尽可能用组件名引用我们的 design system。
反制默认美学——我要无衬线字体、密集信息层级、中性灰加单一强调色、
不要奶油色和衬线字体。
包含空态、加载态、错误态。
```

### 复刻 / 重建已有页面

```
用 web capture 工具抓取 [URL] 的 [区块名]。
用我们的 design system 重建它。保留 [要保留的:
信息层级、交互模型],但替换 [要改的]。
给我展示结果,并旁边对照被抓取的原版。
```

### 投资人站 / 演示站

```
[N] 页的投资人展示站,面向 [阶段] [品类],行业 [行业名]。
受众:[投资人类型]。一页带走的结论:[具体数字支撑的结果]。
章节:问题、解决方案、demo、业务进展、团队、诉求。
语调:[自信 / 克制]。使用我们的品牌。
```

### 前端美学配置块(来自 Anthropic Cookbook)

当 Opus 4.7 的默认"AI 范"冒头时(居中的紫渐变在白底上、Inter/Roboto、Space Grotesk),把这段作为系统级前置贴进去:

```
<frontend_aesthetics>
字体:避免 Inter、Roboto、Arial、系统字体。
优先选择有辨识度的选项:JetBrains Mono、Playfair Display、
Clash Display、Bricolage Grotesque、IBM Plex、Fraunces,
根据内容来选。
颜色:主导中性色加锐利强调色。使用 CSS 变量。
灵感来自 IDE 主题或文化美学,不要通用渐变。
动效:HTML 用纯 CSS,React 用 Motion 库。聚焦一次
精心编排的页面载入时刻,配合 staggered 揭示。
背景:分层渐变或几何图案,不要纯色填充。
避免:紫渐变白底、居中 hero、通用卡片。
</frontend_aesthetics>
```

### 迭代提示词模式

- **结构性变更用对话**:`"把定价表重排到特性网格上方,在 hero 和特性之间加一个证言轮播"`
- **组件级编辑用 inline comment**:`"把这个按钮的 padding 加大"`、`"把这里改成下拉菜单"`、`"这里用主品牌色"`
- **微调用滑块**:`"给我滑块控制 hero 间距、圆角、强调色透明度"`
- **文案修改直接点击元素编辑**
- **分支保留原版不丢失**:`"保存现在这个版本,试一个完全不同的方向——更极简、更编辑风"`

---

## Claude Code 集成:handoff bundle

handoff bundle 是工程师眼里的杀手锏,也是 Brilliant 团队形容"原型到生产无缝跳跃"的原因。从任意项目的导出菜单(右上角),选**交接给 Claude Code → 发送到本地编码 agent** 或 **发送到 Claude Code Web**。

### bundle 里究竟装了什么

- 项目的设计文件
- **完整的对话记录**(每个设计决策和推理过程都随之转移)
- 一份 **README 指导接收模型如何理解设计**
- 一段**预构建的 prompt,包含 bundle 的 URL**,你粘贴进 Claude Code 即可

这不是 API 推送,是基于 URL 的文件投递模式。Claude Code 下载 bundle、读取 README、把它当作项目工作区来操作。bundle 的 JSON schema 目前不公开。

### 为什么对话记录比视觉稿更关键

tutorial 说得很明白:*"如果你在设计对话中用具体名字提到过组件,那些名字会带进 handoff"*,以及 *"当你在迭代中做出设计决策('我们选了 tab 而不是侧边栏,因为用户需要同时看到所有区块'),这个推理过程就成了实现阶段的上下文"*。

实践中这意味着:**你在设计时如何说话,决定了下游代码的质量**——命名组件、陈述理由、探测边缘情况。

### 框架选择是中立的,由你的仓库决定

因为 Claude Design 和 Claude Code 能指向同一个代码库,Claude Code 会用你仓库已有的框架和 styling 方式来写——React、Vue、Tailwind、CSS Modules、styled-components 都经第三方评测者确认可用。Anthropic 不把输出锁死在特定框架上;你的仓库决定一切。

### 导出前 checklist

按 enter 前,过一遍这个清单:

1. 在对话中用名字引用过组件吗?
2. 记录过设计理由("我们选 tab 因为…")吗?
3. 生成过空态、错误态、加载态吗?
4. 验证过移动端/平板/桌面端响应行为吗?
5. 无障碍审查做过吗?——`"审查这个设计的对比度、层级、键盘导航"`,把发现的问题都处理掉

每一项都会进入 bundle,减少 Claude Code 里的来回。

---

## 导出和 Canva:选对目标

右上角的导出菜单给你 7 条路径。按受众来挑。

| 目标 | 实际得到什么 | 适用场景 |
|---|---|---|
| **独立 HTML** | 自包含 HTML,CSS 内嵌;交互(语音、视频、shader、3D、AI)以代码保留 | 静态托管部署、demo、和工程快速分享 |
| **交接给 Claude Code** | 设计文件 + 对话 + README + prompt URL | 针对真实仓库的生产级实现 |
| **发送到 Canva** | **完全可编辑的** Canva 设计,不是扁平图片——通过 Design Engine 进入 Canva Visual Suite | 营销打磨、品牌团队接手、社交/发布 |
| **下载为 .zip** | 完整项目文件夹 | 归档、离线交接 |
| **导出为 PDF** | 静态渲染 | 利益相关者评审、邮件附件 |
| **导出为 PPTX** | PowerPoint/Google Slides 文件 | 高管汇报、客户演示 |
| **组织内部 URL** | 仅查看、评论,或编辑权限 | 异步团队评审;编辑权限解锁和 Claude 的群聊 |

### Canva 是深度集成,不是简单导出

这个合作关系从 2025 年 7 月 Canva 发布 **Canva MCP for Claude** 就开始了;2026 年 1 月加入了品牌感知生成;4 月 17 日上线原生的 Claude Design 导出。

底层使用 Canva 的 **Design Engine、Visual Suite、以及 Canva AI 2.0 新增的 HTML 导入能力**。设计会作为结构化、可编辑的对象落地,遵守 Canva Brand Kits,可以嵌入 Canva Presentations、连接 Canva Forms/Sheets、或者以自定义域名发布为 Canva Website。

反向流程(Canva → Claude Design)不是原生导入,但 Canva MCP 已经允许 Claude 在日常对话中读取 Canva 内容。

### Figma 的缺席是刻意的

Anthropic 首席产品官 Mike Krieger 在发布前三天从 Figma 董事会辞任;Figma 股票在发布当天下跌约 5–7%。如果你需要 Figma,评测者推荐走已有的 **Figma MCP server + Claude Code** 路径——这条路独立于 Claude Design。

---

## 最佳实践:会复利的技巧

**Design system 配置是单步 ROI 最高的动作**。没配就通用、配了就每个项目继承你的品牌。第一天就做、用真实 GitHub 仓库而不是上传的资源、链接子目录而非 monorepo。

**按变动大小匹配编辑模式**。对话处理结构变化(布局、区块、主题),inline comment 处理组件级编辑,滑块处理实时微调,直接点文字编辑处理文案。**能微调就别重生成**——重生成烧配额且丢上下文。

**具体到数字**。`"把表单字段间距压缩到 8px"` 优于 `"这里看起来不对"`。`"用 #0F172A 替换现在的近黑色"` 优于 `"再暗一点"`。像素和 hex 值能短路澄清问答的循环。

**一开始就要 2–3 个方案**。并排比对快过对单个烂方案的反复迭代——既更快收敛也更省 token。

**对非编辑风的工作,反制 Opus 4.7 的默认风格**。模型默认奶油色 / 衬线 / 陶土——作品集美,但仪表板、开发工具、金融、医疗、企业管理后台不适用。显式 prompt 无衬线、数据密度、暗色或中性主题。

**管理你的配额**。清理类任务(文案编辑、小幅重排)**降级到 Sonnet 4.6**,生成和结构性移动保留给 Opus 4.7。PCWorld 评测者 25 分钟烧掉 Pro 周配额的 80%——这个上限是真实的。

**迭代时在对话里记录理由**,因为对话记录本身就是给 Claude Code 的交接。"我们选 tab 而不是侧边栏,因为用户需要同时看到所有区块"——这段话在下游就是实现上下文。

**交接前探测完整性**。让 Claude 展示空态、错误态、加载态;要一次无障碍审查(对比度、层级、键盘导航);验证移动端/平板/桌面端。这里发现并修复的每个问题,都是 Claude Code 里省下的一次往返。

### 三个最容易犯的错

- **跳过 design system 配置**:原型变得通用、不像你的产品
- **反馈含糊("让它好看点")**:烧 token 烧迭代——给个具体数字
- **搞混 Undo 和 Back**:**可以不可逆地清掉整个 session**——PCWorld 的评测者就这样丢过完整工作

### 已知 bug 和绕行方案

- Inline comment 偶尔在 Claude 读取前消失——把评论文字粘贴进对话
- Compact 视图下的保存报错——切换到 full 视图
- 对话的上游错误——在同一个项目里开新对话 tab
- 大型 monorepo 让浏览器卡——链接具体子目录

---

## 结语:闭环本身就是产品

Claude Design 的赌注是:现代产品工作的正确原子单元不是 Figma frame 也不是 React 组件——**而是一次能在两个方向产出 artifact 的对话**。对于建站的前端工程师,这意味着只有把它当作 Claude Code 的前门、而不是终点,这个工具才会产生复利效应。

一次性吸收你的仓库、用组件名说话、迭代时记录理由,然后让 handoff bundle 把完整设计对话搬进生产。结果最强的团队——Brilliant 从 20+ prompt 降到 2 个、Datadog 把一周评审压缩进一次对话——并不是把 Claude Design 当作更漂亮的 v0;他们把它当成一个**共享上下文的原型层,用来喂养他们已有的代码库和已有的 Claude Code 工作流**。

研究预览期的限制是真实存在的(每周配额会咬人、没有审计日志、没有数据驻留、没有 API、多人协作粗糙),但对于已经活在 Claude Code 里的工程师,这个集成闭环是 Anthropic 迄今发布的杠杆率最高的设计工具。

---

## 参考资料

- [Introducing Claude Design by Anthropic Labs](https://www.anthropic.com/news/claude-design-anthropic-labs) — 官方公告
- [Claude Design 产品入口](https://claude.ai/design)
- [Get started with Claude Design](https://support.claude.com/en/articles/14604416-get-started-with-claude-design) — 官方快速上手
- [Claude Design 订阅和定价](https://support.claude.com/en/articles/14667344-claude-design-subscription-usage-and-pricing)
- [Team 和 Enterprise 管理员指南](https://support.claude.com/en/articles/14604406-claude-design-admin-guide-for-team-and-enterprise-plans)
- [Design system 配置指南](https://support.claude.com/en/articles/14604397-set-up-your-design-system-in-claude-design)
- [Claude Design 原型和 UX tutorial](https://claude.com/resources/tutorials/using-claude-design-for-prototypes-and-ux)
