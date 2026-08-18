#!/usr/bin/env bash
# 用 openai-whisper 转录音频
# 用法: transcribe.sh <wav> [language] [model]
set -euo pipefail

WAV="${1:?需要 wav 路径}"
LANG="${2:-en}"
MODEL="${3:-small}"

OUT_DIR=$(dirname "$WAV")
BASE=$(basename "$WAV" .wav)

# 检测已存在产物
EXISTING=0
for ext in txt srt vtt json; do
  [ -f "$OUT_DIR/$BASE.$ext" ] && EXISTING=$((EXISTING+1))
done
if [ "$EXISTING" -ge 4 ]; then
  echo "[skip] $BASE 转录产物已存在"
  exit 0
fi

# 模型大小选择建议:
#   tiny    75MB  速度快, 准确度低, 适合 2h+ 长视频
#   base    142MB 平衡
#   small   462MB 推荐英文
#   medium  1.5GB 中文/口音重
#   large-v3 3GB 最高质量, 慢

uvx --from openai-whisper whisper "$WAV" \
  --model "$MODEL" \
  --language "$LANG" \
  --output_format all \
  --output_dir "$OUT_DIR" 2>&1 | tail -20

echo "[ok] -> $OUT_DIR/$BASE.{txt,srt,vtt,json,tsv}"
