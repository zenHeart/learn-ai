---
title: 工程与评估
description: "功能能跑之后：测确定性代码、评模型输出、看、限流、算钱。机制见 Learn LLM 第 18 章。"
domain: tech
tags:
  - engineering
listed: false
outline: [2, 3]
pageClass: catalog-page
llm:
  - 18
---

# 工程与评估

**结论**：模型输出是概率的，**你的解析器、工具和权限检查不是**。先把确定性的测绿，再评质量，再谈可观测性和账单。

> Judge、trace、安全边界见 Learn LLM [第 18 章](https://llm.zenheart.site/chapters/18-eval-safety-cloud)。本栏只排前端上线顺序。

## 这一栏怎么读

```
本页
  → 1. 测试     解析器 / mock / 不在 CI 里打真模型
  → 2. 评估     fixture + 断言，不是「感觉通顺」
  → 3. 可观测性  每次请求留下 trace
  → 4. 安全      密钥、注入、权限
  → 5. 成本      cache、模型档位、限流
  → 附录         厂内测试长文、基准
```

| 你卡在哪 | 读什么 |
|---|---|
| CI 又在给 OpenAI 付费 | [测试](/zh/tech/engineering/testing) |
| 提示改了没人知道坏没坏 | [评估](/zh/tech/engineering/evals) |
| 线上只有「用户说它傻了」 | [可观测性](/zh/tech/engineering/observability) |
| 浏览器里塞了 API key | [安全](/zh/tech/engineering/security) |
| 账单突然翻倍 | [成本](/zh/tech/engineering/cost-optimization) |

## 工程底线

1. 提示构建、JSON parse、权限过滤用单元测试。
2. 真模型调用 mock 掉，或单独 nightly。
3. 质量用冻结的题目集，不要每次换题。
4. 密钥只在服务端。

## 下一步

从 [测试](/zh/tech/engineering/testing) 进。微调仍然默认不要，见 [SFT](/zh/tech/training/SFT)。
