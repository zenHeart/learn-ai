# 跨项目 Context 输入方案

## 核心要点

1. **Context 抽象层**：定义统一的 Context 接口规范，不同项目按规范实现 Context Producer/Consumer
2. **Context Registry**：中心化注册所有项目的 Context 类型和 Schema，便于查询和组合
3. **按需组装**：Agent 根据当前任务动态组装所需 Context，而非预加载全部项目 Context
4. **版本化与回退**：Context 内容随项目演进会产生变化，需要版本管理机制支持回退
5. **权限隔离**：跨项目 Context 涉及敏感信息，需要细粒度的访问控制（哪些 Context 可被哪些 Agent 访问）

> 整理自任务"整理跨项目 Context 输入方案"
