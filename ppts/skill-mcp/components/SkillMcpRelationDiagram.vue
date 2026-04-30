<script setup>
import { computed } from 'vue'
import { useNav } from '@slidev/client'

let slidevNav
try {
  slidevNav = useNav()
} catch (e) {
  // 无 slidev 上下文降级
}

const clicks = computed(() => slidevNav?.clicks?.value ?? 4)

const showHarness = computed(() => clicks.value >= 1)
const showMcp = computed(() => clicks.value >= 2)
const showSkill = computed(() => clicks.value >= 3)
const showFormula = computed(() => clicks.value >= 4)
</script>

<template>
  <div class="rd-stage">
    <div class="rd-harness" :class="{ 'is-active': showHarness }">
      <div class="rd-harness-label">
        <span class="rd-harness-tag">Harness（第二期）</span>
        <span class="rd-harness-sub">提供环境容器：Tool · Memory · Loop</span>
      </div>

      <div class="rd-axis">
        <div class="rd-col rd-col-mcp" :class="{ 'is-active': showMcp }">
          <div class="rd-col-head">
            <span class="rd-col-num">横向</span>
            <span class="rd-col-title">MCP · 协议</span>
          </div>
          <div class="rd-col-body">
            <div class="rd-row"><span class="rd-label">能力上限</span><span>让 AI 能伸手</span></div>
            <div class="rd-row"><span class="rd-label">三大原语</span><span>Tools · Resources · Prompts</span></div>
            <div class="rd-row"><span class="rd-label">交付形态</span><span>MCP Server</span></div>
            <div class="rd-row"><span class="rd-label">代表项目</span><span>Playwright · Sentry · Postgres</span></div>
          </div>
        </div>

        <div class="rd-col rd-col-skill" :class="{ 'is-active': showSkill }">
          <div class="rd-col-head">
            <span class="rd-col-num">纵向</span>
            <span class="rd-col-title">Skill · 工序</span>
          </div>
          <div class="rd-col-body">
            <div class="rd-row"><span class="rd-label">稳定下限</span><span>让 AI 会做事</span></div>
            <div class="rd-row"><span class="rd-label">核心机制</span><span>Progressive Disclosure 三层</span></div>
            <div class="rd-row"><span class="rd-label">交付形态</span><span>SKILL.md + 资源</span></div>
            <div class="rd-row"><span class="rd-label">代表项目</span><span>code-review · mcp-builder</span></div>
          </div>
        </div>
      </div>

      <div class="rd-formula" :class="{ 'is-active': showFormula }">
        <span class="rd-mcp">MCP</span>
        <span class="rd-op">×</span>
        <span class="rd-skill">Skill</span>
        <span class="rd-op">=</span>
        <span class="rd-result">可交付协作者</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.rd-stage {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 0.5rem 0;
}

.rd-harness {
  width: min(880px, 96%);
  border: 2px dashed #94a3b8;
  border-radius: 14px;
  padding: 1.4rem 1.6rem 1.2rem;
  background: linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%);
  position: relative;
  opacity: 0.35;
  transform: scale(0.98);
  transition: all 0.45s ease;
}

.rd-harness.is-active {
  opacity: 1;
  transform: scale(1);
}

.rd-harness-label {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 1rem;
  padding-bottom: 0.6rem;
  border-bottom: 1px dashed #cbd5e1;
}

.rd-harness-tag {
  font-weight: 700;
  color: #475569;
  letter-spacing: 0.02em;
}

.rd-harness-sub {
  font-size: 0.78rem;
  color: #94a3b8;
}

.rd-axis {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.1rem;
}

.rd-col {
  border-radius: 10px;
  padding: 0.95rem 1.1rem;
  opacity: 0.3;
  transform: translateY(8px);
  transition: all 0.45s ease;
}

.rd-col.is-active {
  opacity: 1;
  transform: translateY(0);
}

.rd-col-mcp {
  background: #eff6ff;
  border-left: 4px solid #3b82f6;
}

.rd-col-skill {
  background: #faf5ff;
  border-left: 4px solid #a855f7;
}

.rd-col-head {
  display: flex;
  align-items: baseline;
  gap: 0.6rem;
  margin-bottom: 0.6rem;
}

.rd-col-num {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #94a3b8;
}

.rd-col-title {
  font-weight: 700;
  font-size: 1.05rem;
  color: #0f172a;
}

.rd-col-body {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  font-size: 0.82rem;
  color: #334155;
  line-height: 1.55;
}

.rd-row {
  display: flex;
  gap: 0.55rem;
}

.rd-label {
  display: inline-block;
  min-width: 4.4rem;
  color: #475569;
  font-weight: 600;
}

.rd-formula {
  margin-top: 1.1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.7rem;
  padding: 0.7rem 1rem;
  background: white;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  opacity: 0;
  transform: translateY(6px);
  transition: all 0.4s ease;
}

.rd-formula.is-active {
  opacity: 1;
  transform: translateY(0);
}

.rd-mcp { color: #2563eb; }
.rd-skill { color: #a855f7; }
.rd-op { color: #94a3b8; font-weight: 400; }
.rd-result {
  color: #0f172a;
  background: linear-gradient(180deg, #fef3c7, #fde68a);
  padding: 0.15rem 0.7rem;
  border-radius: 6px;
}
</style>
