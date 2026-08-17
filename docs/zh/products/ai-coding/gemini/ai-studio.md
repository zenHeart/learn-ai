# Google AI Studio

> 直接控制模型与参数的控制台，也是走 Gemini API 的起点。它是家族里唯一让你调温度、固化系统提示词、一次性喂进大量上下文的地方。

## 核心定位

其他产品都替你决定了模型和参数。AI Studio 把这些还给你：

| 你能控制什么 | 为什么有用 |
|---|---|
| 用哪个模型 | 不同任务对成本/质量的取舍不同 |
| 温度等采样参数 | 审计要稳定复现，创意要多样性 |
| 系统提示词 | 把角色与约束固化，不用每次重述 |
| 一次喂多少上下文 | 大规模代码库审计的前提 |

它也是"先在界面里试通，再用 API 集成进产品"这条路径的第一站。

## 模型选择

模型清单变动极快，**引用具体模型名之前一定回[官方清单](https://ai.google.dev/gemini-api/docs/models)复核**。当前可用模型与已停用清单见 [速查表的模型现状](./gemini-cheatsheet#模型现状)，本页不重复。

只记一条原则：**先用便宜的 Flash 跑通流程，确认提示词有效之后再考虑换更强的模型。** 反过来做会让你在调提示词的阶段烧掉大量额度。

## 长上下文审计

这是 AI Studio 相对其他工具最独特的能力。

**可引用的数字只有一个**：官方订阅对比表标注 Pro 及以上为 100 万令牌扩展上下文。

<!-- TODO: 待核实 —— 具体某个模型各自的上下文窗口上限。官方模型清单页不逐个模型列出上下文窗口；历史文档里的"200 万令牌 ≈ 150 万英文单词 ≈ 5000 页"整条推算都基于没有出处的数字，已移除 -->

### 上下文不是越满越好

长上下文的真实约束不是容量，是**注意力分布**：

```
模型对上下文不同位置的利用程度（示意）

  利用率
    高 │ ██                                    ██
       │ ████                                ████
       │ ██████                            ██████
    低 │ ████████████████████████████████████████
       └────────────────────────────────────────────
        开头            中段                    结尾
        ↑                ↑                      ↑
     系统提示词      容易被忽略              你的问题
     核心约束      （塞进这里的细节           验收标准
                    经常等于没塞）
```

实践结论：

1. **最关键的约束放开头，问题和验收标准放结尾**
2. 中段放参考材料，不要放"必须遵守"的规则
3. 塞满 100 万令牌不如精选 20 万令牌——**噪声会稀释信号**

<!-- TODO: 待核实 —— 上面这张示意图描述的是长上下文使用中的普遍现象，非官方图表。官方长上下文文档（https://ai.google.dev/gemini-api/docs/long-context）给出使用建议，但未找到官方说明提供位置-利用率的量化曲线 -->

### 准备审计输入

关键是**只喂源码和类型定义**，把噪声排除干净。用一个小脚本组装输入比手动复制可靠：

```python
#!/usr/bin/env python3
"""把仓库里的源码拼成一份可以喂给模型的审计输入。"""
from pathlib import Path

INCLUDE_SUFFIXES = {".ts", ".tsx", ".js", ".jsx", ".vue", ".py"}
EXCLUDE_DIRS = {
    "node_modules", "dist", "build", ".git", ".next",
    "coverage", "__pycache__", ".vitepress",
}

def collect(root: Path) -> str:
    parts = []
    for path in sorted(root.rglob("*")):
        if not path.is_file() or path.suffix not in INCLUDE_SUFFIXES:
            continue
        if EXCLUDE_DIRS & set(path.parts):
            continue
        rel = path.relative_to(root)
        parts.append(f"\n===== {rel} =====\n{path.read_text(errors='ignore')}")
    return "".join(parts)

if __name__ == "__main__":
    body = collect(Path("."))
    # 粗略估算：英文代码约 4 字符 ≈ 1 token，仅用于判断量级
    print(f"约 {len(body) // 4} tokens，{len(body)} 字符")
    Path("audit-input.txt").write_text(body)
```

产出的文件粘进 AI Studio，或按[官方快速开始](https://ai.google.dev/gemini-api/docs/quickstart)接 API。

> 字符数换算 token 只是**量级估算**，用来判断"这个仓库大概能不能塞进去"，不能当计费依据。准确计数请用官方计数接口。

### 问法决定产出质量

```
✅ 找出所有直接操作 DOM 的位置，按文件列出，标注是否可以改用框架 API
✅ 列出所有跨模块的循环依赖
❌ 审查一下这个代码库的质量        ← 没有验收标准，产出必然空泛
```

**一次只问一类问题。** 混着问会让它每类都答得很浅。

## 参数调节

| 场景 | 温度 | 理由 |
|---|---|---|
| 代码审计、事实提取 | 低 | 要的是稳定复现，同一份输入应该得到同样结论 |
| 重构方案、命名建议 | 中 | 需要一点多样性来比较选项 |
| 头脑风暴、文案 | 高 | 要的就是发散 |

<!-- TODO: 待核实 —— 各温度档位的具体数值区间。不同模型的取值范围与默认值不同，请以官方 API 参考中对应模型的说明为准 -->

**先固化系统提示词再调温度。** 提示词没写清的时候调参数，你分不清效果变化来自哪一边。

## 成本控制

AI Pro 档通过 Google Developer Program 提供 US$10/月 Google Cloud 额度（Ultra 5x US$40，Ultra 20x US$100）。

**第一件事是设预算上限，不是开始调用**：GCP 控制台 → 计费 → 预算和警报 → 按额度金额建预算 → 开启 50% / 90% / 100% 告警。

额度是"送你的钱"，不是硬性上限，**超出部分会正常计费**。长上下文单次调用的成本远高于交互式对话，没设预算就跑批量脚本是最容易踩的坑。

计费口径见[官方计费文档](https://ai.google.dev/gemini-api/docs/billing)。

<!-- TODO: 待核实 —— AI Studio / Gemini API 各模型的每百万令牌单价。历史文档里的"输入 $0.25/百万令牌"没有出处，未找到官方说明，请以官方计费页为准 -->

## 与其他产品怎么选

- 要**在终端里**用模型 → [Gemini CLI](./gemini-cli)
- 要**在编辑器里**用 → [Code Assist](./code-assist)
- 要**自主改代码** → [Antigravity](./antigravity) / [Jules](./jules)
- 要**控制模型本身**，或要把 Gemini 接进自己的产品 → AI Studio

## 官方资源

- [AI Studio](https://aistudio.google.com)
- [模型清单](https://ai.google.dev/gemini-api/docs/models)
- [长上下文文档](https://ai.google.dev/gemini-api/docs/long-context)
- [计费](https://ai.google.dev/gemini-api/docs/billing)

## 相关页面

- [速查表](./gemini-cheatsheet#模型现状) — 模型现状与停用清单
- [Cookbook](./gemini-cookbook#_12-想让-ai-通读整个仓库做审计) — 全库审计配方
