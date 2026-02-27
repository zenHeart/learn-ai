#!/usr/bin/env bash
# notify-on-stop.sh - Claude Code TaskCompleted hook: show a macOS notification when task completes.
# See: https://code.claude.com/docs/en/hooks
# - Throttles to at most one notification per 15s per workspace (avoids duplicate pops).
# - Shows project name so you can tell which project completed.

input=$(cat)
throttle_sec=15
throttle_dir="${TMPDIR:-/tmp}/claude-notify"
mkdir -p "$throttle_dir"

# Parse payload (requires jq for project name and throttle)
if command -v jq >/dev/null 2>&1; then
  # TaskCompleted provides task_id, task_subject, task_description
  task_id=$(echo "$input" | jq -r '.task_id // ""')
  task_subject=$(echo "$input" | jq -r '.task_subject // ""')
  # Get current working directory as project identifier
  cwd=$(echo "$input" | jq -r '.cwd // ""')
  if [[ -n "$cwd" ]]; then
    project_name=$(basename "$cwd")
  else
    project_name=""
  fi

  if [[ -n "$task_subject" ]]; then
    msg="任务已完成: $task_subject"
  else
    msg="Claude Code 任务已完成"
  fi
else
  msg="Claude Code 任务已完成"
  project_name=""
  cwd=""
fi

# Throttle: only one notification per throttle_sec per project (reduces duplicate pops)
do_notify=true
if [[ -n "$cwd" ]] && [[ -n "$project_name" ]]; then
  key=$(echo -n "$cwd" | shasum 2>/dev/null | cut -c1-16)
  [[ -z "$key" ]] && key=$(echo -n "$cwd" | tr -c '[:alnum:]' '_' | tail -c 32)
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
    title="Claude Code — $project_name"
  else
    title="Claude Code"
  fi
  osascript -e "display notification \"$msg\" with title \"$title\" sound name \"Glass\"" 2>/dev/null || true
fi

# TaskCompleted hook: exit 0 so we don't block task completion
exit 0
