#!/usr/bin/env bash
# notify-on-stop.sh - Cursor stop hook: show a macOS notification when the agent loop ends.
# See: https://cursor.com/docs/agent/hooks (stop hook)
# - Throttles to at most one notification per 15s per workspace (avoids duplicate pops).
# - Shows project root name so you can tell which project completed.

input=$(cat)
throttle_sec=15
throttle_dir="${TMPDIR:-/tmp}/cursor-notify"
mkdir -p "$throttle_dir"

# Parse payload (requires jq for project name and throttle)
if command -v jq >/dev/null 2>&1; then
  status=$(echo "$input" | jq -r '.status // "completed"')
  # workspace_roots is array of paths; use basename of first root as project name
  first_root=$(echo "$input" | jq -r '.workspace_roots[0] // ""')
  if [[ -n "$first_root" ]]; then
    project_name=$(basename "$first_root")
  else
    project_name=""
  fi
else
  status="completed"
  project_name=""
fi

case "$status" in
  completed) msg="Agent 任务已完成" ;;
  aborted)   msg="Agent 任务已中止" ;;
  error)     msg="Agent 任务出错" ;;
  *)         msg="Agent 任务结束 ($status)" ;;
esac

# Throttle: only one notification per throttle_sec per project (reduces duplicate pops)
do_notify=true
if [[ -n "$first_root" ]] && [[ -n "$project_name" ]]; then
  key=$(echo -n "$first_root" | shasum 2>/dev/null | cut -c1-16)
  [[ -z "$key" ]] && key=$(echo -n "$first_root" | tr -c '[:alnum:]' '_' | tail -c 32)
  throttle_file="$throttle_dir/${key:-default}"
  if [[ -f "$throttle_file" ]]; then
    last=$(cat "$throttle_file" 2>/dev/null)
    now=$(date +%s)
    if [[ -n "$last" ]] && [[ $((now - last)) -lt $throttle_sec ]]; then
      do_notify=false
    fi
  fi
  if [[ "$do_notify" == true ]]; then
    date +%s >"$throttle_file" 2>/dev/null || true
  fi
fi

# macOS notification: show project name so you know which project finished
if [[ "$(uname -s)" == "Darwin" ]] && [[ "$do_notify" == true ]]; then
  if [[ -n "$project_name" ]]; then
    title="Cursor Agent — $project_name"
    subtitle="$msg"
  else
    title="Cursor Agent"
    subtitle="$msg"
  fi
  osascript -e "display notification \"$subtitle\" with title \"$title\" sound name \"Glass\"" 2>/dev/null || true
fi

# Stop hook: output empty JSON; exit 0 so we don't block
echo '{}'
exit 0
