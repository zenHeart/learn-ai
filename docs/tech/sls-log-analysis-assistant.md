# 基于飞书 Aily 搭建 SLS 日志分析助手

> 来源：https://tech.qimao.com/ji-yu-fei-shu-aily-da-jian-slsri-zhi-fen-xi-zhu-shou/

## 核心要点

1. **飞书 Aily 能力**：任务深度规划 + 多工具集成（官方 MCP + 自定义工具）+ 多轮对话理解 + 可视化报告生成
2. **SLS 日志分析**：阿里云 SLS 日志 MCP 接入 Aily，自动获取 error 日志并生成分析报告
3. **两种搭建方案**：自定义智能体（配置式）和工作流应用（流程编排式），满足不同复杂度的需求
4. **可扩展方向**：与 OnCall 告警联动（告警自动触发分析）+ 与 Codeup 对接（分析结果触发代码操作）
5. **应用场景拓展**：日常问题反馈群消息自动汇总、Grafana 监控分析、火焰图分析等

> 来源：齐淼树技术团队，TechQimao
