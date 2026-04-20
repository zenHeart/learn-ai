# AI 自动化测试与代码评审

> 学习日期: 2026-04-12

## 概述

本笔记整合 AI 在测试和代码评审领域的应用实践，涵盖自动化测试生成、AI 代码评审系统和多 Agent 测试框架。

---

## AI 代码评审

### 核心能力

| 能力 | 说明 |
|------|------|
| **模式识别** | 检测常见代码异味和安全漏洞 |
| **规范检查** | 一致性校验、命名规范、注释覆盖 |
| **逻辑审查** | 潜在 bug、边界条件、并发问题 |
| **风格建议** | 重构建议、代码简化 |

### 常见问题

- **误报率高**: AI 可能对无害代码提出批评，影响开发者信任
- **上下文缺失**: 缺乏完整代码库上下文，只能评审 diff
- **准确率有限**: 对于复杂业务逻辑判断不足
- **解释能力弱**: 只能指出问题，无法替代人工讲解

### 实践框架

```javascript
// AI Code Review Pipeline
async function aiCodeReview(prDiff) {
  const chunks = splitDiffIntoChunks(prDiff, 4000)  // 分块处理

  const reviews = await Promise.all(
    chunks.map(chunk => llm.analyze({
      code: chunk,
      rules: ['security', 'performance', 'style'],
      context: await getRelatedCode(chunk)  // 补充上下文
    }))
  )

  return aggregateReviews(reviews, {
    deduplicate: true,
    suppressLowConfidence: true
  })
}
```

---

## AI 自动化测试

### 测试用例生成

| 场景 | 适用技术 |
|------|----------|
| **单元测试** | 基于代码结构的边界分析 |
| **集成测试** | API 契约 + 请求/响应模式 |
| **E2E 测试** | 用户行为序列 + 页面对象 |
| **属性测试** | 模糊测试 + 断言不变式 |

### 关键挑战

1. **测试用例设计仍需人工**: AI 生成测试的前提是理解测试意图
2. **覆盖率和有效性矛盾**: 追求覆盖率可能产生无意义的边界测试
3. **测试用例质量不稳定**: AI 生成的断言可能过于宽松或错误
4. **维护成本**: 测试用例需要随代码变更更新

### 实践框架

```javascript
// AI 测试生成 Pipeline
async function generateTests(sourceCode) {
  // 1. 分析代码结构和依赖
  const ast = parseAST(sourceCode)
  const coverage = analyzeBranches(ast)

  // 2. 生成测试用例
  const testCases = await llm.generate({
    source: ast,
    strategy: 'boundary-first',  // 边界值优先
    constraints: ['no-mock-internal', 'use-factory-pattern']
  })

  // 3. 执行 + 筛选有效用例
  const results = await runTests(testCases)
  return results.filter(r => r.passed || r.isMeaningful)
}
```

---

## 多 Agent 测试框架

### 字节 Midscene

[Midscene](https://midscenejs.com/zh/) 是字节开源的 UI 自动化测试框架，特点：

- **AI 驱动的断言**: 用自然语言描述预期，AI 执行验证
- **Playwright 集成**: 完整的浏览器自动化能力
- **可观测性**: 内置截图、动作日志、断言结果

```javascript
import { AIAction, AIAssertion } from '@midscene/web'

// 自然语言驱动 UI 交互
await AIAction('点击搜索按钮')

// AI 验证页面状态
await AIAssertion('页面显示搜索结果，数量大于 0')
```

### 美团 AI 测试实践

美团在 B 站分享的 AI 测试实践要点：

- **测试数据准备**: 大模型生成测试数据，规则引擎补充边界
- **用例智能推荐**: 根据代码变更推荐相关测试用例
- **失败自动归因**: AI 分析失败原因，过滤 flaky test

---

## 相关资源

- [Midscene](https://midscenejs.com/zh/) - 字节 UI 自动化测试框架
- [Testhub Platform](https://github.com/chenjigang4167/testhub_platform) - 开源测试平台
- [自动化测试实践 (知乎)](https://zhuanlan.zhihu.com/p/1963919921974048096)
