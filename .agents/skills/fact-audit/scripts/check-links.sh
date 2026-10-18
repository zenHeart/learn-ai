#!/usr/bin/env bash
# check-links.sh — 批量 URL 存活检查
# 用法:
#   ./check-links.sh <file-or-dir> [more-files...]   # 从 markdown 提取 URL 并检查
#   ./check-links.sh -u urls.txt                     # 直接检查 URL 清单（每行一个）
# 退出码: 有 404/000(超时/解析失败) 时为 1，否则 0。403 标记为需人工复核但不失败。
set -u

TIMEOUT=15
UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36"

extract_urls() {
  # 从 markdown 提取 http(s) URL，去重排序
  grep -hoE 'https?://[^)<>"'"'"' ]+' "$@" | sed 's/[.,;:]*$//' | sort -u
}

check_url() {
  local url="$1"
  local code
  code=$(curl -o /dev/null -sS -m "$TIMEOUT" -A "$UA" -L -w '%{http_code}' "$url" 2>/dev/null || echo "000")
  local tag="OK"
  case "$code" in
    200|201|204|301|302) tag="OK" ;;
    401|403) tag="REVIEW(反爬/需登录)" ;;
    404|410) tag="DEAD" ;;
    000) tag="FAIL(超时/解析)" ;;
    *) tag="CHECK($code)" ;;
  esac
  printf '%-4s %-22s %s\n' "$code" "$tag" "$url"
  case "$tag" in DEAD|FAIL*) return 1 ;; *) return 0 ;; esac
}

main() {
  local fail=0 total=0
  if [ "${1:-}" = "-u" ]; then
    shift
    mapfile -t urls < "$1"
  else
    [ $# -ge 1 ] || { echo "用法: $0 <file-or-dir...> | -u urls.txt" >&2; exit 2; }
    files=$(find "$@" -type f \( -name '*.md' -o -name '*.markdown' \) 2>/dev/null || true)
    [ -n "$files" ] || files="$@"
    mapfile -t urls < <(extract_urls $files)
  fi
  echo "共 ${#urls[@]} 个去重 URL" >&2
  for u in "${urls[@]}"; do
    total=$((total+1))
    check_url "$u" || fail=$((fail+1))
  done
  echo "---" >&2
  echo "检查 $total 个，失败 $fail 个" >&2
  [ "$fail" -eq 0 ]
}

main "$@"
