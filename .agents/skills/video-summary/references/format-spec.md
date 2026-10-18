# 输出格式规范

`video-summary` skill 必须产出 3 类文件: `transcript.txt` / `summary.md` / `index.html`。本文定义每类文件的字段与格式约束。

## 1. `transcript.txt` 纯文字稿

来源: whisper 转录产物 `*.txt` 直接使用(或去掉时间码头)。

**必填字段**: 无(纯文本即可)

**格式约束**:

- UTF-8 编码
- 按段落用空行分隔(不强制但推荐)
- **不**包含 SRT 时间码(`[00:00:00,000 --> 00:00:05,360]`)
- **不**包含 JSON 段落号(seg-0001 等)
- 长度: 视频 1 小时约 1 万-1.5 万字

示例:

```text
Cloud MD, permissions, plan mode, skills, hooks, plugins, MCP, you name it.
Everything to truly personalize Cloud Code and get the best results out of it.

But the most important thing when working with Cloud Code, again, is that the model is
stateless. It has no in session memory, no memory between the calls.
```

## 2. `summary.md` 视频精华总结

**必填字段** 4 段(详见 `extraction-workflow.md`):

1. 一句话总览
2. 核心要点(带时间码)
3. 时间轴主题
4. 关键术语(中英对照)

**时间码格式**:

- `[HH:MM:SS]` — 3 段, 每段 2 位
- 必须来自 segments.jsonl 的 `start_sec` 字段
- 转字符串: `f"{int(sec//3600):02d}:{int((sec%3600)//60):02d}:{int(sec%60):02d}"`

**关键帧引用格式**:

- `frame_NNN.jpg` — 3 位补零
- 必须在视频同级的 `frames/` 目录或与视频同目录存在
- 与时间码配对使用: `[00:05:30] 这是关键论点 frame_005.jpg`

**禁用**:

- 视频/frame 编号单独引用(必须有 `[HH:MM:SS]` 时间码)
- 模糊时间码("大约" "差不多" 等)
- 跨章节引用(如 `frame_046-048`, 应选一帧)

## 3. `index.html` 单页 HTML 报告

**文件结构**: 单文件, 全部 CSS 与 JS inline, 无外部依赖。

**核心交互**:

1. **顶部视频**: 原生 `<video>` 标签, src 指向 `xx.mp4`(同目录相对路径)
2. **左侧文字稿**: 每个段落带 `data-sec` 属性, 点击跳到视频对应秒
3. **右侧精华总结**: 解析 `[HH:MM:SS]` 为可点击时间码, 解析 `frame_NNN.jpg` 为可点击缩略图
4. **底部关键帧**: 自动列出所有 `frame_*.jpg`, 点击跳到视频对应秒

**生成参数**:

| 参数 | 必填 | 说明 |
|---|---|---|
| `--video` | 是 | 原始视频路径 |
| `--transcript` | 是 | transcript.txt 路径 |
| `--segments` | 否 | segments.jsonl 路径(若缺, 文字稿不带时间码) |
| `--summary` | 否 | summary.md 路径(若缺, 右侧空) |
| `--out` | 是 | 输出 index.html 路径 |
| `--title` | 否 | HTML `<title>`, 默认用视频文件名 |

**输出 HTML 的关键元素**:

```html
<video id="video" controls preload="metadata">
  <source src="claude-code-tutorial.mp4" type="video/mp4">
</video>

<p class="line" data-sec="30">
  <a class="tlink" href="#" data-sec="30">
    <span class="t">00:00:30</span>
    <span class="play">▶</span>
  </a>
  <span class="tx">Cloud MD, permissions, plan mode...</span>
</p>
```

**自动行为**:

- 点击文字稿段落 → 跳到视频对应秒
- 点击精华时间码 → 跳到视频对应秒
- 视频播放时自动高亮当前段
- 关键帧点击 → 跳到视频对应秒

## 4. 文件命名与位置

输出 4 类文件, **与视频同级**:

```text
/path/to/parent/
├── xx.mp4                # 原始视频(只读)
├── index.html             # HTML 报告(主入口)
├── transcript.txt          # 文字稿
└── summary.md             # 精华总结
```

中间产物(`*.wav` / `*.srt` / `*.json` / `frames/` / `segments.jsonl`)可保留但**不计入交付物**。

## 5. 校验脚本(供 build-html.py 与 CI 使用)

```python
# 伪代码: 校验 summary.md 必填字段
def validate_summary(md_text):
    assert "## 一句话总览" in md_text
    assert "## 核心要点" in md_text
    assert len(re.findall(r"\[\d{2}:\d{2}:\d{2}\]", md_text)) >= 5
    assert "## 时间轴主题" in md_text
    assert "## 关键术语" in md_text
    return True
```
