#!/usr/bin/env python3
"""
根据 transcript.txt + SRT(优先) + segments.jsonl + summary.md 生成 index.html

UX 设计(由 product-designer-ux 子代理设计):
- 三栏布局: 视频 sticky 左 / 章节大纲 sticky 中 / 笔记式总结 右
- 笔记式总结: callout 块 + 大纲 + 术语内联 tooltip + 自检问题
- 完全移除关键帧网格
- 关键术语内联悬停 tooltip
- 末尾"自检问题" 主动回忆模块
- 移动端三 Tab 切换
- 暗色模式 + prefers-reduced-motion 友好

用法: build-html.py --video X --transcript Y [--srt S] --summary W --out index.html
"""

import argparse
import base64
import html
import json
import re
from pathlib import Path


def fmt_sec(sec):
    sec = int(sec)
    h, m, s = sec // 3600, (sec % 3600) // 60, sec % 60
    return f"{h:02d}:{m:02d}:{s:02d}"


def fmt_min(sec):
    sec = int(sec)
    h, m, s = sec // 3600, (sec % 3600) // 60, sec % 60
    if h > 0:
        return f"{h}:{m:02d}:{s:02d}"
    return f"{m}:{s:02d}"


# ---------- SRT 解析 ----------

SRT_TS = re.compile(
    r"(\d{2}):(\d{2}):(\d{2})[,.](\d{3})\s*-->\s*(\d{2}):(\d{2}):(\d{2})[,.](\d{3})"
)


def parse_srt(path):
    if not path or not Path(path).exists():
        return []
    content = Path(path).read_text(encoding="utf-8").replace("\r\n", "\n").replace("\r", "\n")
    blocks = re.split(r"\n\s*\n", content.strip())
    out = []
    for block in blocks:
        lines = [ln.strip() for ln in block.split("\n") if ln.strip()]
        if len(lines) < 2:
            continue
        m = SRT_TS.search(lines[0])
        if not m:
            if len(lines) < 3:
                continue
            m = SRT_TS.search(lines[1])
            if not m:
                continue
            text = " ".join(lines[2:]).strip()
        else:
            text = " ".join(lines[1:]).strip()
        if not text:
            continue
        h1, m1, s1, ms1, h2, m2, s2, ms2 = m.groups()
        start = int(h1) * 3600 + int(m1) * 60 + int(s1) + int(ms1) / 1000
        end = int(h2) * 3600 + int(m2) * 60 + int(s2) + int(ms2) / 1000
        out.append((start, end, text))
    return out


def merge_srt(segments, max_gap=1.5, max_len=500):
    if not segments:
        return []
    merged = []
    for start, end, text in segments:
        if merged and (start - merged[-1][1]) <= max_gap:
            ps, pe, pt = merged[-1]
            merged[-1] = (ps, end, (pt + " " + text).strip())
        else:
            merged.append((start, end, text))
    final = []
    for start, end, text in merged:
        if len(text) <= max_len:
            final.append((start, end, text))
            continue
        parts = re.split(r"(?<=[.!?;])\s+", text)
        cur, cur_start = "", start
        for p in parts:
            cand = (cur + " " + p).strip() if cur else p
            if len(cand) <= max_len or not cur:
                cur = cand
            else:
                final.append((cur_start, start, cur))
                cur_start, cur = start, p
        if cur:
            final.append((cur_start, end, cur))
    return final


def load_segments_fallback(path):
    out = []
    if not path or not Path(path).exists():
        return out
    for line in Path(path).read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if not line:
            continue
        try:
            seg = json.loads(line)
            out.append((seg["start_sec"], seg["end_sec"], seg["transcript"]))
        except (json.JSONDecodeError, KeyError):
            continue
    return out


def load_transcript_text(path):
    if path and Path(path).exists():
        return Path(path).read_text(encoding="utf-8")
    return ""


# ---------- summary 解析 ----------

def ts_to_sec(ts):
    if not ts:
        return None
    parts = ts.split(":")
    try:
        return int(parts[0]) * 3600 + int(parts[1]) * 60 + int(parts[2])
    except (ValueError, IndexError):
        return None


def parse_summary(md_text):
    if not md_text:
        return "", [], [], []
    lines = md_text.split("\n")
    sections = {"一句话总览": [], "核心要点": [], "时间轴主题": [], "关键术语": []}
    current = None
    for line in lines:
        line = line.rstrip()
        m = re.match(r"^##\s+(.+)$", line)
        if m:
            name = m.group(1).strip()
            if name in sections:
                current = name
                continue
        if current is None:
            continue
        if line.strip():
            sections[current].append(line)

    key_points = []
    for line in sections["核心要点"]:
        m = re.match(r"^[-*]\s+(.+)$", line)
        if m:
            content = m.group(1)
            tm = re.search(r"\[(\d{1,2}:\d{2}:\d{2})\]", content)
            ts = tm.group(1) if tm else None
            key_points.append({"ts": ts, "text": content, "sec": ts_to_sec(ts) if ts else None})

    timeline = []
    for line in sections["时间轴主题"]:
        m = re.match(r"^[-*]\s+\*?\*?\[(\d{2}:\d{2}:\d{2})\s*-\s*(\d{2}:\d{2}:\d{2})\]\s*(.+?)\*?\*?[::]\s*(.+)$", line)
        if m:
            start_str, end_str = m.group(1), m.group(2)
            timeline.append({
                "start": start_str, "end": end_str,
                "start_sec": ts_to_sec(start_str),
                "end_sec": ts_to_sec(end_str),
                "title": m.group(3).strip(), "desc": m.group(4).strip(),
            })

    terms = []
    for line in sections["关键术语"]:
        cells = [c.strip() for c in line.strip().strip("|").split("|")]
        if len(cells) >= 3 and "---" not in cells[0] and "术语" not in cells[0]:
            tm = re.search(r"\[(\d{2}:\d{2}:\d{2})\]", cells[2] if len(cells) < 4 else cells[3])
            ts = tm.group(1) if tm else None
            terms.append({
                "name": cells[0], "desc": cells[1] if len(cells) > 1 else "",
                "ts": ts, "sec": ts_to_sec(ts) if ts else None,
            })

    one_liner = " ".join(sections["一句话总览"]).strip()
    # 去掉 ">" 引用符号
    one_liner = re.sub(r"^>\s*", "", one_liner)
    return one_liner, key_points, timeline, terms


# ---------- Renderer: 各种块 ----------

def render_chapter_items(timeline):
    """中间侧边栏的章节卡片"""
    if not timeline:
        return '<p class="empty">无章节</p>'
    items = []
    palette = ["💡", "🔐", "🎯", "🛠️", "🌐", "📚", "🔄"]
    for i, t in enumerate(timeline):
        icon = palette[i % len(palette)]
        items.append(
            f'<div class="chapter-item" data-idx="{i}" '
            f'data-sec="{int(t.get("start_sec", 0))}" '
            f'data-start="{int(t.get("start_sec", 0))}" '
            f'data-end="{int(t.get("end_sec", 0))}">'
            f'<span class="chapter-num">CH {i+1:02d}</span>'
            f'<span class="chapter-range">{t["start"]} – {t["end"]}</span>'
            f'<div class="chapter-title">{icon} {html.escape(t["title"])}</div>'
            f'<div class="chapter-desc">{html.escape(t["desc"])}</div>'
            f'</div>'
        )
    return "\n".join(items)


def render_chapter_outline(timeline, key_points):
    """右侧大纲: <details> 折叠, 每个章节含要点关联"""
    if not timeline:
        return '<p class="empty">无大纲</p>'
    parts = []
    for i, t in enumerate(timeline):
        sec = int(t.get("start_sec", 0))
        # 找本章节内的核心要点
        end_sec = int(t.get("end_sec", sec + 600))
        in_range_kps = [
            kp for kp in key_points
            if kp.get("sec") and sec <= kp["sec"] < end_sec
        ]
        kp_list = "".join(
            f'<li>{process_inline(kp["text"], frame_map=None)}</li>'
            for kp in in_range_kps
        )
        details = f"""
<details id="outline-{i}" class="chapter-block">
  <summary>
    <span class="chev">▸</span>
    <strong>{html.escape(t['title'])}</strong>
    <span class="crange">{t['start']} – {t['end']}</span>
  </summary>
  <div class="body">
    <p style="color: var(--fg-muted); font-size: 13.5px; margin: 4px 0 12px 0;">
      {html.escape(t['desc'])}
    </p>
    {('<ul style="margin: 0; padding-left: 20px; font-size: 14px;">' + kp_list + '</ul>') if kp_list else ''}
    <p style="margin-top: 12px;">
      <button class="tlink" data-sec="{sec}">▶ 跳到视频 {t['start']}</button>
    </p>
  </div>
</details>"""
        parts.append(details)
    return "\n".join(parts)


def render_keypoint_blocks(key_points):
    """核心收获: 每个要点一个 callout 块"""
    if not key_points:
        return '<p class="empty">无核心要点</p>'
    palette = ["💡", "🔥", "🎯", "⚙️", "🛡️", "🚀", "✨", "🧠", "📐", "⚡"]
    blocks = []
    for i, kp in enumerate(key_points, 1):
        sec = kp.get("sec") or 0
        ts = kp.get("ts") or "—"
        icon = palette[(i - 1) % len(palette)]
        text = process_inline(kp["text"], frame_map=None)
        blocks.append(f"""
<article class="kp-block callout" data-sec="{sec}">
  <span class="kp-num-pill">{i}</span>
  <strong style="font-size: 15.5px;">{icon} {text}</strong>
  <p style="margin: 6px 0 0 0; font-size: 12px; color: var(--fg-muted);">
    <button class="tlink" data-sec="{sec}"><span class="t">{ts}</span><span class="play">▶</span></button>
  </p>
</article>""")
    return "\n".join(blocks)


def render_terms_inline(terms):
    """关键术语: 内联带 tooltip 的彩色虚线 + 末段说明"""
    if not terms:
        return '<p class="empty">无关键术语</p>'
    items = []
    for t in terms:
        sec = t.get("sec") or 0
        ts_html = ""
        if t.get("ts"):
            ts_html = (
                f' <button class="tlink" data-sec="{sec}">'
                f'<span class="t">{t["ts"]}</span><span class="play">▶</span></button>'
            )
        items.append(
            f'<div style="margin: 8px 0;">'
            f'<span class="term" data-tip="{html.escape(t["desc"], quote=True)}">'
            f'{html.escape(t["name"])}</span>{ts_html}'
            f'</div>'
        )
    return "\n".join(items)


def render_recall_questions(key_points):
    """学完自检: 用要点生成 5 个主动回忆题"""
    if not key_points:
        return '<li class="empty">无自检题</li>'
    # 用前 5 个要点生成自检
    items = []
    for kp in key_points[:5]:
        sec = kp.get("sec") or 0
        ts = kp.get("ts") or "—"
        # 从要点文本抽取主语(取前 1-2 句)
        text = kp["text"]
        # 去掉 [时间码] 标记
        clean = re.sub(r"\[\d{2}:\d{2}:\d{2}\]\s*", "", text)
        # 取到第一个句号或逗号
        short = re.split(r"[;,。]", clean, maxsplit=1)[0].strip()[:50]
        items.append(f"""
<li>
  <strong>Q:</strong> {html.escape(short)} 涉及什么核心概念?
  <a class="show-answer">显示答案</a>
  <div class="answer">
    答: 见 {ts_html(kp["text"], sec)} 的核心要点。<br>
    <strong>提示</strong>: 尝试用自己的话复述, 而非只看不记。
  </div>
</li>""")
    return "\n".join(items)


def ts_html(text, sec):
    return f'<button class="tlink" data-sec="{sec}"><span class="t">{fmt_sec(sec)}</span><span class="play">▶</span></button>'


def render_transcript_html(srt_segments):
    """完整文字稿(默认折叠到末尾 details)"""
    if not srt_segments:
        return '<p class="empty">无文字稿</p>'
    out = []
    for start, end, text in srt_segments:
        sec = int(start)
        ts = fmt_min(start)
        out.append(
            f'<article class="line" data-sec="{sec}">'
            f'<button class="line-ts" data-sec="{sec}">{ts}</button>'
            f'<p>{html.escape(text)}</p>'
            f'</article>'
        )
    return "\n".join(out)


def process_inline(text, frame_map=None):
    """把 [HH:MM:SS] → 可点击时间码; 暂不处理 frame_NNN.jpg (用户已要求移除)"""
    def time_anchor(m):
        ts = m.group(1)
        sec = ts_to_sec(ts)
        if sec is None:
            return m.group(0)
        return (
            f'<button class="tlink" data-sec="{sec}">'
            f'<span class="t">{ts}</span><span class="play">▶</span></button>'
        )

    text = re.sub(r"\[(\d{1,2}:\d{2}:\d{2})\]", time_anchor, text)
    text = re.sub(r"\*\*([^*]+)\*\*", r"<strong>\1</strong>", text)
    text = re.sub(r"`([^`]+)`", r"<code>\1</code>", text)
    text = re.sub(r"(?<!\[)\b(https?://\S+)(?!\])", r'<a href="\1" target="_blank">\1</a>', text)
    return text


# ---------- HTML 模板(由 product-designer-ux 设计) ----------

HTML_TEMPLATE = """<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<title>{title} — 视频精华笔记</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="{one_liner}">
<style>
:root {
  --bg: #faf9f7;
  --bg-card: #ffffff;
  --fg: #1c1917;
  --fg-muted: #57534e;
  --fg-dim: #a8a29e;
  --accent: #D97757;
  --accent-dark: #B85742;
  --accent-bg: #FDF2EC;
  --accent-border: rgba(217,119,87,0.18);
  --border: #e7e5e4;
  --border-dim: #f0eeed;
  --code-bg: #f5f5f4;
  --callout-bg: #fef7f1;
  --callout-border: #f0c9a8;
  --tag-bg: #ede9e3;
  --radius: 10px;
  --radius-sm: 6px;
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.04);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.06);
  --col-video: 320px;
  --col-chapter: 240px;
  --gap: 16px;
  --header-h: 60px;
}
[data-theme="dark"] {
  --bg: #1c1917;
  --bg-card: #292524;
  --fg: #f5f5f4;
  --fg-muted: #a8a29e;
  --fg-dim: #78716c;
  --accent: #E8956F;
  --accent-bg: #2a2018;
  --accent-border: rgba(232,149,111,0.25);
  --border: #44403c;
  --border-dim: #36302d;
  --code-bg: #1a1714;
  --callout-bg: #2a2018;
  --callout-border: #5a3a26;
  --tag-bg: #36302d;
}
* {{ box-sizing: border-box; }}
html, body {{ margin: 0; padding: 0; }}
body {{
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
  background: var(--bg); color: var(--fg);
  line-height: 1.65; font-size: 15px;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}}
a, button {{ color: var(--accent); cursor: pointer; }}
button {{ font: inherit; background: none; border: none; padding: 0; }}
@media (prefers-reduced-motion: reduce) {{
  *, *::before, *::after {{ animation: none !important; transition: none !important; }}
}}

/* 顶部 Header */
.topbar {{
  position: sticky; top: 0; z-index: 50;
  background: rgba(255,255,255,0.92);
  backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--border);
  padding: 10px 20px;
  display: flex; align-items: center; gap: 16px;
  height: var(--header-h);
}}
.crumbs {{
  font-size: 13px; color: var(--fg-muted);
  display: flex; gap: 6px; align-items: center; flex: 1; min-width: 0;
  overflow: hidden; white-space: nowrap;
}}
.crumbs a {{ color: var(--fg-muted); text-decoration: none; }}
.crumbs a:hover {{ color: var(--accent); }}
.crumbs .sep {{ color: var(--fg-dim); }}
.crumbs .current {{ color: var(--fg); font-weight: 600; }}
.actions {{ display: flex; gap: 6px; }}
.btn {{
  font-size: 13px; padding: 6px 12px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border);
  background: var(--bg-card); color: var(--fg);
  cursor: pointer; transition: all .15s ease;
  display: inline-flex; align-items: center; gap: 4px;
}}
.btn:hover {{ border-color: var(--accent); color: var(--accent); }}
.btn-primary {{ background: var(--accent); color: #fff; border-color: var(--accent); }}
.btn-primary:hover {{ background: var(--accent-dark); border-color: var(--accent-dark); color: #fff; }}

/* 三栏布局 */
.layout {{
  display: grid;
  grid-template-columns: var(--col-video) var(--col-chapter) 1fr;
  gap: var(--gap);
  max-width: 1600px;
  margin: 0 auto;
  padding: var(--gap);
  align-items: start;
}}

/* 左侧视频 (sticky) */
.video-col {{
  position: sticky;
  top: calc(var(--header-h) + var(--gap));
  max-height: calc(100vh - var(--header-h) - var(--gap) * 2);
  display: flex; flex-direction: column; gap: 10px;
  min-width: 0;
  overflow: hidden;
}}
.video-wrap {{
  background: #000; border-radius: var(--radius);
  overflow: hidden; position: relative;
  aspect-ratio: 16/9;
  box-shadow: var(--shadow-md);
}}
video {{
  width: 100%; height: auto; max-height: 200px; display: block;
  background: #000;
  object-fit: contain;
}}
.video-overlay {{
  position: absolute; bottom: 0; left: 0; right: 0;
  padding: 10px;
  background: linear-gradient(transparent, rgba(0,0,0,0.7));
  display: flex; gap: 6px; align-items: center;
  opacity: 0; transition: opacity .2s;
}}
.video-wrap:hover .video-overlay,
.video-wrap:focus-within .video-overlay {{ opacity: 1; }}
.video-overlay .ctrl-btn {{
  background: rgba(255,255,255,0.18); color: #fff; border: none;
  padding: 4px 10px; border-radius: 4px; font-size: 12px;
  backdrop-filter: blur(8px);
}}
.video-overlay .ctrl-btn:hover {{ background: rgba(255,255,255,0.3); }}
.video-overlay .ctrl-btn.primary {{ background: var(--accent); }}
.video-overlay .ctrl-spacer {{ flex: 1; }}

.video-meta {{
  padding: 10px 12px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  font-size: 12px; color: var(--fg-muted);
}}
.video-meta h2 {{
  margin: 0 0 4px 0; font-size: 13px;
  color: var(--fg); font-weight: 600; line-height: 1.4;
}}
.video-meta p {{
  margin: 0; font-size: 12px; line-height: 1.55;
  display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical;
  overflow: hidden;
}}

/* 中间章节侧边栏 */
.chapter-col {{
  position: sticky;
  top: calc(var(--header-h) + var(--gap));
  max-height: calc(100vh - var(--header-h) - var(--gap) * 2);
  overflow-y: auto;
  padding-right: 6px;
  scrollbar-width: thin;
  scrollbar-color: var(--fg-dim) transparent;
}}
.chapter-col::-webkit-scrollbar {{ width: 6px; }}
.chapter-col::-webkit-scrollbar-thumb {{ background: var(--fg-dim); border-radius: 3px; }}
.chapter-col h3 {{
  margin: 0 0 12px 0;
  font-size: 11px; font-weight: 700;
  color: var(--fg-muted);
  text-transform: uppercase; letter-spacing: 0.8px;
  padding-left: 12px;
}}
.chapter-item {{
  position: relative;
  padding: 14px 14px 14px 16px;
  margin-bottom: 8px;
  border-radius: var(--radius);
  cursor: pointer;
  transition: all .2s ease;
  background: var(--bg-card);
  border: 1px solid var(--border);
  min-height: 80px;
  display: flex; flex-direction: column; gap: 4px;
}}
.chapter-item::before {{
  content: "";
  position: absolute; left: 0; top: 18px; bottom: 18px;
  width: 3px; border-radius: 0 2px 2px 0;
  background: var(--border-dim);
  transition: background .2s;
}}
.chapter-item:hover::before {{ background: var(--accent); }}
.chapter-item.active {{
  background: var(--accent-bg);
  border-color: var(--accent-border);
}}
.chapter-item.active::before {{ background: var(--accent); }}
.chapter-num {{
  position: absolute; top: 10px; right: 10px;
  font-family: ui-monospace, "SF Mono", monospace;
  font-size: 10px; color: var(--fg-dim);
  background: var(--tag-bg);
  padding: 2px 6px; border-radius: 3px;
}}
.chapter-item.active .chapter-num {{ color: var(--accent); }}
.chapter-title {{
  font-weight: 600; font-size: 14px;
  color: var(--fg); line-height: 1.35;
  padding-right: 50px;
}}
.chapter-range {{
  font-family: ui-monospace, "SF Mono", monospace;
  font-size: 11px; color: var(--accent);
  font-weight: 600;
}}
.chapter-desc {{
  font-size: 12.5px; line-height: 1.55;
  color: var(--fg-muted);
}}

/* 右侧笔记式总结 */
.notes-col {{
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 32px 40px;
  min-width: 0;
  box-shadow: var(--shadow-sm);
}}
.notes-col h1 {{
  font-size: 26px; margin: 0 0 8px 0;
  letter-spacing: -0.02em; color: var(--fg);
  font-weight: 700;
}}
.notes-col .doc-meta {{
  font-size: 12px; color: var(--fg-muted);
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px dashed var(--border);
  display: flex; gap: 12px; flex-wrap: wrap;
}}
.notes-col .doc-meta b {{ color: var(--accent); font-weight: 600; }}
.notes-col h2 {{
  font-size: 18px; font-weight: 700;
  margin: 32px 0 12px 0;
  padding-bottom: 6px;
  border-bottom: 2px solid var(--accent);
  display: inline-block;
}}
.notes-col h2:first-of-type {{ margin-top: 8px; }}
.notes-col h3 {{
  font-size: 15px; margin: 20px 0 8px 0;
  color: var(--fg); font-weight: 700;
}}
.notes-col h3::before {{ content: "## "; color: var(--accent); opacity: 0.6; }}

/* 一句话总览 */
.one-liner-box {{
  font-size: 16px; line-height: 1.6;
  color: var(--fg);
  background: var(--accent-bg);
  border-left: 4px solid var(--accent);
  padding: 16px 20px;
  border-radius: 0 var(--radius) var(--radius) 0;
  margin: 0 0 28px 0;
  position: relative;
}}
.one-liner-box::before {{ content: "💡 "; font-size: 18px; margin-right: 4px; }}

/* Callout 框 */
.callout {{
  background: var(--callout-bg);
  border: 1px solid var(--callout-border);
  border-left: 4px solid var(--accent);
  border-radius: 0 var(--radius) var(--radius) 0;
  padding: 14px 18px;
  margin: 12px 0;
  font-size: 14px;
  line-height: 1.6;
  cursor: pointer;
  transition: all .15s;
}}
.callout:hover {{
  background: var(--bg-card);
  box-shadow: var(--shadow-sm);
}}

/* 要点编号 pill */
.kp-num-pill {{
  display: inline-block;
  width: 22px; height: 22px;
  background: var(--accent); color: #fff;
  border-radius: 50%;
  text-align: center; line-height: 22px;
  font-size: 11px; font-weight: 700;
  margin-right: 8px; vertical-align: middle;
}}

/* 时间码 (内联) */
.tlink {{
  font-family: ui-monospace, "SF Mono", "Menlo", monospace;
  font-size: 12px; color: var(--accent);
  background: var(--accent-bg);
  padding: 1px 6px;
  border-radius: 3px;
  border: 1px solid var(--accent-border);
  cursor: pointer;
  display: inline-flex; align-items: center; gap: 3px;
  text-decoration: none; transition: all .15s;
  vertical-align: baseline;
}}
.tlink:hover {{ background: var(--accent); color: #fff; border-color: var(--accent); }}
.tlink .play {{ font-size: 9px; opacity: 0.7; }}

/* 关键术语 (内联 + tooltip) */
.term {{
  border-bottom: 1px dashed var(--accent);
  cursor: help; position: relative;
  color: var(--accent-dark);
  font-weight: 500;
}}
.term[data-tip]:hover::after {{
  content: attr(data-tip);
  position: absolute; bottom: calc(100% + 6px); left: 50%;
  transform: translateX(-50%);
  background: #1c1917; color: #faf9f7;
  padding: 6px 10px; border-radius: var(--radius-sm);
  font-size: 12px; font-weight: normal;
  white-space: normal; width: 240px;
  z-index: 100; box-shadow: var(--shadow-md);
  line-height: 1.4;
}}
.term[data-tip]:hover::before {{
  content: ""; position: absolute;
  bottom: 100%; left: 50%;
  transform: translateX(-50%);
  border: 5px solid transparent;
  border-top-color: #1c1917;
  z-index: 100;
}}

/* 章节大纲 (details 折叠) */
.chapter-block {{
  margin: 12px 0;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 12px 16px;
  background: var(--bg-card);
}}
.chapter-block summary {{
  cursor: pointer; font-weight: 600;
  color: var(--fg); font-size: 15px;
  list-style: none;
  display: flex; align-items: center; gap: 8px;
}}
.chapter-block summary::-webkit-details-marker {{ display: none; }}
.chapter-block summary .chev {{
  font-size: 10px; color: var(--accent);
  transition: transform .15s;
}}
.chapter-block[open] .chev {{ transform: rotate(90deg); }}
.chapter-block summary .crange {{
  margin-left: auto;
  font-family: ui-monospace, monospace;
  font-size: 11px; color: var(--fg-muted);
  font-weight: normal;
}}
.chapter-block .body {{
  margin-top: 10px; padding-top: 10px;
  border-top: 1px dashed var(--border-dim);
  font-size: 14px; line-height: 1.65;
}}

/* 自检问题 */
.recall-block {{
  margin-top: 32px;
  padding-top: 24px;
  border-top: 2px dashed var(--border);
}}
.recall-toggle {{
  display: inline-flex; align-items: center; gap: 6px;
  font-size: 14px; font-weight: 600;
  color: var(--accent);
  cursor: pointer; padding: 6px 0;
}}
.recall-toggle::before {{
  content: "▸"; font-size: 10px; transition: transform .15s;
}}
.recall-block.open .recall-toggle::before {{ transform: rotate(90deg); }}
.recall-content {{
  display: none; margin-top: 12px;
  padding: 16px;
  background: var(--bg);
  border-radius: var(--radius);
  font-size: 14px;
}}
.recall-block.open .recall-content {{ display: block; }}
.recall-content ol {{ padding-left: 20px; margin: 0; }}
.recall-content li {{ margin: 6px 0; line-height: 1.55; }}
.recall-content .answer {{
  display: none; margin-top: 8px;
  padding: 10px 12px;
  background: var(--accent-bg);
  border-radius: var(--radius-sm);
  font-size: 13px;
  border-left: 3px solid var(--accent);
}}
.recall-content .answer.show {{ display: block; }}
.recall-content .show-answer {{
  font-size: 12px; color: var(--fg-muted);
  margin-left: 8px; text-decoration: underline; cursor: pointer;
}}

/* transcript 折叠 */
.transcript-panel {{
  margin-top: 32px;
  padding-top: 24px;
  border-top: 2px dashed var(--border);
}}
.transcript-panel summary {{
  cursor: pointer;
  font-size: 15px; font-weight: 600;
  color: var(--fg);
  padding: 6px 0; list-style: none;
}}
.transcript-panel summary::before {{
  content: "▸ "; color: var(--accent);
}}
.transcript-panel[open] summary::before {{ content: "▾ "; }}
.transcript-panel summary::-webkit-details-marker {{ display: none; }}
.transcript-body {{
  margin-top: 16px;
  max-height: 60vh;
  overflow-y: auto;
  padding: 12px;
  background: var(--bg);
  border-radius: var(--radius);
  font-size: 14px;
  scrollbar-width: thin;
}}
.transcript-body .line {{
  display: flex; gap: 12px;
  padding: 10px 12px;
  border-radius: var(--radius-sm);
  border-left: 3px solid transparent;
  margin: 2px 0;
  line-height: 1.6;
  align-items: flex-start;
  transition: all .15s;
}}
.transcript-body .line:hover {{
  background: var(--bg-card);
  border-left-color: var(--accent);
}}
.transcript-body .line.active {{
  background: var(--accent-bg);
  border-left-color: var(--accent);
  font-weight: 500;
}}
.transcript-body .line-ts {{
  font-family: ui-monospace, "SF Mono", monospace;
  font-size: 11px; color: var(--accent);
  flex-shrink: 0;
  padding: 2px 6px;
  background: var(--accent-bg);
  border-radius: 3px;
  cursor: pointer;
  margin-top: 2px;
}}
.transcript-body p {{ margin: 0; flex: 1; color: var(--fg); }}

/* 工具类 */
.empty {{ color: var(--fg-dim); font-style: italic; text-align: center; padding: 20px; }}
strong {{ color: var(--accent-dark); font-weight: 600; }}
code {{
  background: var(--code-bg);
  padding: 1px 6px; border-radius: 3px;
  font-size: 13px;
  font-family: ui-monospace, "SF Mono", monospace;
}}

/* 移动端 Tab 切换 */
.mobile-tab-bar {{ display: none; }}
@media (max-width: 1100px) {{
  .layout {{ grid-template-columns: var(--col-video) 1fr; }}
  .chapter-col {{ display: none; }}
  .chapter-col.mobile-show {{
    display: block; position: relative;
    top: auto; max-height: none;
    grid-column: 1 / -1;
  }}
  .video-col.mobile-hide {{ display: none; }}
}}
@media (max-width: 760px) {{
  .layout {{ grid-template-columns: 1fr; padding: 10px; gap: 10px; }}
  .video-col {{
    position: sticky; top: calc(var(--header-h) + 10px);
    z-index: 10; max-height: none;
  }}
  .video-col.mobile-hide {{ display: none; }}
  .chapter-col.mobile-show {{
    position: relative; top: auto; max-height: none;
    grid-column: 1 / -1;
  }}
  .notes-col {{ padding: 20px 18px; }}
  .notes-col h1 {{ font-size: 22px; }}
  .notes-col h2 {{ font-size: 16px; }}
  .topbar {{ padding: 8px 12px; height: 50px; }}
  :root {{ --header-h: 50px; }}
  .mobile-tab-bar {{
    display: flex; position: sticky; top: var(--header-h); z-index: 40;
    background: var(--bg-card);
    border-bottom: 1px solid var(--border);
    padding: 8px; gap: 6px;
  }}
  .mobile-tab-bar button {{
    flex: 1; padding: 8px;
    font-size: 13px; font-weight: 600;
    border-radius: var(--radius-sm);
    background: transparent;
    color: var(--fg-muted);
    border: 1px solid transparent;
  }}
  .mobile-tab-bar button.active {{
    background: var(--accent); color: #fff;
  }}
}}

@media print {{
  .video-col, .chapter-col, .topbar, .mobile-tab-bar, .transcript-panel {{ display: none; }}
  .notes-col {{ box-shadow: none; border: none; }}
}}
</style>
</head>
<body>

<nav class="topbar" role="navigation">
  <div class="crumbs">
    <a href="#">视频库</a><span class="sep">/</span>
    <a href="#">Claude Code 系列</a><span class="sep">/</span>
    <span class="current">{title}</span>
  </div>
  <div class="actions">
    <button class="btn" id="theme-btn" title="切换主题">🌓</button>
    <button class="btn" id="copy-md-btn">复制摘要</button>
    <button class="btn btn-primary" id="download-md-btn">下载 .md</button>
  </div>
</nav>

<div class="mobile-tab-bar">
  <button class="active" data-tab="video">📺 视频</button>
  <button data-tab="chapters">📑 章节</button>
  <button data-tab="notes">📝 笔记</button>
</div>

<div class="layout">

  <aside class="video-col" id="videoCol">
    <div class="video-wrap">
      <video id="video" controls preload="metadata" playsinline poster="frames/frame_001.jpg">
        <source src="{video_src}" type="video/mp4">
      </video>
      <div class="video-overlay">
        <button class="ctrl-btn" id="speed-btn" aria-label="切换倍速">1x</button>
        <button class="ctrl-btn" id="rewind-btn" aria-label="后退 10 秒">⏪</button>
        <button class="ctrl-btn" id="forward-btn" aria-label="前进 10 秒">⏩</button>
        <div class="ctrl-spacer"></div>
        <button class="ctrl-btn primary" id="next-kp-btn" title="跳到下一要点">下一要点 ▶</button>
      </div>
    </div>
    <div class="video-meta">
      <h2>{title} 精华笔记</h2>
      <p>{one_liner}</p>
    </div>
  </aside>

  <aside class="chapter-col" id="chapterCol">
    <h3>📑 章节大纲 ({chapter_count})</h3>
    {chapter_items}
  </aside>

  <main class="notes-col">
    <h1>{title}</h1>
    <div class="doc-meta">
      <span>⏱️ <b>{total_duration}</b></span>
      <span>📝 <b>{kp_count}</b> 核心要点</span>
      <span>📚 <b>{chapter_count}</b> 章节</span>
      <span>📄 <b>{seg_count}</b> 段文字</span>
      <span>🏷️ <b>{term_count}</b> 关键术语</span>
    </div>

    <div class="one-liner-box">{one_liner}</div>

    <h2>核心收获</h2>
    {keypoint_blocks}

    <h2>章节大纲</h2>
    <div>
      {chapter_outline}
    </div>

    <h2>关键术语速查</h2>
    <p style="font-size: 14px; color: var(--fg-muted); margin: 8px 0 16px 0;">
      阅读时遇到 <span class="term" data-tip="示例: 由模型从外部传入的, 不是模型本身的">带虚线下划线</span> 的词, 鼠标悬停即可看到解释。
    </p>
    <div style="font-size: 14px; line-height: 1.8;">
      {terms_inline}
    </div>

    <details class="transcript-panel">
      <summary>📄 完整文字稿 ({seg_count} 段)</summary>
      <div class="transcript-body" id="transcriptBody">
        {transcript_html}
      </div>
    </details>

    <div class="recall-block" id="recallBlock">
      <div class="recall-toggle" id="recallToggle">🧠 学完自检 ({recall_count} 题)</div>
      <div class="recall-content">
        <ol>
          {recall_questions}
        </ol>
      </div>
    </div>

  </main>
</div>

<script data-summary="{summary_b64}">
(function(){{
  'use strict';

  const video = document.getElementById('video');
  function seekTo(sec) {{
    if (!video || isNaN(sec)) return;
    video.currentTime = sec;
    video.pause();
    video.play().catch(()=>{{}});
  }}
  document.addEventListener('click', (e) => {{
    const t = e.target.closest('[data-sec]');
    if (!t) return;
    const sec = parseFloat(t.dataset.sec);
    if (isNaN(sec)) return;
    e.preventDefault();
    seekTo(sec);
  }});

  const chapterItems = Array.from(document.querySelectorAll('.chapter-item'));
  chapterItems.forEach(item => {{
    item.addEventListener('click', () => {{
      const sec = parseFloat(item.dataset.sec);
      if (!isNaN(sec)) {{
        seekTo(sec);
        const outlineId = 'outline-' + (item.dataset.idx || '0');
        const target = document.getElementById(outlineId);
        if (target) {{
          target.open = true;
          target.scrollIntoView({{ behavior: 'smooth', block: 'center' }});
        }}
      }}
    }});
  }});

  function updateChapterHighlight(cur) {{
    let active = null;
    for (const item of chapterItems) {{
      const start = parseFloat(item.dataset.start || '0');
      const end = parseFloat(item.dataset.end || '9e9');
      if (cur >= start && cur < end) {{ active = item; break; }}
    }}
    if (active && !active.classList.contains('active')) {{
      chapterItems.forEach(x => x.classList.remove('active'));
      active.classList.add('active');
      const col = document.getElementById('chapterCol');
      if (col) {{
        const rect = active.getBoundingClientRect();
        const colRect = col.getBoundingClientRect();
        if (rect.top < colRect.top + 50 || rect.bottom > colRect.bottom - 50) {{
          active.scrollIntoView({{ behavior: 'smooth', block: 'center' }});
        }}
      }}
    }}
  }}

  const transcriptLines = Array.from(document.querySelectorAll('#transcriptBody .line'));
  let lastTranscriptIdx = -1;
  video.addEventListener('timeupdate', () => {{
    const cur = video.currentTime;
    let active = null, activeIdx = -1;
    for (let i = 0; i < transcriptLines.length; i++) {{
      const s = parseFloat(transcriptLines[i].dataset.sec || '0');
      if (!isNaN(s) && s <= cur) {{ active = transcriptLines[i]; activeIdx = i; }}
      else if (!isNaN(s) && s > cur) break;
    }}
    if (active && activeIdx !== lastTranscriptIdx) {{
      transcriptLines.forEach(x => x.classList.remove('active'));
      active.classList.add('active');
      const body = document.getElementById('transcriptBody');
      if (body && !body.dataset.userScrolled) {{
        active.scrollIntoView({{ behavior: 'smooth', block: 'center' }});
      }}
      lastTranscriptIdx = activeIdx;
    }}
    updateChapterHighlight(cur);
  }});

  const tb = document.getElementById('transcriptBody');
  if (tb) {{
    tb.addEventListener('scroll', () => {{ tb.dataset.userScrolled = '1'; }},
      {{ passive: true, once: true }});
  }}

  const speedBtn = document.getElementById('speed-btn');
  const speeds = [1.0, 1.25, 1.5, 1.75, 2.0];
  let speedIdx = 0;
  speedBtn && speedBtn.addEventListener('click', () => {{
    speedIdx = (speedIdx + 1) % speeds.length;
    video.playbackRate = speeds[speedIdx];
    speedBtn.textContent = speeds[speedIdx] + 'x';
  }});
  document.getElementById('rewind-btn')?.addEventListener('click', () => {{
    video.currentTime = Math.max(0, video.currentTime - 10);
  }});
  document.getElementById('forward-btn')?.addEventListener('click', () => {{
    video.currentTime = Math.min(video.duration || 0, video.currentTime + 10);
  }});

  const kpItems = Array.from(document.querySelectorAll('.kp-block'));
  document.getElementById('next-kp-btn')?.addEventListener('click', () => {{
    const cur = video.currentTime;
    const next = kpItems.find(c => parseFloat(c.dataset.sec || '0') > cur + 0.5);
    if (next) {{
      seekTo(parseFloat(next.dataset.sec));
      next.scrollIntoView({{ behavior: 'smooth', block: 'center' }});
    }}
  }});

  document.getElementById('recallToggle')?.addEventListener('click', () => {{
    document.getElementById('recallBlock').classList.toggle('open');
  }});
  document.querySelectorAll('.show-answer').forEach(btn => {{
    btn.addEventListener('click', (e) => {{
      e.stopPropagation();
      const ans = btn.parentElement.querySelector('.answer');
      if (ans) ans.classList.toggle('show');
      btn.textContent = ans.classList.contains('show') ? '隐藏答案' : '显示答案';
    }});
  }});

  const summaryMd = document.currentScript.dataset.summary || '';
  try {{
    document.getElementById('copy-md-btn')?.addEventListener('click', () => {{
      const md = decodeURIComponent(escape(atob(summaryMd)));
      navigator.clipboard.writeText(md).then(() => {{
        const b = document.getElementById('copy-md-btn');
        const orig = b.textContent;
        b.textContent = '已复制 ✓';
        setTimeout(() => {{ b.textContent = orig; }}, 1500);
      }});
    }});
    document.getElementById('download-md-btn')?.addEventListener('click', () => {{
      const md = decodeURIComponent(escape(atob(summaryMd)));
      const blob = new Blob([md], {{ type: 'text/markdown;charset=utf-8' }});
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = '{title}-summary.md';
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    }});
  }} catch(e) {{ console.error('复制/下载失败:', e); }}

  document.getElementById('theme-btn')?.addEventListener('click', () => {{
    const isDark = document.documentElement.dataset.theme === 'dark';
    document.documentElement.dataset.theme = isDark ? '' : 'dark';
    localStorage.setItem('video-notes-theme', isDark ? 'light' : 'dark');
  }});
  const saved = localStorage.getItem('video-notes-theme');
  if (saved === 'dark') document.documentElement.dataset.theme = 'dark';

  document.querySelectorAll('.mobile-tab-bar button').forEach(btn => {{
    btn.addEventListener('click', () => {{
      const tab = btn.dataset.tab;
      document.querySelectorAll('.mobile-tab-bar button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const vc = document.getElementById('videoCol');
      const cc = document.getElementById('chapterCol');
      vc.classList.toggle('mobile-hide', tab !== 'video');
      cc.classList.toggle('mobile-show', tab === 'chapters');
      if (tab === 'chapters') {{
        cc.scrollIntoView({{ behavior: 'smooth' }});
      }}
    }});
  }});

}})();
</script>
</body>
</html>
"""


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--video", required=True)
    ap.add_argument("--transcript", required=True)
    ap.add_argument("--segments", help="segments.jsonl 路径(可选, SRT 优先)")
    ap.add_argument("--srt", help="SRT 路径(优先于 segments.jsonl)")
    ap.add_argument("--summary", help="summary.md 路径(可选)")
    ap.add_argument("--out", required=True)
    ap.add_argument("--title", help="HTML 标题(默认用视频文件名)")
    args = ap.parse_args()

    video_path = Path(args.video)
    out_path = Path(args.out)
    out_dir = out_path.parent
    video_basename = video_path.name
    title = args.title or video_path.stem

    srt_segments = []
    if args.srt:
        srt_segments = parse_srt(Path(args.srt))
    if not srt_segments and args.segments:
        srt_segments = load_segments_fallback(args.segments)
    if not srt_segments:
        auto_srt = out_dir / f"{Path(args.transcript).stem}.srt"
        if auto_srt.exists():
            srt_segments = parse_srt(auto_srt)
    srt_segments = merge_srt(srt_segments, max_gap=1.5, max_len=500)

    summary_md = ""
    if args.summary and Path(args.summary).exists():
        summary_md = Path(args.summary).read_text(encoding="utf-8")
    one_liner, key_points, timeline, terms = parse_summary(summary_md)

    total_duration = max(s[1] for s in srt_segments) if srt_segments else 0

    chapter_items = render_chapter_items(timeline)
    chapter_outline = render_chapter_outline(timeline, key_points)
    keypoint_blocks = render_keypoint_blocks(key_points)
    terms_inline = render_terms_inline(terms)
    recall_questions = render_recall_questions(key_points)
    transcript_html = render_transcript_html(srt_segments)

    # base64 编码 summary 用于 JS 复制/下载
    summary_b64 = base64.b64encode(summary_md.encode("utf-8")).decode("ascii")

    # 不用 .format() (CSS 大括号太多), 改用 str.replace 逐个替换
    html_doc = HTML_TEMPLATE
    replacements = {
        "{title}": html.escape(title),
        "{one_liner}": html.escape(one_liner) if one_liner else html.escape(title + " 视频精华笔记"),
        "{video_src}": html.escape(video_basename),
        "{chapter_count}": str(len(timeline)),
        "{chapter_items}": chapter_items,
        "{chapter_outline}": chapter_outline,
        "{total_duration}": fmt_min(total_duration) if total_duration else "—",
        "{kp_count}": str(len(key_points)),
        "{seg_count}": str(len(srt_segments)),
        "{term_count}": str(len(terms)),
        "{recall_count}": str(min(5, len(key_points))),
        "{keypoint_blocks}": keypoint_blocks,
        "{terms_inline}": terms_inline,
        "{recall_questions}": recall_questions,
        "{transcript_html}": transcript_html,
        "{summary_b64}": summary_b64,
    }
    for k, v in replacements.items():
        html_doc = html_doc.replace(k, v)

    # 不用 .format() (CSS 大括号太多), 改用 str.replace 逐个替换占位符
    html_doc = HTML_TEMPLATE
    replacements = {
        "{title}": html.escape(title),
        "{one_liner}": html.escape(one_liner) if one_liner else html.escape(title + " 视频精华笔记"),
        "{video_src}": html.escape(video_basename),
        "{chapter_count}": str(len(timeline)),
        "{chapter_items}": chapter_items,
        "{chapter_outline}": chapter_outline,
        "{total_duration}": fmt_min(total_duration) if total_duration else "—",
        "{kp_count}": str(len(key_points)),
        "{seg_count}": str(len(srt_segments)),
        "{term_count}": str(len(terms)),
        "{recall_count}": str(min(5, len(key_points))),
        "{keypoint_blocks}": keypoint_blocks,
        "{terms_inline}": terms_inline,
        "{recall_questions}": recall_questions,
        "{transcript_html}": transcript_html,
        "{summary_b64}": summary_b64,
    }
    for k, v in replacements.items():
        html_doc = html_doc.replace(k, v)
    # 把 CSS 里的 {{...}} 还原为 {...} (子代理的模板用 .format 风格, 这里我们用 str.replace)
    html_doc = html_doc.replace("{{", "{").replace("}}", "}")

    out_path.write_text(html_doc, encoding="utf-8")
    print(f"[ok] -> {out_path} ({len(html_doc)} 字符)")


if __name__ == "__main__":
    main()
