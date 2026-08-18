<!--
  Preset: feedback-loop
  特征：主流程线性 + 1-2 条错误回流曲线
  适用：AI Coding 循环、CI 重试、Verify-Fail 回流
  节点数：5-10
  必填数据：steps[] + nodes[] + edges[]（必须显式声明 path）
  灵感来源：VibeWorkflow.vue（简化版）
  使用方式：完整拷贝此文件 → 替换占位 → 重命名组件
-->

<script setup>
import { ref, computed, watch } from 'vue'
import { useNav } from '@slidev/client'

const props = defineProps({ mini: { type: Boolean, default: false } })

let slidevNav
try { slidevNav = useNav() } catch (e) { /* 降级 */ }

const instanceId = Math.random().toString(36).substring(2, 7)
const currentStepIndex = ref(0)

// ============================================================
// REPLACE: 步骤剧本
// 关键：含 result: 'fail' 的失败步会触发回流曲线高亮
// ============================================================
const steps = [
  { id: 's1', title: '1. 提交',         description: '用户提交代码',          tags: ['Input'],        activeNode: 'submit' },
  { id: 's2', title: '2. CI 触发',      description: '自动跑测试与检查',      tags: ['Tool'],         activeNode: 'ci',     line: 'submit-ci' },
  { id: 's3', title: '3. 失败',         description: '测试 / Lint 报错',      tags: ['Verify'],       activeNode: 'ci',     result: 'fail',  line: 'ci-fix' },
  { id: 's4', title: '4. 自动回流',     description: '错误推回开发者修复',    tags: ['Self-Correct'], activeNode: 'fix',    line: 'ci-fix' },
  { id: 's5', title: '5. 修复后再试',   description: '推送修复，重新跑 CI',   tags: ['Retry'],        activeNode: 'ci',     line: 'fix-ci' },
  { id: 's6', title: '6. 通过 + 合并',  description: '所有检查 ✓',           tags: ['Pass'],         activeNode: 'merge',  result: 'pass',  line: 'ci-merge' },
]

// ============================================================
// REPLACE: 节点定义
// 主流程 y=150，回流目标 y=280（垂直距离 ≥ 130）
// ============================================================
const nodes = [
  { id: 'submit', label: 'Submit',  sub: '提交代码',     position: { x: 10,  y: 130 } },
  { id: 'ci',     label: 'CI Run',  sub: '自动化检查',   position: { x: 200, y: 130 } },
  { id: 'fix',    label: 'Fix',     sub: '修复',         position: { x: 200, y: 280 } },
  { id: 'merge',  label: 'Merge',   sub: '合并',         position: { x: 470, y: 130 } },
  { id: 'done',   label: 'Done',    sub: '完成',         position: { x: 700, y: 140 }, size: { w: 80, h: 80 } },
]

// ============================================================
// REPLACE: 连线（含主流程 + 回流曲线）
// 回流必须用 type: 'orthogonal' 显式声明 path
// ============================================================
const edges = [
  // 主流程
  { from: 'submit', to: 'ci' },
  { from: 'ci',     to: 'merge', variant: 'pass' },
  { from: 'merge',  to: 'done' },
  // 失败回流（CI -> Fix）
  { from: 'ci',  to: 'fix', type: 'orthogonal', path: 'M 260 200 L 260 240 L 260 280', variant: 'fail', dashed: true },
  // 修复回流（Fix -> CI）
  { from: 'fix', to: 'ci',  type: 'orthogonal', path: 'M 320 320 L 380 320 L 380 200 L 320 200', variant: 'warn', dashed: true },
]

// ============================================================
// 内部逻辑（一般不用改）
// ============================================================
const currentStep = computed(() => steps[currentStepIndex.value])

watch(
  () => slidevNav?.clicks?.value,
  (newVal) => {
    if (newVal !== undefined && !props.mini) {
      currentStepIndex.value = Math.min(Math.max(newVal, 0), steps.length - 1)
    }
  },
  { immediate: true },
)

const nextStep = () => {
  if (!props.mini && slidevNav) slidevNav.next()
  else if (currentStepIndex.value < steps.length - 1) currentStepIndex.value++
}
const prevStep = () => {
  if (!props.mini && slidevNav) slidevNav.prev()
  else if (currentStepIndex.value > 0) currentStepIndex.value--
}
const reset = () => {
  if (!props.mini && slidevNav?.clicks) slidevNav.clicks.value = 0
  else currentStepIndex.value = 0
}

const getNodeClass = (id) => {
  const active = currentStep.value.activeNode === id
  return active
    ? 'node-active border-blue-500 dark:border-blue-400 bg-blue-50/50 dark:bg-slate-800'
    : 'opacity-60 grayscale border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900'
}

const getEdgeClass = (edge) => {
  const active = currentStep.value.line === `${edge.from}-${edge.to}`
  if (!active) return 'stroke-slate-300 dark:stroke-slate-700 opacity-30'
  if (edge.variant === 'fail') return 'stroke-red-500 opacity-100 flow-line'
  if (edge.variant === 'warn') return 'stroke-purple-500 opacity-100 flow-line'
  if (edge.variant === 'pass') return 'stroke-green-500 opacity-100 flow-line'
  return 'stroke-blue-500 opacity-100 flow-line'
}

const getMarker = (edge) => {
  const active = currentStep.value.line === `${edge.from}-${edge.to}`
  if (!active) return `url(#arrow-gray-${instanceId})`
  return `url(#arrow-${edge.variant ?? 'blue'}-${instanceId})`
}

const getLineCoords = (edge) => {
  const fromNode = nodes.find(n => n.id === edge.from)
  const toNode = nodes.find(n => n.id === edge.to)
  if (!fromNode || !toNode) return { x1: 0, y1: 0, x2: 0, y2: 0 }
  return {
    x1: fromNode.position.x + (fromNode.size?.w ?? 120) + 10,
    y1: fromNode.position.y + (fromNode.size?.h ?? 100) / 2,
    x2: toNode.position.x - 10,
    y2: toNode.position.y + (toNode.size?.h ?? 100) / 2,
  }
}
</script>

<template>
  <div
    class="workflow-container bg-white dark:bg-[#0b0d11] text-slate-700 dark:text-slate-200 flex flex-col h-full w-full"
    :class="{ 'mini-mode bg-transparent': mini }"
  >
    <div v-if="!mini" class="flex-shrink-0 flex justify-between items-center p-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#161b22]/50">
      <h2 class="text-lg font-bold">Feedback-Loop Workflow</h2>
      <div class="flex items-center gap-2 bg-slate-100 dark:bg-[#0d1117] p-1 border border-slate-200 dark:border-slate-700/50">
        <button @click="prevStep" :disabled="currentStepIndex === 0" class="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-30">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
        </button>
        <div class="px-2 font-mono text-xs text-blue-600 dark:text-blue-400 font-bold min-w-[70px] text-center">STEP {{ currentStepIndex + 1 }}/{{ steps.length }}</div>
        <button @click="nextStep" :disabled="currentStepIndex === steps.length - 1" class="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-30">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
        </button>
        <div class="w-px h-4 bg-slate-300 dark:bg-slate-700 mx-1" />
        <button @click="reset" class="px-2 py-1 text-[10px]">重置</button>
      </div>
    </div>

    <div class="flex-1 relative bg-white dark:bg-[#0d1117] overflow-hidden flex items-center justify-center">
      <div class="diagram-viewport relative w-full h-full overflow-hidden" :class="mini ? '' : 'max-w-[1000px] max-h-[450px]'">
        <div :class="mini ? 'mini-scaler' : 'diagram-scaler absolute inset-0 flex items-center justify-center'">
          <div class="relative w-[1000px] h-[400px]">
            <svg class="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible text-slate-300 dark:text-slate-700">
              <defs>
                <marker :id="`arrow-gray-${instanceId}`" markerWidth="6" markerHeight="6" refX="16" refY="3" orient="auto"><path d="M0,0 L0,6 L6,3 z" fill="currentColor" /></marker>
                <marker :id="`arrow-blue-${instanceId}`" markerWidth="6" markerHeight="6" refX="16" refY="3" orient="auto"><path d="M0,0 L0,6 L6,3 z" fill="#60a5fa" /></marker>
                <marker :id="`arrow-pass-${instanceId}`" markerWidth="6" markerHeight="6" refX="16" refY="3" orient="auto"><path d="M0,0 L0,6 L6,3 z" fill="#10b981" /></marker>
                <marker :id="`arrow-fail-${instanceId}`" markerWidth="6" markerHeight="6" refX="16" refY="3" orient="auto"><path d="M0,0 L0,6 L6,3 z" fill="#ef4444" /></marker>
                <marker :id="`arrow-warn-${instanceId}`" markerWidth="6" markerHeight="6" refX="16" refY="3" orient="auto"><path d="M0,0 L0,6 L6,3 z" fill="#a855f7" /></marker>
              </defs>

              <!-- 直线（type 默认或 'line'） -->
              <template v-for="edge in edges" :key="`${edge.from}-${edge.to}`">
                <line
                  v-if="edge.type !== 'orthogonal' && edge.type !== 'curve'"
                  v-bind="getLineCoords(edge)"
                  stroke-width="2"
                  class="transition-all"
                  :class="getEdgeClass(edge)"
                  :marker-end="getMarker(edge)"
                />
                <!-- 圆角正交（含 path） -->
                <path
                  v-else
                  :d="edge.path"
                  fill="none"
                  stroke-width="2"
                  :stroke-dasharray="edge.dashed ? '6,4' : ''"
                  class="transition-all"
                  :class="getEdgeClass(edge)"
                  :marker-end="getMarker(edge)"
                />
              </template>
            </svg>

            <div
              v-for="node in nodes" :key="node.id"
              class="absolute z-10 transition-all duration-300"
              :style="{
                top: node.position.y + 'px',
                left: node.position.x + 'px',
                width: (node.size?.w ?? 120) + 'px',
                height: (node.size?.h ?? 100) + 'px',
              }"
              :class="getNodeClass(node.id)"
            >
              <div class="w-full h-full bg-white dark:bg-[#1c2128] border border-slate-200 dark:border-slate-600 p-2 flex flex-col items-center justify-center gap-1 shadow-xl"
                :class="(node.size?.w ?? 120) === 80 ? 'rounded-full' : 'rounded-none'">
                <span class="font-bold text-xs">{{ node.label }}</span>
                <span v-if="node.sub" class="text-[9px] text-slate-500">{{ node.sub }}</span>
              </div>
              <!-- result 徽章 -->
              <div
                v-if="node.id === currentStep.activeNode && currentStep.result === 'fail'"
                class="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-red-500 text-white text-[8px] font-bold px-2 py-0.5 rounded-full shadow-lg animate-bounce"
              >FAILED</div>
              <div
                v-if="node.id === currentStep.activeNode && currentStep.result === 'pass'"
                class="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-green-500 text-white text-[8px] font-bold px-2 py-0.5 rounded-full shadow-lg"
              >PASSED</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="!mini" class="flex-shrink-0 bg-slate-50 dark:bg-[#161b22] border-t border-slate-200 dark:border-slate-800 p-2" style="height: 80px">
      <h3 class="font-bold mb-0.5 font-mono uppercase" :class="currentStep.result === 'fail' ? 'text-red-600 dark:text-red-400' : 'text-blue-600 dark:text-blue-400'" style="font-size: 10px">{{ currentStep.title }}</h3>
      <p class="text-slate-600 dark:text-slate-300 leading-tight" style="font-size: 9px; margin: 0">{{ currentStep.description }}</p>
      <div v-if="currentStep.tags?.length" class="mt-1 flex flex-wrap gap-1 opacity-60">
        <span v-for="tag in currentStep.tags" :key="tag" class="px-1 py-0 bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-mono" style="font-size: 8px">#{{ tag }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.workflow-container { container-type: size; }
.diagram-scaler {
  transform-origin: center center;
  transform: scale(min(1, calc(100cqw / 1050), calc(100cqh / 480)));
}
@container (max-height: 400px) { .diagram-scaler { transform: scale(min(0.85, calc(100cqh / 450))); } }
.flow-line { stroke-dasharray: 8; animation: flow 1s linear infinite; }
@keyframes flow { from { stroke-dashoffset: 16; } to { stroke-dashoffset: 0; } }
.node-active { transform: scale(1.05); box-shadow: 0 0 20px rgba(59, 130, 246, 0.25); z-index: 20; }
button:disabled { cursor: not-allowed; opacity: 0.3; }
.mini-mode { background: transparent !important; }
.mini-scaler { position: absolute; top: 0; left: 0; width: 1000px; height: 400px; transform-origin: top left; transform: scale(0.22); }
.mini-mode .node-active { transform: scale(1.3); }
</style>
