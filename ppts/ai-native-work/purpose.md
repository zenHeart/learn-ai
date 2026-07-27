# 要传达出去的理念

1. 核心目标 理解 Agent 下的工作范式迁移, 掌握工作流识别与沉淀方法, 充分利用 xx 放大个人效能
2. 需要覆盖的内容
   1. 概念认知
      1. 先理解 Agent 适合做什么强项在哪里，这里以 报销为例来说明 Agent 能力和资产的沉淀方式
      2. 能够识别智能化流程，表达出类似智能化转型的观念
         1. 人工驱动 -> 线上化 -> 流程化 -> 标准化 -> 自动化 -> 智能化 -> 自治化
      3. 能够建立 Agent 协同的认知，按照如下的策略
         1. 先沉淀资产
         2. 在沉淀流程
         3. 在跑通 MVP 
         4. 在迭代优化 (提效)
         5. 在复制放大 (复利)
   2. 方法层面
      1. 认识工具 codex 为例支持的扩展
         1. skill 
            1. find-skill
            2. skill-creator
            3. skill use
         2. mcp/connector 资源层面
         3. plugin 集成一组能力合集/marketplace
         4. scheduler
         5. 资产可组合
      2. 如何提效
         1. **打通环境** 打通你的环境，统一所有数据流， 以我打通多台机器为例， 建立 mcp 为例
         2. **沉淀资产** 复用已有成熟资产或者沉淀你自己的资产，skill 好的 skill
            1. evalus 评估
               1. headless mode agent mode
         3. **识别流程** 先从单个环节开始，按照智能化流程实施
         4. **跑通链路** 识别卡点, 跑通 mvp
         5. **迭代优化** 打磨完善链路
         6. **规模化** 多 agent ，并行，编排流程
      3. nn-ai 使用沉淀了什么， 简要讲解
   3. 实施层面， nn-ai 整个的衍化历史
      1. 先从一个 /cf2md 打通 confluence 资源， 跑通 plugin 流程
      2. 然后接入 zentao 支持 mcp
      3. 然后接入 gitlab mcp 控制发布流程
      4. 然后规模化完成 其他 mcp 流程
      5. 然后优化流程，优化 issue -> review -> test -> publish
      6. 基于 nn-ai 来搭建 研发工作流 nn-workflow, monitor
      7. 识别工作流阻塞点 /bugfix 技能
         1. 拉取 zentaobug
         2. 走 /debug 复现
         3. 走修复
         4. 走审核
         5. 推送触发 xx
