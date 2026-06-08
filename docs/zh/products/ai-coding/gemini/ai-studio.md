# Google AI Studio

> AI Studio 消除了界面抽象，提供对 Gemini 1.5 Pro 和最新的 Gemini 3.1 Pro 模型的完整控制权。

## 核心价值

尽管 Gemini Web 应用为普通消费者提供了一个易用的界面，但其存在以下限制：
- 系统提示词被隐藏
- 响应长度经常受限
- 内置的安全过滤器有时会阻断正常的代码调试

**对于前端架构师而言，真正的黄金矿脉在于直接调用底层模型**，这是 AI Studio 的核心价值。

## 超长上下文窗口

| 模型 | 上下文窗口 | 适用场景 |
|------|----------|---------|
| Gemini 3.1 Flash-Lite | 100 万令牌 | 成本敏感的日常任务 |
| Gemini 3.1 Flash | 100 万令牌 | 快速原型 |
| Gemini 1.5 Pro | 200 万令牌 | 超大代码库审计 |
| Gemini 3.1 Pro Preview | 200 万令牌 | 最强推理能力 |

**200 万令牌 ≈ 150 万英文单词 ≈ 5000 页纯文本**

## 开发者高级权益

作为 Google AI Pro 订阅用户，自动获得 **Google 开发者计划（GDP）Premium** 权益：

| 权益 | 额度 |
|------|------|
| GCP 月度额度 | $10/月 |
| AI Studio 计费 | 输入 $0.25/百万令牌 |
| Vertex AI | 包含在 $10 内 |

⚠️ **必须设置支出上限**：在 GCP 控制台 → 计费 → 预算和警报 → 设置 $10 硬性上限

## 海量单体代码库审计

### "大海捞针"式深度代码审计

在面对庞大且错综复杂的 React 单体代码库（Monorepo）时，传统的全局搜索往往无法追踪复杂的属性透传（Prop Drilling）或状态突变（State Mutation）引发的隐蔽缺陷。

**最佳实践**：编写脚本将整个项目目录合并为一个巨大的文本有效载荷（Payload）：

```python
import os
import json

def build_audit_payload(repo_path: str, error_log: str) -> dict:
    """将整个代码库构建为 AI Studio 可摄入的 Payload"""
    files_content = []
    
    for root, dirs, files in os.walk(repo_path):
        # 跳过 node_modules 和 .git
        dirs[:] = [d for d in dirs if d not in ['node_modules', '.git', 'dist']]
        
        for file in files:
            if file.endswith(('.ts', '.tsx', '.js', '.jsx', '.css')):
                path = os.path.join(root, file)
                with open(path, 'r', encoding='utf-8') as f:
                    relative_path = os.path.relpath(path, repo_path)
                    files_content.append({
                        "path": relative_path,
                        "content": f.read()
                    })
    
    return {
        "codebase": files_content,
        "error_log": error_log,
        "task": "分析以下状态更新异常的根本原因，并给出跨越多个系统边界的重构建议"
    }
```

## 系统提示词固化

AI Studio 是设计、测试并固化系统提示词的理想场所：

1. 在 AI Studio 微调温度参数（生成确定性代码时设为 0.0）
2. 验证特定技术栈的指令表现
3. 确认无误后编码至 Antigravity 的 `SKILL.md` 文件中

## 上下文衰减优化

在使用超长上下文功能时，**窗口极端的（即最开始和最末尾）信息通常能得到最精确的处理**。

```
┌─────────────────────────────────────────────┐
│ [头部] 核心架构原则、系统指令、目标文件路径  │  ← 高注意力
│─────────────────────────────────────────────│
│                                             │
│ [中间] 海量背景参考代码                      │  ← 注意力衰减
│                                             │
│─────────────────────────────────────────────│
│ [尾部] 具体的修改指令、输出格式要求          │  ← 高注意力
└─────────────────────────────────────────────┘
```

**策略**：将最核心的架构原则、系统指令以及目标修改文件的路径放置在提示词的头部或尾部。

## 温度参数指南

| 场景 | 温度值 | 说明 |
|------|--------|------|
| 确定性代码生成 | 0.0 | 完全确定，无随机性 |
| 标准代码补全 | 0.2-0.3 | 适度创造性 |
| 创意性需求 | 0.5-0.7 | 更多样化输出 |
| 头脑风暴 | 0.8-1.0 | 最大创造性 |

## 官方资源

- [AI Studio](https://aistudio.google.com)
- [Gemini API 定价](https://ai.google.dev/gemini-api/docs/billing)
- [长上下文文档](https://ai.google.dev/gemini-api/docs/long-context)
