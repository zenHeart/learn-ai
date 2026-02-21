# 4.1 新项目冷启动 (Cold Start)

## 概念解析
在过去，开启一个新项目需要：
1. `npm create/init`
2. 上网找各种库的最新安装指南 (Tailwind, Router, Pinia 等)。
3. 配置各种 `config.js` 文件。
4. 手写基本的 Boilerplate（样板代码）如 Layout、Login 页面结构。

而在 Vibe Coding 中，通过**多模态意图注入**（比如给一段 Prompt + 丢一张草图）：
具有批量文件读写权限的 Agent 会在一两分钟内，帮你创建文件夹、下载依赖、配置脚手架并写出第一个可用版本。

**人类从“搬砖工”变成了“架构师/设计师”：**
你只需要定义边界：“用 X 框架、用 Y 规范”。剩下的执行交给 Agent。

## 运行示例

进入根目录（`ppts/vibe-coding/examples`），运行：
```bash
npm run demo:4.1
```

## 核心要点
* Agentic 流程可以把“搭建框架”的时间从几小时缩短到几分钟。
* 不要在初始 Prompt 中写过多细节，而是先让它跑起来主体（0 -> 1），然后再迭代（1 -> 100）。
