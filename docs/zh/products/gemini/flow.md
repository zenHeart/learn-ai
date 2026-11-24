---
title: Google Flow
description: Google 的 AI 创意工作室。用英文提示词生成几秒到十几秒的视频片段，再用 Scenebuilder 排成一部成片。本页讲清能不能用、10 分钟怎么做出第一段、积分怎么扣、常见坑怎么躲。
domain: product
tags:
  - coding-agent
role: tutorial
pageClass: wide-figures readable-tables
---

# Google Flow

> Google 的 AI 创意工作室（官方叫法 **AI creative studio**）。它解决的问题是：前端工程师要给落地页、产品发布、内部评审配一段视频，但没拍过片子，也不想学剪辑软件。在 Flow 里，你用一句英文描述生成几秒到十几秒的片段，再把片段排成一部成片。
>
> 它**不写代码**。落地页宣传片、产品演示视频、场景分镜用它；要能点的页面用 [Canvas](./canvas)。
>
> 入口：[labs.google/fx/tools/flow](https://labs.google/fx/tools/flow)。帮助中心：[support.google.com/flow](https://support.google.com/flow)。

本页的界面步骤、额度、地区信息**截至 2026-11-24** 逐页核对官方帮助中心。这些内容会变，以你界面里显示的为准。

| 项目 | 说明 |
|---|---|
| **写给谁** | 会写前端代码、没做过视频、没用过生成式视频工具的工程师 |
| **先决条件** | 一个 Google 账号；年满 18 岁并通过年龄验证；人在官方支持的国家或地区；电脑上有 Chrome 或 Edge 这类 Chromium 内核浏览器 |
| **非目标** | 不教剪辑软件；不教 Veo / Imagen 的 API 调用，那是 [AI Studio](./ai-studio) 的事；不教 Flow Music，它做歌曲与 MV，积分体系分开 |

## 学完你能做什么

- 判断自己**能不能用**：年龄、地区、套餐三条各是什么要求。
- 在 **10 分钟内做出第一段视频**并下载成文件。
- 按「手头有什么素材」**选对生成模式**：只有一句话、有一张图、有角色参考图，还是有一段现成视频。
- 用 Character、ingredients、首尾帧让**多段素材里的角色和场景保持一致**，再在 Scenebuilder 里排成一部成片。
- **看懂积分怎么扣**，认出常见报错：哪一步花钱，哪一步不花；每个坑对应官方哪句说明。

## 我能不能用：年龄、地区、语言、套餐

官方列了三条：年龄已验证且满 18 岁；人在支持地区；要用部分功能，还需要 Google AI 订阅。逐条展开。

### 年龄：满 18 岁，且通过年龄验证

帮助中心原文：「Make sure your age is verified. You must be 18 years of age or older.」年龄验证挂在 Google 账号上。

### 地区：中国大陆不在列表，香港、澳门、台湾在

[Where you can use Google Flow](https://support.google.com/flow/answer/16353544) 的说明是：「You can use the Google Flow Desktop platform and download the Google Flow mobile app in these countries and regions.」截至 2026-11-24，该页按字母序列出支持的国家与地区。

| 我在哪里 | 在不在支持列表 | 依据（官方页原文） |
|---|---|---|
| 中国大陆 | **不在** | 列表按字母序排列，`Chile` 之后直接是 `Colombia`；整页没有出现 `China` |
| 香港 | **在** | `Hong Kong` |
| 澳门 | **在** | `Macau` |
| 台湾 | **在** | `Taiwan` |

两条相关的官方说明：

- **VPN 没用**：「VPNs will not enable access in unsupported regions.」
- **买了 AI Pro 也不一定能用**：「Google Flow is not currently available in all countries where Google AI Pro is offered.」官方建议买订阅前先查支持列表。

部分功能还按地区收紧，同一页写明：

| 功能 | 不开放的地区 |
|---|---|
| 编辑上传的视频 | 欧洲经济区（EEA）、瑞士、英国 |
| Avatar（你本人的形象） | 欧洲经济区（EEA）、瑞士、英国 |
| 购买 AI credits | 日本 |

### 语言：界面有简繁中文，提示词建议写英文

官方页写「Google Flow is currently available in these languages」，列表里有 `Chinese (Simplified & Traditional)` 和 `Cantonese`。界面语言跟 Google 账号设置走：「You can update your preferred language in your Google Account settings.」

提示词方面，官方的原话是建议英文，不是只支持英文：「For best results with our tools, we recommend using English prompts. While some of our products may support prompts in other languages, the quality of the generated output may vary depending on the language and complexity of the prompt.」

> 本页旧版写「只能用英文向 Flow 发提示，回复也是英文」，出处标的是 [Google AI Pro 权益页](https://support.google.com/googleone/answer/14534406)。2026-11-24 核对：那句话（「Only English is supported for prompts and instructions」）在该页属于 **Google Antigravity** 一节，不是 Flow。Flow 自己的页面只说「建议英文」。

### 套餐：不订阅也能试用

| 套餐 | 能用的功能 | Flow 积分（截至 2026-11-24） |
|---|---|---|
| 无订阅 | 基础的视频生成与编辑。Omni Flash 1.2 可生成 3 到 10 秒；Veo 3.1 Lite 可生成 4、6、8 秒 | 每天 50 |
| Google AI Plus / Pro / Ultra（Ultra 分两档） | 完整功能。Omni Flash 1.2 可生成 3 到 15 秒；Omni Extend；把 360p 放大到 1080p（4K 仅 Ultra）；创建与 remix Tools | 每天 50，另加每月 200 / 1,000 / 10,000 / 25,000（依次是 Plus、Pro、Ultra 两档） |
| 符合条件的 Workspace 套餐 | 官方写「get access at no extra charge to Google Flow with 50 daily credits」 | 每天 50 |

Workspace 这一条，官方列的套餐是 Business Starter / Standard / Plus、Enterprise Starter / Standard / Plus、G Suite Legacy Free Edition、Education Standard / Plus、Google AI Pro for Education。

不订阅有一条限制：高峰时段（官方写「roughly 2 PM to 5 PM UTC」，即北京时间 22:00 到次日 01:00）可能无法生成视频。这时仍可生成图片、使用 Agent。

### 在哪里用：电脑网页版最全

- **电脑网页版**功能最全。官方：「For the most powerful editing features, go to Google Flow on a computer.」
- **手机应用**用于随手创作。官方：「For creation on the go, download the Google Flow app.」
- **只在网页版有的功能**：Omni Flash 1.2 的 Frames to Video 与 Omni Extend（官方均写「Currently only available at Google Flow on web」）；Tools（「Tools are currently available on web & PC only」）。
- **浏览器**：用 Chromium 内核的，官方举例 Google Chrome 或 Edge。官方提醒其他浏览器与手机「are not yet fully optimized」，可能遇到 bug。

## 核心概念

先认词。左列是你在界面和帮助中心里会见到的说法。

| 术语 | 一句话解释 | 为什么需要 |
|---|---|---|
| **project**（项目） | 一个容器，装着这部片子的全部素材 | 素材、Agent 会话、Tools 都按项目存放；换项目就是换一部片子 |
| **asset**（素材） | 项目里生成的或上传的每一张图、每一段视频 | 加进提示词、排进时间线、下载，都以素材为单位 |
| **generation**（一次生成） | 触发一次模型调用 | 积分按 generation 收，不按你点了几下 |
| **take**（候选片段） | 一次生成可能出好几个结果，每一个是一个候选 | 候选多，挑的余地大，扣分也成倍 |
| **frame**（帧） | 视频里的单张画面；首帧和尾帧决定一段视频从哪开始、到哪结束 | 镜头 A 的结尾要接上镜头 B 的开头，靠帧 |
| **ingredients**（参考素材） | 生成时一并交给模型的参考图或参考视频 | 让同一个人、同一个物件在多个镜头里长得一样 |
| **character**（角色） | 打包好、起了名字的一组视觉与声音参考 | 不用每次重新上传同一批图 |
| **Scenebuilder** | 把多个片段排成一条时间线的地方 | 单段只有几秒到十几秒，成片靠它拼 |
| **scene**（场景） | 在 Scenebuilder 里排好的一串片段 | 预览、下载都以 scene 为单位 |
| **Extend** | 在一段视频后面再续几秒 | 好镜头太短时，不用整段重来 |
| **Jump to** | 让角色或物件换到新场景，外观不变 | 同一个角色换地点，不用重新描述 |
| **aspect ratio**（画幅） | 画面的宽高比 | 落地页横幅与手机竖屏要的比例不同 |
| **resolution**（分辨率） | 360p 草稿、720p 标准，可再放大到 1080p 或 4K | 360p 便宜，适合先试构图 |
| **credits**（积分） | 生成视频时扣的额度 | 决定你这段时间能做多少镜头 |
| **Tools** | 用自然语言描述、由 Flow 写代码生成的小工具 | 字幕条、改画幅这类重复活 |
| **Agent** | 提示词框里的对话式助手 | 帮你写提示词、列分镜、批量出候选 |

几个容易混的，展开说。

### project 与 asset

新建项目点是 **+ New project**。左侧栏可以按类型找素材：All media、Images、Videos、Characters、Scenes、Uploads。素材可以拖进 **Collection**（像文件夹，可以嵌套）。

### generation 与 take

官方博客用过 take 这个词（「the first take isn't the final one」），但帮助中心的步骤里用的是 output（`Number of outputs you want`）。额度页专门强调了一句：「The Google Flow/AI credit costs below are per generation, not per request. Some product features will create multiple generations per request. For example, in Google Flow, you can make a single request that may generate 2 videos.」也就是说，一次要 2 个候选，就是 2 份积分。

### frame

首帧的界面文字是 **+ Add start frame.**，尾帧是 **+ Add end frame.**。你还可以从一段视频里取帧：暂停在某一帧，悬停后点 **Save frame**。

### ingredients 与 character

官方对 ingredients 的说明：「You can consistently use the same images for your character and key objects from one clip to the next with the use of ingredients.」

官方对 character 的说明：「You can bundle specific visual and audio references into a single, reusable character. Your character's face, clothing, and voice remain strictly consistent across multiple generations without needing to upload the same images every time.」

区别：ingredients 是**每次生成时**带上的参考；character 是**建一次、反复引用**的打包参考。提示词里输入 `@` 加角色名就能引用。

### Scenebuilder、Extend 与 Jump to

官方列的 Scenebuilder 能力：排列多个片段、调整顺序、用手柄修剪每个片段的首尾、预览整条序列、下载 scene。官方博客把它叫「your in-Flow storyboard, where you assemble individual clips into a complete narrative」。

官方对 Extend 的说明：「If you need a scene to be longer, you can create more footage and add it to the end of your original clip.」

Jump to 只有官方博客给过定义（2025-06-25）：「Transition a character or object to a completely new setting while preserving their appearance from the previous shot.」

<!-- TODO: 待核实 —— Jump to 在当前产品里是否仍可用、入口在哪里。已查：帮助中心全部 16 篇文章（2026-11-24 实时版）都没有出现 Jump to；只有官方博客 flow-video-tips（2025-06-25）有定义，且当时写的是仅 Veo 2 可用。未在产品内确认 -->

### aspect ratio 与 resolution

帮助中心的模型页对每种模式都写「Both aspect ratios」，没有点名是哪两种。Veo 3.1 Lite 的官方发布文写该模型「offers flexible framing for landscape (16:9) and portrait (9:16) ratios」。

<!-- TODO: 待核实 —— Flow 界面里「Both aspect ratios」具体指哪两个。已查：帮助中心 16352836、16353334、16526234 与博客 veo-3-1-lite；帮助中心只写了「两种」，16:9 与 9:16 是依据模型发布文的推断，未在产品内确认 -->

分辨率方面，Omni Flash 可以在 360p 出草稿，官方写它的积分是 720p 的三分之一。订阅用户可以把 360p 放大到 1080p，Ultra 订阅者可到 4K。

### Tools 与 Agent

- **Tools**：官方定义是「Build custom, reusable tools and mini-apps using natural language in Google Flow」。Flow 自带一批 Google 提供的预设 Tools。
- **Agent**：官方定义是「a built-in creative collaborator」，通过自然对话帮你梳理想法、改提示词、引导生成流程。

## 它是怎么工作的

带着这个问题看下一张图：我输入的一句话、一张参考图，分别被哪个模型接手，最后怎么变成时间线上的一个片段？

<DocDiagram src="/diagrams/google-flow-pipeline.svg" alt="这张图从左到右分四段，回答一个问题：你输入的一句话、一张参考图，分别被哪个模型接手，最后怎么变成时间线上的一个片段。第一段是输入，有三样：文字提示、参考帧（start frame 与 end frame）、参考素材（角色、场景、物件）。第二段是模型。视频模型有两个，Gemini Omni 的 Omni Flash 与 Veo 3.1 的 Veo 3.1 Lite，负责视频生成、视频编辑与对话式迭代，每次生成都消耗积分，按秒或按次计算。图片模型是 Nano Banana 系列（Pro、2.1、2 Lite），负责图片生成与编辑，不消耗积分，走每日上限。第三段是产出：视频模型产出候选片段，图片模型产出图片。第四段是成片，也就是 Scenebuilder 的时间线。连线有六组。第一，文字提示直接进入视频模型。第二，参考帧和参考素材可以随同一次生成一起进入视频模型。第三，视频模型产出候选片段，图片模型产出图片。第四，从候选片段到 Scenebuilder 的箭头标着 Add to Scene，只有你挑中的候选才进入时间线，没挑中的不进入。第五，底部一条向左的虚线从产出的图片回到输入：生成的图片可以再当作后续视频生成的 start frame、end frame 或 ingredient。第六，模型层与 Scenebuilder 之间顶部的双向虚线是 Extend：从已有片段的末尾回到视频模型，生成续接片段后再回到时间线。Scenebuilder 内部，片段按顺序排列，可以拖动调整顺序，可以修剪首尾。本图省略了每个生成模式各自支持哪些模型的对照，因为同一个生成模式往往有多个模型都支持，所以输入到模型之间没有画成一对一；也省略了具体的积分数字、API 调用路径，以及积分体系分开的 Flow Music。" :width="1080" />

> **图的依据：** 四段的划分与各段对象来自帮助中心的[创建视频](https://support.google.com/flow/answer/16353334)、[编辑与搭建场景](https://support.google.com/flow/answer/16935718)和[额度与单次消耗](https://support.google.com/flow/answer/16526234)三篇；模型名以[官方模型页](https://support.google.com/flow/answer/16352836)为准（截至 2026-11-24）。图中保留了四段的对象、六组连线的方向，以及「积分只在视频模型这一层扣」；省略了每个生成模式各自支持哪些模型（同一个模式往往有多个模型支持，所以输入到模型之间没有画成一对一）、具体的积分数字、API 调用路径，以及积分体系分开的 Flow Music。实线是一次生成的主流程，虚线是回流与 Extend。

图里有四个关系要记住：

1. **输入决定走哪条路**。只有文字，就直接交给视频模型。有参考图，它可以作为帧或参考素材，随同一次生成一起进入视频模型。
2. **图片是视频的原料**。Nano Banana 生成的图，可以直接当后续视频生成的 ingredient、start frame 或 end frame。官方说明这些图片模型是用来「create frames and ingredients for your projects」的；从视频里取出的帧同样可用。
3. **模型不止一个，积分在模型这一层扣**。视频由 Omni Flash 1.2 或 Veo 3.1 Lite 生成，扣积分；图片由 Nano Banana 系列生成，不扣积分。
4. **成片在 Scenebuilder 里成形**。每次生成的候选片段先落在项目里，你挑中的才进时间线。

## 10 分钟做出第一段视频

目标：从零做出一段 8 秒、720p 的视频并下载。按官方额度页折算，这一步花 **24 积分**（Omni Flash 1.2 的 720p 是每秒 3 积分）。当天的 50 积分够用。

### 第 1 步：打开 Flow，新建项目

- **做什么**：用 Chrome 或 Edge 打开 [Flow](https://labs.google/fx/tools/flow)，用你的 Google 账号登录（年龄、地区、积分都认账号），然后点 **+ New project**。
- **会看到什么**：一个空项目和一个提示词框。
- **为什么**：素材按项目存放。第一次用，不需要先建角色，也不需要上传参考图。

### 第 2 步：写一句提示词

- **做什么**：在提示词框里用英文描述场景。官方要求写清五样：「Be specific about the subject, action, environment, lighting, and style.」下面是本站写的示例，不是官方原文：

```text
A slow wide shot of a dark studio desk at night. A slim laptop in the center
shows a plain dark dashboard with soft blue charts. A warm desk lamp on the
left lights the keyboard; the rest of the room falls into soft shadow. Fine
dust drifts in the light. The camera pushes in very slowly. No people, no text.
```

- **会看到什么**：提示词框里是你的文字。
- **为什么**：这是 Text to video 模式，只要一句话就能起步。

### 第 3 步：切到视频，选参数

- **做什么**：点模型名，点 **Video**，然后选四项：**Aspect ratio**、**Number of outputs you want**（第一次选 1）、**The model you want to use**（选 Omni Flash 1.2）、**Generation length**（选 8 秒）。
- **会看到什么**：提示词框里出现这四项视频设置。
- **为什么**：官方写「By default, Google Flow sets the model to Nano Banana Pro」，默认是图片模型，不切的话生成的是一张图。候选数量翻倍，扣分也翻倍。

### 第 4 步：生成，等结果

- **做什么**：点 **Generate**。
- **会看到什么**：结果以一个个独立的卡片出现在项目网格里（官方：「your generations now appear as individual tiles」）。等待期间卡片可能显示 **Pending**。
- **为什么**：先看一眼生成的样子，再决定要不要继续。
- **卡住时**：Pending 或报错卡片一直在，就看右上角的系统通知。官方说明，因为政策或积分限制而失败的生成，需要手动重试或删除。

### 第 5 步：挑一个留下

- **做什么**：满意就留着。第一次生成的结果本身就在项目里，帮助中心没有为它设单独的保存按钮。
- **会看到什么**：左侧栏选 **Videos**，能找到这段视频。
- **为什么**：**Save to Project** 用在另一种情况。你编辑过这段视频，想把某个旧版本留下来：点开视频，右侧 **History** 面板里悬停在版本上，点 **Save to Project**。官方说明，旧版本要进 Scenebuilder，得先保存。

### 第 6 步：下载

- **做什么**：鼠标悬停在素材上，点 **More**，再点 **Download**，选文件类型。想要 GIF 就选 **270p**。
- **会看到什么**：浏览器下载一个视频文件或 GIF。
- **为什么**：成片要进你的网页或汇报材料，下载是离开 Flow 的出口。

**这次花了多少**：回到右上角，点头像，头像下方是剩余积分，8 秒 720p 应该少了 24 分。想更省有两个办法：改用 Veo 3.1 Lite，一次生成是 10 分（非 Ultra）；或把 Omni Flash 1.2 的分辨率降到 360p，8 秒是 8 分。不满意时先改提示词，不要连着重试。重试就是再发起一次生成，照常扣分。

## 各生成模式怎么用

[Google AI Pro 权益页](https://support.google.com/googleone/answer/14534406) 列的模式是 Text to video、Ingredients to video、Frames to video、Text to image、Image to image。帮助中心的模型页另列 Video to Video editing 与 Extend videos (Omni Extend)。落地页用的是 Video Extension、Video-to-video editing 这两个写法。本页的小节标题沿用帮助中心的叫法。

先看一张总表，再逐个讲。内容来自 [Learn about Google Flow models & supported features](https://support.google.com/flow/answer/16352836)，截至 2026-11-24。

| 模式 | 你手里有 | Omni Flash 1.2 | Veo 3.1 Lite |
|---|---|---|---|
| Text to video | 一句描述 | 支持，3 到 10 秒（订阅后到 15 秒） | 支持，4、6、8 秒 |
| Frames to video | 首帧，或首尾两帧 | 支持，3 到 10 秒；仅网页版 | 支持；只有首帧、首尾两帧都可以 |
| Ingredients to video | 角色或物件的参考图 | 支持，3 到 10 秒 | 支持，仅 8 秒 |
| Video to video | 一段现成视频 | 支持，3 到 10 秒 | 不支持 |
| Video extension | 一段生成好的视频 | 支持，续 3 到 10 秒；需订阅；仅网页版 | 不支持 |

Veo 3.1 Fast、Veo 3.1 Quality、Omni Flash 1.1 将于 **2026-12-05 退役**。官方建议新项目直接用 Omni Flash 1.2 或 Veo 3.1 Lite。

### Text to video

- **适合**：从零起一个镜头，手上没有任何参考。
- **准备**：一句写清主体、动作、环境、光线、风格的英文描述。
- **操作**：见上一节第 2 到第 4 步。
- **提示词怎么写**：见本节末尾的「提示词怎么写」。
- **常见失败**：一次出了好几个候选，积分成倍扣。把 **Number of outputs you want** 设为 1。

### Frames to video

- **适合**：手里有一张图（设计稿、截图、上一段的某一帧），想让它动起来；或者想同时控制一段视频的开头和结尾。
- **准备**：一张图做首帧；要同时控制结尾，再备一张做尾帧。官方提醒：「Product feature availability may differ by country/region of use. Certain image types may not be supported.」
- **操作**（官方步骤）：
  1. 在项目的提示词框里点模型名。
  2. 点 **Video**，再点 **Frames**。
  3. 把图片拖到 **+ Add start frame.**；要尾帧，把另一张拖到 **+ Add end frame.**
  4. 在提示词里描述两帧之间发生的动作或转场。
  5. 选视频参数，点 **Generate**。
- **提示词怎么写**：重点写「怎么变」，不要复述图里已有的静态内容。示例见「产品演示」模板。
- **常见失败**：在手机应用里找不到 Frames。Omni Flash 1.2 的 Frames to Video 目前只在网页版提供。

### Ingredients to video

- **适合**：多个镜头里要用同一个人、同一个物件、同一个场景。
- **准备**：参考图。官方建议主体或产品的参考图用**纯色或抠好背景**的图（「provide subject or product references on a plain or segmented background」）；场景与风格参考图里不要混进别的人物。
- **操作**（官方步骤）：
  1. 在提示词框里点模型名。
  2. 点 **Video**，再点 **Ingredients**。
  3. 加参考素材，四种方式任选其一：从设备把参考图或参考视频拖进 Flow；在提示词框里输入 `@` 加素材名，引用项目里已有的素材；点 **Add** 选项目里的素材；点 **Add**，再点 **Upload media** 上传文件。
  4. 在提示词里写明每份参考素材怎么用。官方示例：参考素材是一位女士、一盏熔岩灯、一条雾蒙蒙的街，提示词是 `The woman, whose torso is the lava lamp, walks down the foggy street`。
  5. 选视频参数，点 **Generate**。
- **提示词怎么写**：文字要配合参考图，不能互相矛盾，并且要点到你给的素材。官方：「Your text prompt should complement, not contradict, your visual inputs.」
- **常见失败**：
  - 用 Veo 3.1 Lite 时选了 8 秒以外的长度。该模型下 Ingredients 只支持 8 秒。
  - 加了声音参考却报错。官方：「You can add voice references only to video generations that use ingredients.」入口在 Omni Flash 模型下的 **Add**、**Voices**。
  - 角色还是变了。改用 Character，见下一节。

### Text to image

- **适合**：先出关键静帧，定角色、定场景、定构图，再拿去做视频的帧或参考素材。
- **准备**：一句图片描述。
- **操作**（官方步骤）：进项目，点模型名，点 **Image**，选 **Image aspect ratio**、**Number of outputs you want** 和模型，写提示词，可选加 ingredients，点 **Generate**。
- **提示词怎么写**：官方只要求「describes the image you want to create in detail」。
- **常见失败**：以为出图花积分。官方：「Generating and upscaling images in Google Flow does not currently use your monthly Google Flow credits or AI credits.」图片走的是每日上限，见后文「额度」。

### Image to image

- **适合**：手上已有一张图，要换背景、换风格或裁切。
- **准备**：项目里的那张图。
- **操作**，两条官方路径：
  1. 对话式改图。打开 **Agent**，把图片拖进提示词框（可一次拖多张），写要改什么，点 **Generate**。官方示例提示词：`Make these black and white.` 改动自动存进该素材的版本栈。
  2. 裁切。点开图片，左侧点 **Crop**，选裁切范围，点 **Crop**。
- **想引用项目里的另一张图**：悬停在那张图上，点 **More**，再点 **Add to prompt**。
- **常见失败**：改完找不到旧图。原图没丢，右侧 **History** 面板里有全部历史版本和当时的提示词。

<!-- TODO: 待核实 —— 图片的选区编辑（Select）与手绘（Draw）两个入口现在是否还在。已查：官方博客 flow-updates-february-2026（2026-02-25）宣布过套索选区与手绘；帮助中心 16729550 的缓存版列有 Select 与 Draw，但 2026-11-24 实时版只保留 Crop。未在产品内确认 -->

### Video to video

- **适合**：手里有一段拍好的或生成好的视频，要改光线、加东西、换背景。
- **准备**：最长 60 秒、最大 1 GB 的 `.mov`、`.mp4`、`.avi` 或 `.wmv` 文件。超过 30 秒的，必须在 Flow 里裁到 30 秒以内。
- **操作**（官方三步）：
  1. 把视频模型设为 Omni Flash 1.2。打开提示词框底部的生成设置，点 **Video**，点视频模型，选 **Omni Flash 1.2**。
  2. 上传、拖入或选中视频。官方说明 Flow 会自动处理、转格式并做安全检查。
  3. 点要编辑的视频，在裁剪窗口里选最多 10 秒的一段（Plus / Pro / Ultra 订阅者最多 15 秒），写提示词，可选加 ingredients，点 **Generate**。之后还能追加提示词或 ingredients，最多 3 轮对话不丢上下文。
- **提示词怎么写**：只写改什么，其余保留。官方示例：`Change the lighting to a cinematic sunset`、`Add a text overlay that says 'Coming Soon'`。
- **常见失败**：
  - 提示地区不支持。官方写该功能「only available in certain countries」。
  - 改不了人物说的话。官方在所有地区都不支持编辑或生成上传视频里人物说的话，改台词、加对白、配音都不行。要让人物开口，用提示词重新生成一段。
  - 扣分比预想多。官方：「Edits cost the same credits per second as standard generations.」

### Video extension

- **适合**：一个镜头很好，但太短。
- **准备**：Google AI Plus、Pro 或 Ultra 订阅；一段要延长的视频；可选最多 3 张参考图。
- **操作**（官方步骤）：进项目，点要延长的视频片段，底部点 **Extend**，选延长时长，在提示词框里描述动作如何继续，可加最多 3 张图片参考来保持角色与环境一致，点 **Generate**。
- **提示词怎么写**：写接下来的动作。官方博客解释过原理：「It analyzes the final frames and continues the action」。
- **常见失败**：
  - 按钮用不了。官方：「This feature is only available to Google AI Plus, Pro & Ultra subscribers on the Omni Flash 1.2 model.」Veo Extend 已于 2026-11-05 退役。
  - 延长后的片段不能再做 insert、remove、camera 这类编辑。
  - 扣分按新增的秒数算，360p 每秒 1 分，720p 每秒 3 分。

### 提示词怎么写：官方原则

帮助中心 [Create videos in Google Flow](https://support.google.com/flow/answer/16353334) 的「Best practices & advanced tips when generating in Google Flow」一节列了三条：

1. **Prepare clean ingredients**。主体或产品的参考图用纯色或抠好背景；场景与风格参考图里不要有额外的人物，除非你就是想要。
2. **Avoid conflicting guidance**。文字提示词要补充你给的图，不能否定它；提示词要点到你给的帧或参考素材；所有参考图的观感统一，模型更容易把它们融合在一起。
3. **Iterate with Gemini**。把提示词、图片甚至视频发给 Gemini，让它改写提示词、发散想法。

官方博客 [5 tips for getting started with Flow](https://blog.google/innovation-and-ai/products/flow-video-tips/)（2025-06-25）补了提示词里该有的要素：

- **Subject and action**：谁或什么，在做什么。
- **Composition and camera motion**：用 `wide shot`、`close-up` 定景别，用 `tracking shot`、`aerial view` 定运镜。
- **Location and lighting**：不要只写「一个房间」，写光从哪来、什么东西落在影子里。
- **Alternative styles**：可以指定 `stop motion`、`clay animation` 这类风格。
- 让 Gemini 帮你写多个互相衔接的镜头时，要明确让它把前面提示词里的关键细节全部重复一遍。

### 提示词怎么写：三个模板

下面三段都是**本站写的示例**，不是官方原文。结构相同：主体、动作、环境、光线、风格、排除项。按每段下面的表格逐项替换。

**模板一：落地页宣传片**

```text
A slow wide shot of a dark studio desk at night. A slim laptop in the center
shows a plain dark dashboard with soft blue charts. A warm desk lamp on the
left lights the keyboard; the rest of the room falls into soft shadow. Fine
dust drifts in the light. The camera pushes in very slowly. No people, no text.
```

| 部分 | 对应的文字 | 作用 |
|---|---|---|
| 景别与运镜 | `A slow wide shot`、`The camera pushes in very slowly` | 对应官方的 Composition and camera motion；运动越慢，越适合当背景 |
| 主体 | `A slim laptop in the center shows a plain dark dashboard` | 对应 Subject；界面只给轮廓，不指望模型画出你的真实产品 |
| 环境、光线与风格 | `dark studio desk at night`、`A warm desk lamp on the left`、`Fine dust drifts in the light` | 对应 Location and lighting；一个光源带出夜景风格，飘尘给静止画面加一点动势 |
| 排除项 | `No people, no text.` | 背景视频上还要叠你自己的文案，画面里不要再出现字 |

**模板二：产品演示**（配 Frames to video，把真实截图设为首帧）

```text
Start from the uploaded screenshot of a web app dashboard. Keep the layout,
colors and every UI element exactly as they are. A cursor moves to the top
right button, clicks it, and a dropdown menu opens with a soft fade. The page
stays sharp and still apart from that one interaction. Slow, smooth motion.
No new text, no camera movement.
```

| 部分 | 对应的文字 | 作用 |
|---|---|---|
| 锚定参考图 | `Start from the uploaded screenshot` | 对应官方的「提示词要点到你给的帧」 |
| 保护项 | `Keep the layout, colors and every UI element exactly as they are` | 防止模型重画界面；对应「文字不要与参考图冲突」 |
| 动作 | `A cursor moves to the top right button, clicks it` | 一段只演一个操作，对应 Subject and action |
| 排除项 | `No new text, no camera movement.` | 限制变化范围，减少走样 |

**模板三：功能示意**（抽象动效，适合讲流程）

```text
Three rounded rectangular cards float in a row on a soft light gray
background. A small blue dot travels from the first card to the second, then
to the third, leaving a thin glowing line behind it. Each card lifts slightly
when the dot arrives. Flat, clean motion graphics, soft shadows, gentle
easing. No text.
```

| 部分 | 对应的文字 | 作用 |
|---|---|---|
| 主体 | `Three rounded rectangular cards float in a row` | 用抽象图形代表你功能里的三个对象 |
| 动作 | `A small blue dot travels from the first card to the second` | 讲清先后顺序 |
| 风格 | `Flat, clean motion graphics, soft shadows, gentle easing` | 对应 Alternative styles；动效风格与前端界面更接近 |
| 排除项 | `No text.` | 文案与数字用 HTML 叠加，方便修改与本地化 |

## 把多段素材接成一部成片

一次生成只有几秒到十几秒：Omni Flash 1.2 是 3 到 10 秒，订阅后到 15 秒；Veo 3.1 Lite 是 4、6、8 秒。成片要把多个镜头接起来，还要让角色和场景在镜头之间对得上。这是 Flow 相对「一次生成一段」的核心价值。

下面用一个例子走完整条路：同一个角色出现在三个镜头里，每个 8 秒。

### 第 1 步：固定角色与场景

三种官方机制，按需要选：

| 机制 | 怎么建 | 怎么引用 | 适合 |
|---|---|---|---|
| **Character** | 左侧选 **Characters**；已有角色时点 **New Character**。写描述，上传或生成 1 到 2 张图（至少 1 张才能用），点 **Generate**；再起名、选声音，点 **Done** | 提示词里输入 `@` 加角色名，例如 `@CaptainZoro walking through a futuristic city` | 全片反复出现的角色 |
| **ingredients** | 每次生成时把参考图拖进提示词框 | 在提示词里写明每份参考怎么用 | 只在某几个镜头出现的物件或场景 |
| **Avatar** | 右上角头像菜单里点 **Create avatar**；在电脑上开始，用手机扫二维码完成 | 提示词里输入 `@me` | 出镜人是你自己 |

Avatar 在欧洲经济区、英国、瑞士不可用。

### 第 2 步：先出关键静帧

用 Text to image 把角色和场景的定妆图先出好。官方博客说过图片与视频的衔接方式：有了内建的 Nano Banana，你可以「create high-fidelity images and instantly use them as ingredients and frames for Veo video generations without ever leaving Flow」。图片不扣积分。

### 第 3 步：逐个镜头生成

每个镜头用 Ingredients to video 或 Frames to video 生成。先用 360p 看构图（每秒 1 分），满意了再用 720p 出正式版。

### 第 4 步：让镜头之间接得上

- **上一镜的结尾当下一镜的开头**。打开镜头 A，暂停在要接的那一帧，悬停后点 **Save frame**。官方说明存下来的帧可用于后续生成，当作 ingredient、start frame 或 end frame。再把它设成镜头 B 的 start frame。
- **镜头太短**。点片段，底部点 **Extend**，续 3 到 10 秒，可带最多 3 张参考图保持角色与环境一致。
- **同一个角色换场景**。官方博客对 **Jump to** 的定义见「核心概念」。当前帮助中心没有写它的入口，用之前先在你的界面里确认它还在。

### 第 5 步：在 Scenebuilder 里排列

1. 悬停在做好的片段上，点 **More**，再点 **Add to Scene**。
2. 点开这个 scene（左侧栏的 **Scenes** 里能找到），拖动片段调整顺序。
3. 拖两端的手柄，修剪每个片段的开头和结尾。
4. 预览整条序列。
5. 下载 scene。

### 第 6 步：带走成片

下载 scene，得到一个视频文件。要发到 YouTube：单个片段可以在 Flow 里点 **More**、**Publish to YouTube** 直接发；Scenebuilder 的序列不行，官方要求先下载成单个文件，再经 YouTube Studio 上传。

## 自定义 Tools 与 Agent

### Tools：用自然语言写一个小工具

**是什么**：你用一句话描述需求，Flow 写代码并搭出界面。官方举的例子是「Make an image filter app with a slider for grayscale and hue shift.」落地页列的用途有字幕叠层、改比例、分镜、shader。

**谁能用**：官方写得很明确。

- 使用预置的 Tools：所有用户。
- 创建与 remix：需要 Google AI Plus、Pro 或 Ultra 订阅。官方：「If you're not subscribed, you can still explore and use pre-built tools.」
- 平台：仅网页版与 PC。

**怎么建一个最简单的 tool**（官方步骤）：

1. 进项目，左侧点 **Tools**，再点 **Create Tool**。
2. 在提示词框里描述你要的工具。本站示例，非官方原文：`A tool that adds a caption bar to the bottom of a clip, with an editable text field.`
3. 点 **Generate**。
4. 检查界面。等 agent 构建完，点 **Save**。

**建完之后**：

- **改**：打开 Tool，点 **Edit**，在右侧描述要怎么改代码，点 **Generate**。
- **分享**：右上角 **Share**，再点 **Copy link**。官方提醒：拿到链接的人都能看到这个 Tool 的代码、名称和缩略图。链接只分享生成链接时的版本，之后的修改不会同步。要停止分享，只能删除这个 Tool。
- **Pin、Favorite、Remix tool**：分别是固定到当前项目、全局可用、复制一份自己改。

**扣分**：Tool 生成的媒体照常扣 Flow 积分。官方说明，运行某个 Tool 可能扣分时，Flow 一定会显示警告横幅。创建 Tool 有每日数量上限，帮助中心没有为「创建」单列扣分。

### Agent：提示词框里的对话式助手

**是什么**：官方称它为「a built-in creative collaborator」。落地页的描述是项目级创意搭档，帮你探索和迭代。官方博客补充，它由 Gemini 模型构建。

**能做什么**（官方清单）：

- **Brainstorm and plan**：列分镜、做情绪板、把笼统的想法变成可用的提示词。
- **Generate new media**：让它生成视频或图片，它会挑合适的模型。
- **Edit assets directly**：让它改项目里选中的素材。
- **Batch generate**：一次生成一个素材的多个变体。
- **Organize your assets**：重命名文件、把素材归进 Collection、删除不用的素材。

**怎么用**：

1. 进项目，在提示词框里点 **Agent** 打开。再点一次是关闭。
2. 要展开侧边对话面板，点 **Expand**。
3. 写你的要求。要带参考，把素材从设备或项目拖进提示词框，或点 **Add** 选择、上传。
4. 点 **Generate**。

**三个要知道的设置**：

- **Confirm before generating**。默认 Agent 在做任何会消耗积分的动作前先问你。官方提醒：选 **Never** 之后，它会替你生成并扣分，不再停下来确认。建议保持 **Always**。
- **Agent Instructions**。提示词框底部点 **Agent Instructions**、**Add instruction**，可以放一张参考图并写规则，让 Agent 在整个项目里表现一致。
- **会话**。对话自动存为 Sessions，按项目区分。侧边面板顶部点 **Menu** 可以打开、新建、重命名、删除会话。删除会话只清对话记录，生成的素材还在。

**扣分**：Agent 生成的媒体照常扣积分，并自动存进当前打开的项目。Agent 对话本身目前不扣积分，走的是每个套餐自己的每日查询上限。

## 真实用例

三个前端工程师最常见的场景。做法是本站根据官方步骤给的，不是官方用例。

| 场景 | 用到的模式 | 预期产出 |
|---|---|---|
| 落地页背景视频 | Text to image 定调，Text to video 出片 | 一段 8 到 10 秒的 MP4，配几行 HTML |
| 产品 demo 片段 | Frames to video 为主，Scenebuilder 串联 | 一个 15 到 30 秒的 scene，下载成单个视频 |
| 给 PM 演示的动态分镜 | Agent 列分镜，360p 草稿，Scenebuilder 串联 | 一个 3 到 5 镜头的 scene |

### 落地页背景视频

- **要什么**：一段循环播放、不抢文字的横幅背景。
- **做法**：用「提示词怎么写」的模板一生成 8 到 10 秒。提示词里排除人物与文字，标题和文案用 HTML 叠在视频上。订阅用户可以把成片放大到 1080p，1 到 10 秒的放大不扣积分。
- **预期产出**：一个 `.mp4` 文件，加下面这段标签。

```html
<!-- 背景视频：静音才能自动播放；poster 在视频加载前先占位 -->
<video class="hero-bg" autoplay muted loop playsinline preload="metadata" poster="/hero-poster.jpg">
  <source src="/hero.mp4" type="video/mp4" />
</video>
```

两点提醒：

- 帮助中心没有写 Flow 能生成首尾相接的循环视频。接缝处要自己看片确认。
- 片段可能带原生声音（项目设置里的 **Return silent videos** 打开后，所有视频生成为静音），所以网页里务必加 `muted`，否则浏览器的自动播放策略可能拦下它。

### 产品 demo 片段

- **要什么**：15 到 30 秒，演示一个功能的两三个操作。
- **做法**：把真实截图设为首帧，用模板二的方式让截图动起来。一段只演一个操作，几段在 Scenebuilder 里排起来。
- **预期产出**：一个 scene，下载成单个视频文件。
- **要知道的边界**：模型生成的界面是「画出来的」，不是你产品的真实录屏。给 PM 或团队内部演示够用。对外的官方 demo，建议用真实录屏，Flow 的片段只做开场与转场。

### 给 PM 演示的动态分镜

- **要什么**：把一个功能的几个画面按顺序动起来，供评审讨论。
- **做法**：先让 Agent 列分镜，再把分镜逐条变成提示词。每个镜头先用 Omni Flash 1.2 的 360p 出草稿，每秒 1 分；4 个 8 秒镜头共 32 分。挑中的再放大，订阅用户 1 到 10 秒放大到 1080p 不扣积分。需要同一个角色贯穿时，先建 Character。
- **预期产出**：一个 3 到 5 镜头的 scene，外加一份可以照着实现的分镜提示词。

## 额度

数字来自 [Manage your Google Flow credits](https://support.google.com/flow/answer/16526234)，截至 2026-11-24，**不是**从第三方博客抄的。

| 档位 | Flow 积分 |
|---|---|
| 无订阅 | **每天 50**（试用；当日未用完不结转） |
| AI Plus | **每月 200**（另每天 50） |
| AI Pro | **每月 1,000**（另每天 50） |
| AI Ultra $100（本站称 Ultra 5x） | **每月 10,000**（另每天 50） |
| AI Ultra $200（本站称 Ultra 20x） | **每月 25,000**（另每天 50） |

要点：

- 订阅用户的月度积分是**额外**的。官方原文：「With or without a subscription, you receive 50 Google Flow credits per day. Subscribers receive extra Google Flow credits」。
- 付费档按**计费周期**刷新，未用完的月度积分**不结转**。
- 每日积分的刷新由当天第一次生成触发。官方的例子：8 月 12 日第一次用，下一批 50 分在 8 月 13 日可用。
- 用尽后，Plus / Pro / Ultra 可另购 AI credits 续用（日本除外）。同一笔 AI credits 也可用于 [Antigravity](./antigravity)。
- 官方：「To generate content in Google Flow, you need to use Google Flow credits or AI credits.」积分按账号共享，换设备不换账本。
- 查余额：右上角点头像，头像下方是剩余积分。Plus / Pro / Ultra 还能看扣分明细与下次刷新日期。

四档存储、模型倍率、Cloud 额度等**整张订阅表只在**[速查表](./gemini-cheatsheet#订阅层级)。

<!-- TODO: 待核实 —— 落地页列出的美元标价（Plus $4.99 / Pro $19.99 / Ultra $99.99 / $199.99）带 “* Prices may vary by market”。one.google.com 对比页抓取时会吞掉金额，家族价仍以你所在地区的官方页为准 -->

### 各操作扣不扣积分

官方提醒「Limits are subject to change at any time」。最新价格在提示词框右上角的 **Settings** 里看。

| 操作 | 扣不扣 | 扣多少（截至 2026-11-24） |
|---|---|---|
| 用 Omni Flash 1.2 生成或编辑视频 | 扣 | 360p 每秒 1 分；720p 每秒 3 分。所有用户都可生成到 10 秒 |
| 用 Omni Flash 1.2 生成 11 到 15 秒 | 扣 | 仅订阅用户。超过 10 秒的部分，360p 每秒 2 分，720p 每秒 6 分 |
| 用 Veo 3.1 Lite 生成 4、6、8 秒 | 扣 | 每次 10 分；Ultra 订阅者每次 5 分 |
| Veo 3.1 Lite 的 Lower Priority 模式 | 不扣 | 仅 Ultra 20x 订阅者与家庭组管理者 |
| Omni Extend | 扣 | 仅订阅用户。每新增 1 秒，360p 1 分，720p 3 分 |
| 把 360p 放大到 720p 或 1080p | 1 到 10 秒不扣 | 仅订阅用户。超过 10 秒的部分每秒 1 分 |
| 放大到 4K | 扣 | 仅 Ultra。1 到 10 秒固定 50 分；超过 10 秒的部分每秒 5 分 |
| Veo 3.1 Quality 生成 8 秒（即将退役） | 扣 | 所有用户每次 100 分 |
| 生成、放大图片 | 不扣 | 走每日上限，见下表 |
| Agent 对话 | 不扣 | 每个套餐有每日查询上限；Agent 生成的媒体照常扣 |
| 创建 Tool | 官方未单列 | 每天可创建的数量有上限；Tool 生成的媒体照常扣 |
| 生成失败，或触发安全过滤 | 不扣 | 生成开始时先扣，之后一小时内退回 |
| 重试 | 扣 | 依据官方「costs are per generation, not per request」推出，不是官方原句 |
| 保存版本、保存帧、下载、在 Scenebuilder 里排列 | 官方未列消耗 | 额度页没有为这几项写任何扣分 |

图片的每日上限来自 [Create & edit images in Flow](https://support.google.com/flow/answer/16729550)：

| 模型或操作 | 无订阅 | AI Plus 与 Pro | AI Ultra |
|---|---|---|---|
| Nano Banana Pro | 每天 20 张 | 每天 100 张 | 每天 500 张 |
| Nano Banana 2.1 与 2 Lite（共用） | 每天 400 张 | 每天 1,000 张 | 每天 1,000 张 |
| 2K 放大 | 每天 200 次 | 每天 200 次 | 每天 200 次 |
| 4K 放大 | 不可用 | 不可用 | 每天 200 次 |

每日上限在你当天第一次用该模型后 24 小时重置。图片生成失败或被安全过滤拦下，不计入当日上限。

## 何时用，什么时候不要用

| 我要… | 用 | 不要用 Flow |
|---|---|---|
| 落地页 / 宣传片 / 产品演示 **视频** | **Flow** | Canvas 出的是能点的页面，不是成片 |
| 半小时内给产品经理一个 **能点的原型** | [Canvas](./canvas) | Flow 不做 DOM / 交互 |
| 把选定方案写进仓库 | [Antigravity](./antigravity) | Flow 不改代码、不出 PR |
| 歌曲 / MV / 生成式配乐 | [Flow Music](https://www.flowmusic.app/)（积分与 Flow **分开**） | 不要把 Flow 视频积分当成音乐积分 |

Flow Music 那一行有官方依据：「Google Flow Music credits are separate from your Google AI credits.」

实用组合：Canvas 试三个交互方向，选定一个，交给 Antigravity 在工程里实现。需要对外讲这个功能时，再用 Flow 出 8 到 10 秒演示片。

## 是什么

官方把它叫 **AI creative studio**：用自然语言做计划、生成、精修，底层是 Google 的生成式模型。

落地页当前列出三套模型：

| 模型 | 官方一句话 |
|---|---|
| **Gemini Omni** | 从任意输入参考（真实或生成）创建并编辑视频；强调世界理解、多模态与对话式编辑 |
| **Nano Banana** | 图像生成与精细编辑；强调主体一致性、文字渲染、推理 |
| **Veo 3.1** | 视频生成；强调物理、真实感、提示词遵循，带原生音频与扩展控制 |

帮助中心用的是更具体的模型名，按家族对得上：

| 家族（落地页的叫法） | 帮助中心里的具体模型（截至 2026-11-24） | 状态 |
|---|---|---|
| Gemini Omni | Omni Flash 1.2；Omni Flash 1.1 | 1.1 于 2026-12-05 退役 |
| Veo 3.1 | Veo 3.1 Lite；Veo 3.1 Fast；Veo 3.1 Quality | Fast 与 Quality 于 2026-12-05 退役 |
| Nano Banana | Nano Banana Pro；Nano Banana 2.1；Nano Banana 2 Lite | 图片模型，用来生成帧与参考素材 |

**能做什么**，来自 [产品落地页](https://labs.google/fx/tools/flow) 与 [Pro 权益说明](https://support.google.com/googleone/answer/14534406) 列出的能力：

- **生成模式**：Text to video、Frames to video、Ingredients to video、Text to image、Image to image
- **精修**：Video Extension、Video-to-video editing、Scenebuilder
- **角色**：Characters、Avatars
- **Agent**：官方描述为项目级创意搭档，帮你探索和迭代
- **自定义 Tools**：用自然语言做工具（字幕叠层、改比例、分镜、shader），可分享 / remix。免费档只能**使用**已有 Tools；Plus 起才能**创建**

**产出带水印**。官方：「All outputs generated in Google Flow using Veo, Omni, or Nano Banana include invisible SynthID watermarks.」可见水印由你控制：头像下拉菜单里的「Visible watermarking」开关。住在印度、韩国、越南且不是 Ultra 20x 的用户，会自动加可见水印。

**商用**：官方答的是服务条款说了算，条款里写 Google 不会主张对生成内容的所有权。

它不在编码主线上。对位 Claude 家族里的 [Claude Design](../claude/claude-design)：Design 出可交接的界面原型，Flow 出可发布的影像。

## 常见坑

每条都注明官方依据。没有另注出处的，依据都来自帮助中心的 [Get started](https://support.google.com/flow/answer/16353333)、[创建视频](https://support.google.com/flow/answer/16353334)、[编辑与 Scenebuilder](https://support.google.com/flow/answer/16935718)、[模型与支持功能](https://support.google.com/flow/answer/16352836)、[额度](https://support.google.com/flow/answer/16526234)、[可用地区](https://support.google.com/flow/answer/16353544)、[Agent](https://support.google.com/flow/answer/17093911) 七页。

| 症状 | 原因 | 解决 |
|---|---|---|
| 打不开，或提示所在地区不可用 | 中国大陆不在支持列表 | 查[可用地区](https://support.google.com/flow/answer/16353544)。VPN **不能**绕过：官方写「VPNs will not enable access in unsupported regions」 |
| 开着 VPN，报「We noticed some unusual activity」 | 官方要求关掉 VPN 与代理 | 官方给的两步：过几分钟重试；停用 VPN 或代理 |
| 订了 AI Pro，还是进不去 | Flow 不是在所有卖 AI Pro 的国家都开放 | 买之前先查支持列表。人在支持地区，联系 Google One 支持 |
| 没订阅，某段时间生成不了视频 | 高峰时段（约 14:00 到 17:00 UTC）限制非订阅用户 | 错开北京时间 22:00 到次日 01:00；这段时间仍可生成图片、用 Agent |
| 提示积分不够 | 视频按秒或按次扣。Omni Flash 1.2 的 8 秒 720p 是 24 分 | 右上角头像下看余额。改用 360p 草稿，或换成每次 10 分的 Veo 3.1 Lite |
| 生成失败了，余额却少了 | 官方：生成开始时就扣分；失败或触发安全过滤，积分一小时内退回 | 等一小时。余额与扣分记录可能晚一点才更新。仍然不对，联系 Google One 支持 |
| 报「Audio Generation Failed」 | Veo 的音频质量不达标时，视频不会生成，积分退回 | 重试，或换提示词。宁可要无声视频：项目设置里打开 **Return silent videos**，这样照常出片、照常扣分 |
| 角色前后不一致 | 镜头之间没有带参考 | 建 Character 并用 `@名字` 引用，或每次都带 ingredients 与首尾帧。参考图用干净背景，各参考图风格统一 |
| 一次请求扣了好几份积分 | 费用按 generation 计，不按 request；一次要 2 个候选就是 2 份 | **Number of outputs you want** 设为 1。先用 360p 试，满意再出 720p |
| 不满意就连着重试，积分很快没了 | 每次重试都是一次新生成 | 先改提示词。把提示词发给 Gemini 或 Flow 的 Agent 帮你改，对话本身不扣积分 |
| 用中文写提示词，效果不稳定 | 官方建议用英文提示词，其他语言的效果会因语言和复杂度而不同 | 提示词用英文写。可以让 Gemini 帮你翻译、改写 |
| 把 Flow 积分当成了 Flow Music 积分 | 官方：「Google Flow Music credits are separate from your Google AI credits.」 | 两本账分开算 |
| 选了某个功能，模型被自动换掉 | 当前模型不支持该功能，Flow 会建议切换到兼容模型 | 生成前在提示词框的设置里确认模型、分辨率和最新价格 |
| 想让上传视频里的人改口型、说新台词 | 官方在所有地区都不支持编辑或生成上传视频里人物说的话 | 用提示词重新生成一段新视频。画面、背景音、音乐、音效仍可编辑 |
| 生成名人，或编辑带未成年人的上传视频 | 官方在所有地区都不支持 | 换题材 |
| 报「You're requesting generations too quickly」 | 平台限流，零积分模型尤其明显 | 等一会儿再试 |
| 卡片一直是「Pending」 | 可能有系统通知没处理；政策或积分限制导致的失败要人工处理 | 看右上角的系统通知。手动重试，或删掉这张卡 |
| 加了声音参考，报错 | 声音参考只能用于带 ingredients 的视频生成 | 切到 Omni Flash，走 Video、Ingredients，再点 Add、Voices |
| Extend 用不了 | 仅订阅用户、仅 Omni Flash 1.2、仅网页版；Veo Extend 已于 2026-11-05 退役 | 三项都满足再试 |
| 下载的成片有可见水印 | 住在印度、韩国、越南且不是 Ultra 20x 时自动加；其他地区由开关决定 | 在头像下拉菜单里检查「Visible watermarking」。不可见的 SynthID 一直都在，官方要求不要移除 |
| 看到官方页面写「必须订阅才能用」 | 那是「Get started」页旧版的原话，2026-11-24 仍能从部分缓存读到 | 同日的实时页面与额度页一致：不订阅也能用基础的视频生成与编辑，每天 50 分 |

## Flow Sessions

[落地页](https://labs.google/fx/tools/flow) 上的 **Flow Sessions** 是艺术家合作计划：邀请一小批创作者用 Flow 做激情项目、并与 Google 合作。**不是日常产品**，前端工程师不需要单独学，也不要把它写成教程。

## 下一步

- 想在自己的代码里调 Veo 或 Nano Banana，去 [AI Studio](./ai-studio)。
- 想知道订哪一档，看 [Google AI 订阅](./google-pro)。
- 想要能点的原型，看 [Canvas](./canvas)。
- Flow 在 Gemini 家族里的位置，看 [术语表](./gemini-glossary)。
- 想看别人怎么写提示词，去 [Flow TV](https://labs.google/flow/tv)。官方说明：用屏幕底部的遥控器浏览频道，能看到每个片段背后的提示词。

## 官方资源与深入阅读

帮助中心，每篇一句话：

- [Flow 帮助中心](https://support.google.com/flow)：全部官方文章的目录。
- [Get started with Google Flow](https://support.google.com/flow/answer/16353333)：谁能用、怎么进、报错与水印的官方问答。
- [Create videos in Google Flow](https://support.google.com/flow/answer/16353334)：三种视频生成方式、加帧、加参考素材、加声音的步骤，以及官方的提示词原则。
- [Edit videos & build scenes in Google Flow](https://support.google.com/flow/answer/16935718)：Extend、编辑现成视频、保存帧、Scenebuilder。
- [Learn about Google Flow models & supported features](https://support.google.com/flow/answer/16352836)：官方的模式与模型支持表、退役时间。
- [Manage your Google Flow credits](https://support.google.com/flow/answer/16526234)：额度、刷新规则、逐项消耗。
- [Where you can use Google Flow](https://support.google.com/flow/answer/16353544)：支持的语言与国家或地区，以及分地区的功能限制。
- [Create & edit images in Flow](https://support.google.com/flow/answer/16729550)：图片的生成、编辑与每日上限。
- [Manage your Flow projects, assets & collections](https://support.google.com/flow/answer/16935308)：项目、素材、Character、下载、分享、发布到 YouTube。
- [Use the Google Flow Agent](https://support.google.com/flow/answer/17093911)：Agent 的开关、会话、指令与默认设置。
- [Create & manage Tools in Google Flow](https://support.google.com/flow/answer/17104535)：创建、编辑、分享 Tools。
- [Create & use your avatar in Google Flow](https://support.google.com/flow/answer/17102997)：用 `@me` 把你自己的形象放进视频。
- [Use keyboard shortcuts in Google Flow](https://support.google.com/flow/answer/17069754)：快捷键表。
- [Manage your data in Google Flow](https://support.google.com/flow/answer/17025472)：数据怎么用、怎么删。
- [Download your Google Flow data](https://support.google.com/flow/answer/17571126)：通过 Google Takeout 导出全部项目。
- [Google AI Pro 权益清单](https://support.google.com/googleone/answer/14534406)：Pro 里 Flow 与 Flow Music 的权益原文。

官方博客，按时间排：

- [Meet Flow: AI-powered filmmaking with Veo 3](https://blog.google/innovation-and-ai/products/google-flow-veo-ai-filmmaking-tool/)：2025 年 5 月的发布文。
- [5 tips for getting started with Flow](https://blog.google/innovation-and-ai/products/flow-video-tips/)：2025-06-25，官方的提示词要素，以及 Jump to 与 Extend 的定义。
- [Introducing Veo 3.1 and advanced capabilities in Flow](https://blog.google/innovation-and-ai/products/veo-updates-flow/)：2025-10-15，Ingredients、Frames、Extend 三个能力的官方解释。
- [New ways to create and refine content in Flow](https://blog.google/innovation-and-ai/models-and-research/google-labs/flow-updates-february-2026/)：2026-02-25，界面改版，图片生成并入 Flow。
- [New agents, mobile apps and Gemini Omni for Google Flow and Google Flow Music](https://blog.google/innovation-and-ai/models-and-research/google-labs/flow-updates/)：2026-05-19，Agent、Tools、手机应用的发布公告。
- [Google Flow brings new creative control features to enhance video editing](https://blog.google/innovation-and-ai/models-and-research/google-labs/new-creative-controls-google-flow/)：2026-08-27，首尾帧、1080p 与 4K 导出、360p 草稿。
- [Google Labs 博客](https://blog.google/innovation-and-ai/models-and-research/google-labs/)：后续更新从这里跟。

其他入口：

- [产品入口](https://labs.google/fx/tools/flow)
- [Flow TV](https://labs.google/flow/tv)：官方的片段展示页，用屏幕底部的遥控器能看到每个片段背后的提示词。[labs.google/fx 的 FAQ](https://labs.google/fx/faq)：帮助中心指向的数据与政策说明。

## 相关页面

- [订阅与额度](./google-pro) — Pro 里还有哪些编码相关权益
- [Canvas](./canvas) — 能点的原型
- [速查表](./gemini-cheatsheet#选哪个工具) — 按任务选工具
- [AI Studio](./ai-studio) — 在代码里调 Veo 与 Nano Banana
- [术语表](./gemini-glossary) — Flow 在 Gemini 家族里的位置
