---
description: '当用户给一个本地视频文件(讲座/教程/会议/播客)需要快速产出可定位的精华分析时使用。自动抽帧 + 语音转文字 + 摘要 + 生成单页 HTML 报告,所有结论可点击跳到视频的具体时间码和帧。不要把本技能用于: 实时流媒体、多说话人分离转录(仅做单声道)、视频剪辑、字幕翻译。'
name: video-summary
---

# 视频精华分析

把一个本地视频文件变成一份"可点击定位"的 HTML 精华分析报告。报告同级目录输出 4 类文件: 原始视频、纯文字稿、精华总结 Markdown、单页 HTML 索引。

## 使用场景

- 拿到一个 30-120 分钟的讲座/教程/会议录像, 想要快速沉淀精华, 而不是看完 1 小时视频。
- 输出要让读者**信任**每一个结论, 因为每个结论都能点击跳到视频对应时间点。
- 想要可分享、可版本化、可检索的纯文本资产(用 Git 管理)。

不要把本技能用于:

- 实时流媒体(只能处理本地文件)。
- 多说话人分离转录(whisper 单声道默认混在一起)。
- 视频剪辑、字幕翻译、画面编辑(本技能只生成阅读报告, 不动视频本身)。
- 极短视频(≤3 分钟)— 直接人工看更快。

## 工作流

按以下 4 阶段顺序执行, 每阶段都有确定性脚本, 不要跳步。

### 阶段 1: 抽素材(必跑)

```bash
# 1. 抽单声道 16kHz wav(whisper 最佳输入格式)
bash scripts/extract-audio.sh /path/to/video.mp4 /output/dir/

# 2. 抽关键帧(默认每 60s 1 帧, 输出 JPG)
bash scripts/extract-frames.sh /path/to/video.mp4 /output/dir/ --interval 60
```

可重入: 脚本检测到 `*.wav` / `*.jpg` 已存在会跳过, 直接跑多次不重复劳动。

### 阶段 2: 语音转文字

```bash
# 用 openai-whisper small 模型(中文视频用 medium 更准)
bash scripts/transcribe.sh /output/dir/claude-code-tutorial.wav en small
# 产物: claude-code-tutorial.{txt,srt,vtt,json,tsv}
```

模型选型:

| 视频类型 | 推荐模型 | 原因 |
|---|---|---|
| 英文教程/会议 | small(462MB) | 速度优先, 准确度足够 |
| 中文讲解/播客 | medium(1.5GB) | 中文识别 small 差很多 |
| 长视频(>2h) | tiny(75MB) | 速度优先, 后续人工校对 |

### 阶段 3: 结构化 segments

```bash
# 把 SRT 转成结构化 segments.jsonl(每行一段, 含 start_sec/end_sec)
python3 scripts/srt-to-segments.py \
  --srt /output/dir/claude-code-tutorial.srt \
  --out /output/dir/segments.jsonl
```

输出字段:

```typescript
{
  id: "seg-0001",             // 全局 id
  start_ts: "00:00:00.000",   // 时间码字符串
  end_ts: "00:00:05.360",
  start_sec: 0,               // 整数秒(用于 URL 跳转)
  end_sec: 5,
  transcript: "原文字幕",
  topic: "permissions",        // 启发式 topic
  intent: "deep-dive",         // 启发式 intent
  key_terms: ["MCP", "permission"]  // 关键术语抽取
}
```

### 阶段 4: 摘要 + HTML 装配

这一步**必须有 LLM 介入**, 因为"什么是精华"是判断题不是计算题:

1. 读取 `references/extraction-workflow.md`, 理解 4 段式摘要结构
2. 分批(每 30 段)对 segments.jsonl 做 LLM 摘要, 合并形成 `summary.md`
3. 读取 `references/format-spec.md`, 用 `scripts/build-html.py` 生成 `index.html`

```bash
python3 scripts/build-html.py \
  --video /output/dir/claude-code-tutorial.mp4 \
  --transcript /output/dir/claude-code-tutorial.txt \
  --segments /output/dir/segments.jsonl \
  --summary /output/dir/summary.md \
  --out /output/dir/index.html
```

## 输出契约

输出目录必须**和视频同级**且包含以下 4 类文件(脚本默认行为):

```text
/path/to/parent/
├── claude-code-tutorial.mp4        # 原始视频(只读, 不修改)
├── index.html                      # 单页 HTML 报告(入口)
├── transcript.txt                   # 纯文字稿(无时间码, 易读)
└── summary.md                      # 视频精华 Markdown 总结
```

中间产物(`*.wav`, `*.srt`, `*.json`, `frames/`, `segments.jsonl`)可保留用于重跑或调试, 但**不计入最终交付物**。

### summary.md 格式(4 段式, 详见 references/extraction-workflow.md)

1. **一句话总览**: 视频讲什么, 5 秒钟能懂
2. **核心要点**: 5-10 条, 每条带视频时间码 `[00:05:30]` 锚点
3. **时间轴主题**: 视频自然分段的主题, 标注起止时间码
4. **关键术语**: 中英对照, 配视频首次出现的时间码

### index.html 必备元素

- 顶部: 视频元素(原生 `<video>`), 可拖动进度条
- 左侧: transcript.txt 文字流(每段都带 `data-start` 时间码, 点击跳到视频对应秒)
- 右侧: summary.md 精华(每条结论的"→" 按钮跳到视频对应秒; 引用关键帧时显示缩略图)
- 底部: 关键帧缩略图网格(点击放大)

## 验证

跑完后必须检查 4 项:

1. **HTML 完整性**: `index.html` 能在浏览器打开, 视频能播放
2. **时间码跳转**: 点击 transcript 任一段, 视频跳到对应秒
3. **帧引用**: summary 中所有"→ 关键帧" 链接的 `frame_NNN.jpg` 路径存在
4. **summary 必填字段**: 一句话总览 + 核心要点(≥5 条) + 时间轴主题(≥3 段) + 关键术语(≥5 个)

## 增量更新

支持增量更新(同源视频可以重跑, 只重生成变化的产物):

- 视频未变: 只重跑 `build-html.py`, 不重抽 wav/帧
- 转录未变: 跳过 whisper, 只重生成 summary.md 与 index.html
- 摘要改写: 手动改 `summary.md`, 重跑 `build-html.py` 即可

## 风险与边界

- **whisper 准确度**: 中文/口音重/多人会议 准确度下降, 需要人工校对 transcript
- **关键帧密度**: 默认 60s 1 帧, 适合 30-120 分钟讲座; 短于 30 分钟建议 30s 1 帧, 长于 2 小时建议 120s 1 帧
- **依赖 ffmpeg + Python 3.10+ + openai-whisper**: 跑前用 `scripts/check-deps.sh` 验证
- **磁盘空间**: 1 小时视频约产生 200MB 中间产物(60 帧 + wav + 转录); 完工后可清理

## 不要做

- 不要用 LLM 直接生成整篇 summary(容易跑题且无法验证)— 必须按 `references/extraction-workflow.md` 的分段式方法
- 不要把 transcript 的所有内容塞进 index.html(噪音大)— 只显示精简的 transcript.txt 文字稿, summary 单独存在
- 不要修改原始视频(本技能只读)

## 相关引用

- `references/extraction-workflow.md`: 摘要提炼的 4 段式方法论
- `references/format-spec.md`: `summary.md` 与 `index.html` 的字段规范
- `references/best-practices.md`: 摘要写作的常见误区与最佳实践

## 依赖

- `ffmpeg` (Homebrew / apt / dnf)
- `python3.10+` (推荐 3.12)
- `openai-whisper` (通过 `uv tool run openai-whisper` 临时环境, 不污染项目)
- 磁盘: 每小时视频约 250MB(含中间产物)
- 首次运行: 自动下载 whisper 模型(small 462MB / medium 1.5GB)