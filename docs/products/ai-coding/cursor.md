# cursor

## key concept

### symbol

use symbol to add context and make cursor do some action

| symbol | function | demo |
| --- | --- | --- |
| **@code** | code snippet  |  |
| **@file** | include file to context |  |
| **@Folders** | include a floder to long context | useful when you want context just point certain sub directory |
| @doc | help cursor understand extra knowledge |  |
| @git | some git utils |  |
| @codebase |  |  |
| @web | run web search |  |
| @chat | chat as context |  |
| @link | summray a link content |  |

### config

- ***.cursorignore  make cursor ingore some file, like .gitignore***
- 

## shortcut

| function block | shortcut | function | comment |
| --- | --- | --- | --- |
| config | **⌘⇧J**
  | open cursor setting |  |
| interactive | **⌘L** | trigger ai chat in cursor |  |
|  | **⌘⇧K** | trigger inline chat |  |
|  | **⌘⌥L** | after open chat, use this shortcut to select history chat |  |
|  |  |  |  |

## trick

### cursorrule

you can use  https://cursorrules.agnt.one/chat to create rule prompt ,details see 

https://docs.cursor.com/context/rules-for-ai#project-rules-recommended

- https://cursor.directory/ to create cursor

1. use claude/o1 to create [instruction.md](http://instruction.md)  include project key info, reference https://x.com/FinanceYF5/status/1853790347434013065
    1. core function
    2. goal and rules
    3. tech stack and use package
    4. project outline
    5. db design
    6. login component
    7. login 
2. cursor rule makeer https://cursorrules.agnt.one/chat

## useful docs

https://cursorpractice.com/en

## tool

- use https://github.com/GLips/Figma-Context-MCP to convert figama to code

## practice

1. rule rely on order, some rule architecture https://forum.cursor.com/t/my-best-practices-for-mdc-rules-and-troubleshooting/50526/12