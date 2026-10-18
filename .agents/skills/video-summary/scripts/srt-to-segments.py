#!/usr/bin/env python3
"""
SRT → segments.jsonl 转换器
每条记录:
{
  "id", "start_ts", "end_ts", "start_sec", "end_sec",
  "transcript", "char_count", "word_count",
  "topic", "intent", "key_terms"  # 启发式
}
"""

import argparse
import json
import re
import sys
from pathlib import Path


SRT_TS = re.compile(
    r"(\d{2}):(\d{2}):(\d{2})[,.](\d{3})\s*-->\s*(\d{2}):(\d{2}):(\d{2})[,.](\d{3})"
)


def parse_srt(path: Path):
    content = path.read_text(encoding="utf-8").replace("\r\n", "\n").replace("\r", "\n")
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
        h1, m1, s1, ms1, h2, m2, s2, ms2 = m.groups()
        start = int(h1) * 3600 + int(m1) * 60 + int(s1) + int(ms1) / 1000
        end = int(h2) * 3600 + int(m2) * 60 + int(s2) + int(ms2) / 1000
        out.append((start, end, text))
    return out


def fmt_ts(sec: float) -> str:
    h = int(sec // 3600)
    m = int((sec % 3600) // 60)
    s = int(sec % 60)
    ms = int(round((sec - int(sec)) * 1000))
    return f"{h:02d}:{m:02d}:{s:02d}.{ms:03d}"


# 关键词 → topic 启发式
TOPIC_KEYWORDS = {
    "intro": ["welcome", "introduction", "today we"],
    "permissions": ["permission", "bypass", "classifier", "deny", "ask", "auto mode"],
    "skills": ["skill", "SKILL.md", "user-invocable", "description"],
    "slash": ["slash command", "/init", "/commit", "/deploy"],
    "memory": ["CLAUDE.md", "memory", "remember"],
    "mcp": ["mcp", "model context protocol"],
    "hooks": ["hook", "pre-tool", "post-tool"],
    "tips": ["tip ", "ykdojo", "github cli", "draft pr", "gh pr"],
    "sub-agents": ["sub-agent", "subagent", "coordinator", "workflow"],
    "auto-mode": ["auto mode", "middle path", "permission fatigue"],
    "html-context": ["html", "wireframe", "verify", "visual"],
    "physics": ["rapier", "three.js", "vite", "slingshot"],
    "qna": ["depends on the engineer", "reviewer", "verify"],
}


def guess_topic(text: str):
    lower = text.lower()
    for topic, kws in TOPIC_KEYWORDS.items():
        if any(kw in lower for kw in kws):
            return topic
    return None


INTENT_KEYWORDS = {
    "tip": ["tip ", "here's a tip"],
    "feature-demo": ["let me show", "i'm going to", "i'll add"],
    "anti-pattern": ["don't", "avoid", "permission fatigue"],
    "deep-dive": ["how does", "behind the scenes", "in detail"],
    "philosophy": ["the most important", "rule of thumb", "depends on"],
    "qna": ["depends on", "reviewer", "what do you think"],
    "outro": ["thanks for watching", "subscribe", "see you next"],
}


def guess_intent(text: str):
    lower = text.lower()
    for intent, kws in INTENT_KEYWORDS.items():
        if any(kw in lower for kw in kws):
            return intent
    return None


KEY_TERM_PATTERNS = [
    (r"\bclaude\.md\b", "CLAUDE.md"),
    (r"\bSKILL\.md\b", "SKILL.md"),
    (r"\bMCP\b", "MCP"),
    (r"\bRapier\b", "Rapier"),
    (r"\bThree\.js\b", "Three.js"),
    (r"\bVite\b", "Vite"),
    (r"\bauto mode\b", "auto mode"),
    (r"\bgithub cli\b", "GitHub CLI"),
    (r"\bdraft pr\b", "draft PR"),
    (r"\bskills?\b", "skill"),
    (r"\bsub-?agents?\b", "sub-agent"),
    (r"\bcoordinator\b", "coordinator"),
    (r"\bhook\b", "hook"),
    (r"\bclassifier\b", "classifier"),
    (r"\bslingshot\b", "slingshot"),
    (r"\bplaywright\b", "Playwright"),
    (r"\buser-invocable\b", "user-invocable"),
    (r"\bAssembled Prompt\b", "Assembled Prompt"),
    (r"\b11 tips\b", "11 tips"),
    (r"\bgh pr create\b", "gh pr create"),
    (r"\bfewer permission\b", "fewer-permission-prompts"),
]


def extract_key_terms(text: str) -> list:
    seen = set()
    out = []
    for pat, term in KEY_TERM_PATTERNS:
        if re.search(pat, text, re.IGNORECASE) and term not in seen:
            seen.add(term)
            out.append(term)
    return out


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--srt", required=True)
    ap.add_argument("--out", required=True)
    ap.add_argument("--merge-gap", type=int, default=2)
    ap.add_argument("--max-len", type=int, default=400)
    args = ap.parse_args()

    raw = parse_srt(Path(args.srt))
    print(f"[info] 解析 {len(raw)} 条 SRT 记录", file=sys.stderr)

    merged = []
    for start, end, text in raw:
        if merged and (start - merged[-1][1]) <= args.merge_gap:
            ps, pe, pt = merged[-1]
            merged[-1] = (ps, end, (pt + " " + text).strip())
        else:
            merged.append((start, end, text))

    final = []
    for start, end, text in merged:
        if len(text) <= args.max_len:
            final.append((start, end, text))
            continue
        parts = re.split(r"(?<=[.!?;])\s+", text)
        cur = ""
        cur_start = start
        for p in parts:
            cand = (cur + " " + p).strip() if cur else p
            if len(cand) <= args.max_len or not cur:
                cur = cand
            else:
                final.append((cur_start, start, cur))
                cur_start = start
                cur = p
        if cur:
            final.append((cur_start, end, cur))

    print(f"[info] 合并/拆分后 {len(final)} 条 segment", file=sys.stderr)

    out_path = Path(args.out)
    out_path.parent.mkdir(parents=True, exist_ok=True)
    with out_path.open("w", encoding="utf-8") as f:
        for i, (start, end, text) in enumerate(final, 1):
            rec = {
                "id": f"seg-{i:04d}",
                "start_ts": fmt_ts(start),
                "end_ts": fmt_ts(end),
                "start_sec": round(start, 3),
                "end_sec": round(end, 3),
                "transcript": text,
                "char_count": len(text),
                "word_count": len(text.split()),
                "topic": guess_topic(text),
                "intent": guess_intent(text),
                "key_terms": extract_key_terms(text),
            }
            f.write(json.dumps(rec, ensure_ascii=False) + "\n")
    print(f"[ok] -> {out_path}", file=sys.stderr)


if __name__ == "__main__":
    main()
