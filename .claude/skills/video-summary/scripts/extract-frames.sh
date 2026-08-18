#!/usr/bin/env bash
# 抽关键帧 JPG
# 用法: extract-frames.sh <video> <out_dir> [--interval N]
set -euo pipefail

VIDEO="${1:?需要视频路径}"
OUT_DIR="${2:-$(dirname "$VIDEO")}"
INTERVAL="${3:-60}"

mkdir -p "$OUT_DIR"

EXISTING=$(ls "$OUT_DIR"/frame_*.jpg 2>/dev/null | wc -l | tr -d ' ' || echo 0)
if [ "$EXISTING" -gt 0 ]; then
  echo "[skip] $OUT_DIR 已有 $EXISTING 帧"
  exit 0
fi

# 用 %03d 占位确保 3 位补零(frame_001.jpg, frame_002.jpg, ...)
ffmpeg -hide_banner -loglevel error \
  -i "$VIDEO" \
  -vf "fps=1/${INTERVAL}" -q:v 2 \
  "$OUT_DIR/frame_%03d.jpg"

COUNT=$(ls "$OUT_DIR"/frame_*.jpg | wc -l | tr -d ' ')
echo "[ok] -> $OUT_DIR/ ($COUNT 帧, 每 ${INTERVAL}s 1 帧)"
