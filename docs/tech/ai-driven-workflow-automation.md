# AI 驱动工作流：自动化项目分析与线上问题修复

> 来源：https://tech.qimao.com/ai-qu-dong-gong-zuo-liu-zi-dong-hua-xiang-mu-fen-xi-yu-xian-shang-wen-ti-xiu-fu/

## 核心要点

1. **自动化修复闭环**：Sentry 捕获错误 → AI 自动分析根因 → Claude Code 生成修复代码并创建 MR → 飞书通知 → 人工合并
2. **核心工具链**：Sentry（监控）+ Claude Code 无头模式（代码修复）+ MCP（性能分析/飞书/代码托管）+ 飞书 aPaaS（通知）
3. **零干预目标**：人工 90% 工作被替代，最快 3 分钟完成从错误发生到修复方案生成
4. **性能分析自动化**：监控指标+构建产物 → 自动识别瓶颈 → AI 生成优化建议
5. **人工确认兜底**：AI 生成 MR 后由人审查合并，确保代码安全

> 来源：齐淼树技术团队，TechQimao
