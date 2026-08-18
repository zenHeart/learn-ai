#!/usr/bin/env bash
# 抽单声道 16kHz wav(whisper 最佳输入)
# 用法: extract-audio.sh <video> <out_dir>
set -euo pipefail

VIDEO="${1:?需要视频路径}"
OUT_DIR="${2:-$(dirname "$VIDEO")}"

mkdir -p "$OUT_DIR"
BASE=$(basename "$VIDEO")
STEM="${BASE%.*}"
OUT="$OUT_DIR/$STEM.wav"

if [ -f "$OUT" ]; then
  echo "[skip] $OUT 已存在"
  exit 0
fi

ffmpeg -hide_banner -loglevel error -y \
  -i "$VIDEO" \
  -vn -ac 1 -ar 16000 -c:a pcm_s16le \
  "$OUT"
echo "[ok] -> $OUT ($(du -h "$OUT" | cut -f1))"
