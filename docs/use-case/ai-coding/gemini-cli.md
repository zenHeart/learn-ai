# gemini cli

## basic usage

1. install and login gemini cli follow [gemini cli](https://geminicli.com/docs/get-started/), more detail see [installed](https://geminicli.com/docs/get-started/installation/) with different platform.
2. authenticate cli, read [authentication](https://geminicli.com/docs/get-started/authentication/) to choice one

### daily usage

```bash

# just use llm in cli
gemini -p 'your prompt here' # gemini will output result in terminal

# read image and use llm in cli
gemini -p 'rename your image files'

# help you understand code
gemini -p "Clone the 'chalk' repository from https://github.com/chalk/chalk, read its key source files, and explain how it works."

# normal script kit tool
# Revenue - 2023.csv and Revenue - 2024.csv.
gemini -p "Summarize the revenue growth of the company from 2023 to 2024."

```

### [shortcut](https://geminicli.com/docs/cli/keyboard-shortcuts/)

keys| function|
`enter`| confirm and run command
`esc`| exit mode
`ctrl+a`| move line start
`ctrl+e`| move line end
`ctrl+k`| delete current cursor to end of line
`ctrl+u`| delete current cursor to start of line
`ctrl+c`| delete current input
`ctrl+backspace`| delete current cursor left char
`Command+backspace`| delete current line
`ctrl+l`| clear screen
`ctrl+p`| previous command
`ctrl+n`| next command
`ctrl+r`| search history command


### features

gemini support multi features.


|features|description|
|:---|:---|
command|support for subcommand to run|
checkpoint|support for checkpoint to run|

## commands

gemini support multi command you can use `/` or `@` to enter sub command.
all command list see [commands](https://geminicli.com/docs/cli/commands/)

### built-in command

#### `/chat`

use to split chat context.

1. `/chat save <tag>` save chat
2. `/chat resume <tag>` resume chat
3. `/chat delete <tag>` remove chat
4. `/chat list ` list all chat
5. `/chat share xx.md` share this chat file

chat save in 

* `~/.gemini/tmp/<project_hash>/` linux/macos
* `C:\Users\<YourUsername>\.gemini\tmp\<project_hash>\` windows

you can combine `/compress` command to compress chat file.


#### `/directory`

for multi root project ,use `/project` command to add project.

1. `/directory add <path>` add directory
2. `/directory add <path1>,<path2>` add mmulti directory
3. `/directory show` list all add directory

#### `/clear`

clear display ,short cut is `control+c`

#### `/stats`

show stats info the result like:

```bash
Session Stats                                                                                                                        │
│                                                                                                                                       │
│  Interaction Summary                                                                                                                  │
│  Session ID:                 8712b7bb-a1f6-4efb-837b-ef1fc6e5fc9d                                                                     │
│  Tool Calls:                 7 ( ✓ 6 x 1 )                                                                                            │
│  Success Rate:               85.7%                                                                                                    │
│  User Agreement:             85.7% (7 reviewed)                                                                                       │
│                                                                                                                                       │
│  Performance                                                                                                                          │
│  Wall Time:                  2h 42m 46s                                                                                               │
│  Agent Active:               13m 49s                                                                                                  │
│    » API Time:               1m 31s (11.1%)                                                                                           │
│    » Tool Time:              12m 17s (88.9%)                                                                                          │
│                                                                                                                                       │
│                                                                                                                                       │
│  Model Usage                 Reqs                  Usage left                                                                         │
│  ────────────────────────────────────────────────────────────                                                                         │
│  gemini-2.5-flash-lite          3   95.4% (Resets in 13h 25m)                                                                         │
│  gemini-3-pro-preview           7    0.0% (Resets in 13h 25m)                                                                         │
│  gemini-3-flash-preview         1   93.9% (Resets in 14h 18m)                                                                         │
│  gemini-2.5-flash               -   95.4% (Resets in 13h 25m)                                                                         │
│  gemini-2.5-pro                 -    0.0% (Resets in 13h 25m)                                                                         │
│                                                                                                                                       │
│  Usage limits span all sessions and reset daily.                                                                                      │
│  /auth to upgrade or switch to API key.                                                                                               │
│                                                                                                                                       │
│                                                                                                                                       │
│  » Tip: For a full token breakdown, run `/stats model`.  

```

#### `@` command

you can use `@` command to add file context.

#### `!<shell_command>`

you can just run any shell command before add `!` prefix.

type `!` toggle gemini as shell mode, to run command in sandbox.use `esc` to exit shell mode.
when in this mode, you can use `GEMINI_CLI=1` to check sandbox.

### [custom command](https://geminicli.com/docs/cli/custom-commands/)

you can use custom command to save your prompt template.

1. `~/.gemini/commands` this is user custom command for all project
2. `.gemini/commands` this is project custom command, if has same name will override user command


1. `~/.gemini/commands/test.toml` will create `/test` command
2. `<project>/.gemini/commands/git/commit.toml` will create `/git:commit` command


toml template like this

```toml
# comment to describe the command
# Invoked via: /changelog 1.2.0 added "Support for default argument parsing."

# description optional config describe this command
description = "Adds a new entry to the project\'s CHANGELOG.md file."
# prompt required
prompt = """
# Task: Update Changelog

You are an expert maintainer of this software project. A user has invoked a command to add a new entry to the changelog.

**The user\'s raw command is appended below your instructions.**

Your task is to parse the `<version>`, `<change_type>`, and `<message>` from their input and use the `write_file` tool to correctly update the `CHANGELOG.md` file.

## Expected Format
The command follows this format: `/changelog <version> <type> <message>`
- `<type>` must be one of: "added", "changed", "fixed", "removed".

## Behavior
1. Read the `CHANGELOG.md` file.
2. Find the section for the specified `<version>`.
3. Add the `<message>` under the correct `<type>` heading.
4. If the version or type section doesn\'t exist, create it.
5. Adhere strictly to the "Keep a Changelog" format.
"""

```

in config file ,support this symbol

symbol| function | demo|
:---|---|---:
`{{args}}`| will replace with user input after command | `prompt = "Please provide a code fix for the issue described here: {{args}}."`
`!{}` | run shell command| `prompt = "Please summarize the findings for the pattern `{{args}}`"`, you can use `{{args}}` in shell command
`@{file}`| add file context| `prompt = "You are an expert code reviewer.@{docs/best-practices.md}"`






## [session](https://geminicli.com/docs/cli/session-management/#listing-sessions)


each your use gemini will create a session.session save your conversation info. like prompt、model response...
session save in `~/.gemini/tmp/<projext_hash>/chats/<session_hash>`.

you can list and enter history session.

```bash
# list current directory related sessions
gemini --list-sessions
# enter latest session for current directory
gemini --resume
# enter session by index for current directory
gemini -resume 2
# enter session by hash for current directory
gemini -resume  <hash>
# delete session for current directory
gemini --delete-session 2
```

in gemini cli you also can use `/session` command to list and enter session.


### session config

you can config session 

```json
{
  "general": {
    "sessionRetention": {
      "enabled": true, // 会话清理开关默认为 false
      "maxAge": "30d", // 使能清理后，最多保存 30d
      "maxCount": 50, // 组多保留最近 50 个会话
      "minRetention": "1d" // 最短保留期限，小于此日期不会被删除，默认 1d
    }
  }
}

```

to avoid session to long, you can set

```json
{
  "model": {
    "maxSessionTurns": 100 // 一个 session 最多允许 100 次聊天， 默认 `-1` 表示不限制
  }
}
```




## [checkpoint](https://geminicli.com/docs/cli/checkpointing/)

this feature default disable, edit setting to open it.

```json
{
  "general": {
    "checkpointing": {
      "enabled": true
    }
  }
}
```

every change will be save as point.

```bash
# list all checkpoint
/restore

# restore certain file
/restore 2025-06-22T10-00-00_000Z-my-file.txt-write_file
```



## [headless mode](https://geminicli.com/docs/cli/headless/)

normally we use gemini cli with interactive mode.but like `gemini -p <prompt>` is
headless mode, just make gemini run prompt.

you can combine it with automation tool like `gemini -p "What is the capital of France?" --output-format json` parser output content to run automation. the format see [json output](https://geminicli.com/docs/cli/headless/#example-usage)

for long task support stream output,see [streaming json](https://geminicli.com/docs/cli/headless/#example-usage) to learn more.


some use case for headless mode, reference [exmaples](https://geminicli.com/docs/cli/headless/#examples)

```bash
# code review
cat src/auth.py | gemini -p "Review this authentication code for security issues" > security-review.txt

# generate commit messages
result=$(git diff --cached | gemini -p "Write a concise commit message for these changes" --output-format json)
echo "$result" | jq -r '.response'

# API doc
result=$(cat api/routes.js | gemini -p "Generate OpenAPI spec for these routes" --output-format json)
echo "$result" | jq -r '.response' > openapi.json

# Batch code analysis
for file in src/*.py; do
    echo "Analyzing $file..."
    result=$(cat "$file" | gemini -p "Find potential bugs and suggest improvements" --output-format json)
    echo "$result" | jq -r '.response' > "reports/$(basename "$file").analysis"
    echo "Completed analysis for $(basename "$file")" >> reports/progress.log
done

# Log analysis
grep "ERROR" /var/log/app.log | tail -20 | gemini -p "Analyze these errors and suggest root cause and fixes" > error-analysis.txt


# Model and tool usage tracking
result=$(gemini -p "Explain this database schema" --include-directories db --output-format json)
total_tokens=$(echo "$result" | jq -r '.stats.models // {} | to_entries | map(.value.tokens.total) | add // 0')
models_used=$(echo "$result" | jq -r '.stats.models // {} | keys | join(", ") | if . == "" then "none" else . end')
tool_calls=$(echo "$result" | jq -r '.stats.tools.totalCalls // 0')
tools_used=$(echo "$result" | jq -r '.stats.tools.byName // {} | keys | join(", ") | if . == "" then "none" else . end')
echo "$(date): $total_tokens tokens, $tool_calls tool calls ($tools_used) used with models: $models_used" >> usage.log
echo "$result" | jq -r '.response' > schema-docs.md
echo "Recent usage trends:"
tail -5 usage.log

```



## config

use gemini config to control gemini cli behavior.
detail read [gemini cli configuration ](https://geminicli.com/docs/get-started/configuration-v1/)
支持的详细列表参考 [json schema](https://github.com/google-gemini/gemini-cli/blob/main/schemas/settings.schema.json)

### config layers

gemini support multiple config layers detail see [Configuration layers](https://geminicli.com/docs/get-started/configuration/#configuration-layers)

user common figure path

<!-- TODO: @chengle can't find in mac  -->

1. system default config
   - **Location** use `GEMINI_CLI_SYSTEM_DEFAULTS_PATH` to customize path
     - **Linux** `/etc/gemini-cli/system-defaults.json`
     - **Windows** `C:\ProgramData\gemini-cli\system-defaults.json`
     - **macOS** `/Library/Application Support/GeminiCli/system-defaults.json`
   - **Scope**
     - Provides a base layer of system-wide default settings. These settings have the lowest precedence and are intended to be overridden by user, project, or system override settings.
2. user config: `~/.gemini/settings.json` will overwrite system config
3. project config: `.gemini/settings.json` will overwrite user config
4. system settings
   - **Location** use `GEMINI_CLI_SYSTEM_SETTINGS_PATH` to customize path
     - **Linux** `/etc/gemini-cli/settings.json`
     - **Windows** `C:\ProgramData\gemini-cli\settings.json`
     - **macOS** `/Library/Application Support/GeminiCli/settings.json`
   - **Scope**
     - system administrators to control gemini cli behavior.overwrite all other config layers

you can use `$VAR_NAME` 或 `${VAR_NAME}` in your config file。some config support directory see
[sandbox config](https://geminicli.com/docs/get-started/configuration/#sandboxing) read more.

### set config

you can just modify your config file. or use `/settings` command to set config.
the settings list in [Settings](https://geminicli.com/docs/cli/settings/)


### [system prompt](https://geminicli.com/docs/cli/system-prompt/)

you can set `.gemini/.env` file to set [Persisting environment variables](https://geminicli.com/docs/get-started/authentication/#persisting-environment-variables)

you can use `GEMINI_SYSTEM_MD=true` or `GEMINI_SYSTEM_MD=1` to set system prompt.
cli will read `.gemini/system.md` file to set system prompt.

or set `GEMINI_SYSTEM_MD=/absolute/path/to/my-system.md` to set system prompt.

When GEMINI_SYSTEM_MD is active, the CLI shows a `|⌐■_■|` indicator in the UI to signal custom system‑prompt mode.


the different between `SYSTEM.md` and `GEMINI.md` is

1. `system.md`  for all project or team ,Non‑negotiable operational rules: safety, tool‑use protocols, approvals, and mechanics that keep the CLI reliable.
2. `gemini.md` Persona, goals, methodologies, and project/domain context.Evolves per task; relies on SYSTEM.md for safe execution.


### theme config

you can use `/theme` command to set theme.. detail see [theme](https://geminicli.com/docs/cli/themes/)


### [set trust folder](https://geminicli.com/docs/cli/trusted-folders/)

trust folder make gemini can read your file. detail see [Why trust matters](https://geminicli.com/docs/cli/trusted-folders/#why-trust-matters-the-impact-of-an-untrusted-workspace)

you can use enable this feature

```json
{
  "security": {
    "folderTrust": {
      "enabled": true
    }
  }
}
```

after settings the `~/.gemini/trustedFolders.json` can see your trust folder,
be careful only project as trusted folder, you can use project settings.like `.gemini/settings.json` and customize commands can  work!!!!

## [MCP](https://geminicli.com/docs/cli/tutorials/#setting-up-a-model-context-protocol-mcp-server)

### [setup mcp](https://geminicli.com/docs/cli/tutorials/#setting-up-a-model-context-protocol-mcp-server)

1. config mcp server in 


## [Tools](https://geminicli.com/docs/core/tools-api/)

gemini use tools to help LLM better understand your task. some inner tools like


|category|tool|description|
|:---|:---|:---|
|files|LSTool| list directory contents
|| ReadFileTool| read file
|| WriteFileTool| writes content to file
||GrepTool| search for patterns in files|
||GlobTool| find files matching a pattern|
||EditTool| perform modifications files|
||ReadManyFilesTool| Reads and concatenates content from multiple files or glob patterns, use in `@` in cli|
|Execution|ShellTool| execute shell commands|
|Web Tools|WebFetchTool| web fetch|
||WebSearchTool| web search|
|Memory tools|MemoryTool|interact with memory|


you can call tools with `<tool_name>(<args>)`

detail read [tools](https://geminicli.com/docs/tools/)
    
### [extending custom tools](https://geminicli.com/docs/core/tools-api/#extending-with-custom-tools)

for tools rules you can read [Policy engine](https://geminicli.com/docs/core/policy-engine/)



## use cases

### mode

use `!` to switch gemini a shell mode, use `esc` to exit

### connect to cursor

after connect ide you can use ide to see gemini modify content

1. open cursor
2. install [gemini cli companion](https://open-vsx.org/extension/Google/gemini-cli-vscode-ide-companion)
3. run `gemini`
4. enter `/ide install`


## others

you can run gemini cli in safe mode ,this called sandbox, when gemini run in yolo mode will default use sandbox mode. read [sandboxing](https://geminicli.com/docs/get-started/configuration/#sandboxing) for more detail. in cli read [sandbox](https://geminicli.com/docs/cli/sandbox/) use `-s` to enable sandbox mode.


for enterprise user, read [enterprise](https://geminicli.com/docs/cli/enterprise/) to learn more. you also can use [telemetry](https://geminicli.com/docs/cli/telemetry/) to know more metrics.