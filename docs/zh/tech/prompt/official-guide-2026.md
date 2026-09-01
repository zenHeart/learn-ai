---
title: 换模型时改什么
description: "换代后只改主动程度、啰嗦程度和停止条件。型号以官方 latest 页为准，本页不维护对照长文。"
domain: tech
tags:
  - prompt
navOrder: 40
llm:
  - 15
prev:
  text: 写给仓库 · AGENTS.md
  link: /zh/tech/prompt/agents-doc
next:
  text: 附录 · System Prompts
  link: /zh/tech/prompt/system-prompts-collection
---

# 换模型时改什么

**结论**：四块骨架不用推倒。换代后只调三件事——**有多主动、有多啰嗦、何时停手**。

> **路径位置**：主路径第 4 步。还不会写任务 / 约束 / 输出，先回 [怎么写 Prompt](/zh/tech/prompt/)。
>
> 「为什么新模型更字面、MUST 会过触发」的机制，应在 Learn LLM 第 15 章补齐（见 [learn-llm#2](https://github.com/zenHeart/learn-llm/issues/2)）。本页只给工程师检查清单。型号名以官方当天页面为准，不在本站维护。

## 先打开官方活页

| 厂商 | 打开哪一页 | 你要找的句子 |
|---|---|---|
| OpenAI | [Prompt engineering](https://developers.openai.com/api/docs/guides/prompt-engineering) · [latest-model](https://developers.openai.com/api/docs/guides/latest-model) | 要不要更瘦的 prompt、agent 何时停 |
| Anthropic | [Prompting best practices](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices) | 字面遵循、verbosity、tool 过触发 |
| Gemini | [Prompt design strategies](https://ai.google.dev/gemini-api/docs/prompting-strategies) | few-shot、Structured Output、agentic 收尾 |

不要从本站或某篇 2026.05 摘要抄型号行为。摘要会过期。

## 检查清单

换快照或换厂商后，用同一条真实任务跑一遍：

1. **主动程度**。你说「可以改一下吗」，它是直接改文件，还是只给建议？不够主动就写「默认落地修改」；太主动就写「先列计划，等我说再改」。
2. **啰嗦程度**。工具调用后它是跳下一项，还是写一段自我表扬？要可见进度就明确「每次工具后用两句话汇报」；要短就写「不要总结过程」。
3. **停止条件**。它是否为了「更全面」再搜三轮？写清：核心问题已有证据就停；不要为了措辞再检索。
4. **禁止项语气**。旧提示里的 `CRITICAL` / `ALWAYS` / `MUST use this tool` 在新模型上容易过触发。改成决策规则：「只有用户点名某工具，或缺少该工具拿不到的 ID 时才调用」。
5. **示例是否过期**。指令改了三轮，few-shot 还是旧字段 → 模型跟示例。删掉或改到与当前 schema 一致。
6. **pin 快照**。生产不要追 `latest`。换代是一次发版，带着 eval / fixture。

## 工程上怎么改提示

**过指定（旧习惯，新模型容易又慢又爱调工具）：**

```text
先读 A，再读 B，再逐字段对比，再想所有例外，
再决定调哪个工具，再调用，再解释全过程。
ALWAYS 使用 web_search。CRITICAL: 必须再检查一遍。
```

**结果 + 停止条件（换代后优先）：**

```text
把这个问题从头到尾做完。
成功标准：
- 结论来自仓库里已有的政策或代码，而不是猜测
- 允许的动作在回复前做完
- 回复只含 completed_actions、customer_message、blockers
停手：每次工具结果后问「现在能回答核心问题了吗？」能就停。
不要为了润色再搜索。
```

把这段放进代码里的 `buildPrompt()`，不要只活在聊天记录里。

## 实战信号

| 现象 | 先改哪 |
|---|---|
| 新模型不改文件，只给 diff 建议 | 主动程度：写「直接改，不要只建议」 |
| 新模型改了一堆没要的文件 | 范围：点名路径 + 「不要动其他目录」 |
| 又搜又读，迟迟不答 | 停止条件 + 检索预算 |
| 工具乱触发 | 删 MUST，改成「何时用 / 何时不用」 |
| 输出突然变成长篇散文 | 显式要长度和格式；Claude 近期型号对 verbosity 要单独写 |
| 旧 JSON 头 prefill 报 400 | 不要再 prefill；走 [Schema](/zh/tech/prompt/json-prompt-best-practices) |

## 不是本页

- 某个型号的完整性格评测
- 记忆、截断、prompt caching 的原理 → [第 15 章](https://llm.zenheart.site/chapters/15-prompt-memory)
- 某个 IDE 的点击路径 → [产品](/zh/products/)

## 下一步

附录才是查阅别人怎么写系统提示：[System Prompts](/zh/tech/prompt/system-prompts-collection)。日常任务仍回 [怎么写](/zh/tech/prompt/)。
