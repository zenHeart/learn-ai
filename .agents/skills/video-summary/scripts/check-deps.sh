#!/usr/bin/env bash
# 检查 video-summary skill 的依赖
set -euo pipefail

echo "[check] 验证 video-summary skill 依赖"
echo ""

check() {
  if command -v "$1" >/dev/null 2>&1; then
    echo "  [ok] $1: $(command -v "$1")"
  else
    echo "  [MISS] $1 未安装"
  fi
}

check ffmpeg
check python3
check uvx

PY_VERSION=$(python3 -c "import sys; print(f'{sys.version_info.major}.{sys.version_info.minor}')")
echo "  [info] Python $PY_VERSION(需 3.10+)"

# whisper 模型下载位置
CACHE="${HOME}/.cache/whisper"
if [ -d "$CACHE" ]; then
  MODELS=$(ls "$CACHE" 2>/dev/null | tr '\n' ' ')
  echo "  [info] 已下载模型: $MODELS"
else
  echo "  [info] 尚未下载任何 whisper 模型(首次运行会自动下载)"
fi

echo ""
echo "建议安装:"
echo "  macOS:   brew install ffmpeg; brew install python@3.12; brew install uv"
echo "  Ubuntu:  sudo apt install ffmpeg python3.12; pip install uv"
