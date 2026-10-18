# 摘要提炼工作流(4 段式)

把 `segments.jsonl`(每条带 `transcript` + `start_sec` + `end_sec` + `topic` + `key_terms`)提炼成 `summary.md` 的标准流程。

## 为什么需要分段式

直接让 LLM 看完整 transcript 生成总结, 会出现:

- **跑题**: 抓不住视频核心论点
- **编造**: 杜撰视频里没有的内容
- **冗长**: 输出 5000 字而不是 1000 字
- **无定位**: 写"视频中提到 X", 但没说 X 在哪

**4 段式方法** 解决以上所有问题: 强制结构 + 强制时间码 + 强制长度。

## 4 段式结构

### 段 1: 一句话总览

视频讲什么, 5 秒钟能懂。

模板:

```markdown
# {视频名} 精华分析

## 一句话总览

{一句话, 30-80 字, 必须是"动词 + 对象 + 价值" 结构}
```

示例:

> Claude Code 2.1.170 实战教程, 由 Anthropic 工程师 Lydia 与 YK Dojo 联合讲解, 覆盖 11 条实战 tips 与 auto mode 中间路径设计哲学。

### 段 2: 核心要点(必带时间码)

5-10 条, 每条 ≤ 80 字, **必带视频时间码 `[HH:MM:SS]`** 锚点。

模板:

```markdown
## 核心要点

- [00:00:30] **要点 1 标题**: 简短描述
- [00:05:15] **要点 2 标题**: 简短描述
- [00:12:40] **要点 3 标题**: 简短描述(可附 frame_005.jpg 引用)
```

时间码规则:

- 必须是 `[HH:MM:SS]` 格式(2 位小时, 2 位分钟, 2 位秒)
- 必须是视频**真实存在**的时间点(从 segments 抽取, 不要编造)
- 多个时间码时选**最早出现**该要点的位置
- 引用关键帧时, 在描述后加 `frame_NNN.jpg`(NNN 是 3 位补零)

### 段 3: 时间轴主题(自然分段)

视频的"目录", 按主题自然分段, 标注起止时间码。

模板:

```markdown
## 时间轴主题

- **[00:00:00 - 00:05:00] 开场与 Assembled Prompt 架构**: 介绍 model 是 stateless, 解释一次 LLM 调用的完整输入
- **[00:05:00 - 00:13:00] Skills 与 Permissions**: 演示 SKILL.md frontmatter, user-invocable 字段, settings.json deny rules
- **[00:13:00 - 00:35:00] 11 tips 实战**(YK 演讲): 项目目录、Git CLI、Auto mode 中间路径等
- **[00:35:00 - 00:55:00] Co-work 与 Anthropic 内部产品观察**: Co-work 来源, 团队工作流, 8 周内评估
```

### 段 4: 关键术语(中英对照)

中英对照, 配视频首次出现的时间码。

模板:

```markdown
## 关键术语

| 术语 | 说明 | 首次出现 |
|---|---|---|
| **Assembled Prompt** | 一次 LLM 调用的完整输入(Tool Schema + System Prompt + Messages) | [00:01:30] |
| **Auto mode** | 权限 classifier 中间路径, 拦截"不可逆/越界"操作 | [00:42:00] |
| **草稿 PR(Draft PR)** | 不直接 push main, 用 gh pr create --draft 模拟 review | [00:34:00] |
```

## 提炼步骤(LLM 必走)

1. 把 segments.jsonl 按 30 条一批切块
2. 对每批, 让 LLM 输出"该批要点(3-5 条) + 涉及时间码"
3. 跨批去重, 形成全局 5-10 条核心要点
4. 用 segments 的 topic 字段做时间轴主题(自动分组)
5. 用 segments 的 key_terms 字段做关键术语(自动去重)
6. 人工(或 LLM) 校验 4 段结构完整

## 必校验

提炼后必须检查:

- [ ] 一句话总览 30-80 字
- [ ] 核心要点 5-10 条(不够则说明视频太散)
- [ ] 每条核心要点都有 `[HH:MM:SS]` 时间码
- [ ] 时间码在 segments 中真实存在(用 `python3 scripts/srt-to-segments.py` 校验)
- [ ] 关键术语表 ≥ 5 个
- [ ] 关键帧引用(若有)的 `frame_NNN.jpg` 路径真实存在

## 不要做

- 不要把整段 transcript 抄进 summary
- 不要用"大约" "可能" "也许" 等模糊时间码(只写精确时间码)
- 不要杜撰视频里没有的概念(可从 segments topic 字段选取)
- 不要在 LLM 跑前跳过 30 条一批的"切块" 步骤(完整 transcript 容易让 LLM 走神)
