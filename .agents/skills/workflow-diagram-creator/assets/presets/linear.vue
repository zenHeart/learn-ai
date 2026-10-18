<!--
  Preset: linear
  特征：单向 N 步流程，无回流，无嵌套
  适用：OAuth 流程、CI 流水线、安装步骤、用户旅程
  节点数：3-7（超过 7 建议拆分）
  必填数据：steps[] + nodes[]（edges 可选）
  灵感来源：MCPWorkflow.vue / MinimalWorkflow.vue
  使用方式：完整拷贝此文件 → 替换占位 → 重命名组件
-->

<script setup>
import { ref, computed, watch } from 'vue'
import { useNav } from '@slidev/client'

const props = defineProps({
  mini: { type: Boolean, default: false },
})

let slidevNav
try {
  slidevNav = useNav()
} catch (e) {
  /* 非 Slidev 环境降级 */
}

const instanceId = Math.random().toString(36).substring(2, 7)
const currentStepIndex = ref(0)

// ============================================================
// REPLACE: 步骤剧本（参考 references/DATA_MODEL.md · StepDef）
// ============================================================
const steps = [
  { id: 'step-1', title: '1. 第一步', description: '描述这一步发生了什么', tags: ['Tag1'], activeNode: 'n1' },
  { id: 'step-2', title: '2. 第二步', description: '...', tags: ['Tag2'], activeNode: 'n2', line: 'n1-n2' },
  { id: 'step-3', title: '3. 第三步', description: '...', tags: ['Tag3'], activeNode: 'n3', line: 'n2-n3' },
  { id: 'step-4', title: '4. 第四步', description: '...', tags: ['Tag4'], activeNode: 'n4', line: 'n3-n4' },
  { id: 'step-5', title: '5. 完成',   description: '任务完成',  tags: ['Done'], activeNode: 'done', line: 'n4-done' },
]

// ============================================================
// REPLACE: 节点定义（参考 references/COORDINATE_GUIDE.md）
// 画布 1000×400，y=130 主流程，间距约 170-180
// ============================================================
const nodes = [
  { id: 'n1',   label: '节点 1', sub: '说明', position: { x: 10,  y: 130 } },
  { id: 'n2',   label: '节点 2', sub: '说明', position: { x: 200, y: 130 } },
  { id: 'n3',   label: '节点 3', sub: '说明', position: { x: 390, y: 130 } },
  { id: 'n4',   label: '节点 4', sub: '说明', position: { x: 580, y: 130 } },
  { id: 'done', label: 'Done',   sub: '完成', position: { x: 870, y: 140 }, size: { w: 80, h: 80 } },
]

// ============================================================
// REPLACE: 连线（线性流程默认相邻节点连接，无需自定义可留空数组）
// ============================================================
const edges = [
  { from: 'n1', to: 'n2' },
  { from: 'n2', to: 'n3' },
  { from: 'n3', to: 'n4' },
  { from: 'n4', to: 'done' },
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

const getLineClass = (from, to) => {
  const active = currentStep.value.line === `${from}-${to}`
  return active ? 'stroke-blue-500 opacity-100 flow-line' : 'stroke-slate-300 dark:stroke-slate-700 opacity-30'
}

const getMarker = (from, to) => {
  const active = currentStep.value.line === `${from}-${to}`
  return active ? `url(#arrow-blue-${instanceId})` : `url(#arrow-gray-${instanceId})`
}
</script>

<template>
  <div
    class="workflow-container bg-white dark:bg-[#0b0d11] text-slate-700 dark:text-slate-200 rounded-none overflow-hidden flex flex-col h-full w-full"
    :class="{ 'mini-mode bg-transparent': mini }"
  >
    <!-- 顶部控制器（mini 模式隐藏） -->
    <div
      v-if="!mini"
      class="flex-shrink-0 flex justify-between items-center p-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#161b22]/50"
    >
      <h2 class="text-lg font-bold flex items-center gap-2">
        <!-- REPLACE: 标题 -->
        Linear Workflow
      </h2>
      <div class="flex items-center gap-2 bg-slate-100 dark:bg-[#0d1117] p-1 border border-slate-200 dark:border-slate-700/50">
        <button @click="prevStep" :disabled="currentStepIndex === 0" class="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-30 transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
        </button>
        <div class="px-2 font-mono text-xs text-blue-600 dark:text-blue-400 font-bold min-w-[70px] text-center">STEP {{ currentStepIndex + 1 }}/{{ steps.length }}</div>
        <button @click="nextStep" :disabled="currentStepIndex === steps.length - 1" class="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-30 transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
        </button>
        <div class="w-px h-4 bg-slate-300 dark:bg-slate-700 mx-1" />
        <button @click="reset" class="px-2 py-1 text-[10px] hover:bg-slate-200 dark:hover:bg-slate-700">重置</button>
      </div>
    </div>

    <!-- 画布 -->
    <div class="flex-1 relative bg-white dark:bg-[#0d1117] overflow-hidden flex items-center justify-center">
      <div class="diagram-viewport relative w-full h-full overflow-hidden" :class="mini ? '' : 'max-w-[1000px] max-h-[400px]'">
        <div :class="mini ? 'mini-scaler' : 'diagram-scaler absolute inset-0 flex items-center justify-center'">
          <div class="relative w-[1000px] h-[400px]">
            <svg class="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible text-slate-300 dark:text-slate-700">
              <defs>
                <marker :id="`arrow-gray-${instanceId}`" markerWidth="6" markerHeight="6" refX="16" refY="3" orient="auto">
                  <path d="M0,0 L0,6 L6,3 z" fill="currentColor" />
                </marker>
                <marker :id="`arrow-blue-${instanceId}`" markerWidth="6" markerHeight="6" refX="16" refY="3" orient="auto">
                  <path d="M0,0 L0,6 L6,3 z" fill="#60a5fa" />
                </marker>
              </defs>

              <!-- 自动渲染连线 -->
              <line
                v-for="edge in edges" :key="`${edge.from}-${edge.to}`"
                :x1="(nodes.find(n => n.id === edge.from)?.position.x ?? 0) + ((nodes.find(n => n.id === edge.from)?.size?.w ?? 120) + 10)"
                :y1="(nodes.find(n => n.id === edge.from)?.position.y ?? 0) + ((nodes.find(n => n.id === edge.from)?.size?.h ?? 100) / 2)"
                :x2="(nodes.find(n => n.id === edge.to)?.position.x ?? 0) - 10"
                :y2="(nodes.find(n => n.id === edge.to)?.position.y ?? 0) + ((nodes.find(n => n.id === edge.to)?.size?.h ?? 100) / 2)"
                stroke-width="2"
                class="transition-all"
                :class="getLineClass(edge.from, edge.to)"
                :marker-end="getMarker(edge.from, edge.to)"
              />
            </svg>

            <!-- 自动渲染节点 -->
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
                <span class="font-bold text-xs text-slate-800 dark:text-slate-200">{{ node.label }}</span>
                <span v-if="node.sub" class="text-[9px] text-slate-500">{{ node.sub }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部状态区（mini 模式隐藏） -->
    <div v-if="!mini" class="flex-shrink-0 bg-slate-50 dark:bg-[#161b22] border-t border-slate-200 dark:border-slate-800 flex gap-2 items-start p-2" style="height: 80px">
      <div class="flex-1">
        <h3 class="font-bold text-blue-600 dark:text-blue-400 mb-0.5 font-mono uppercase" style="font-size: 10px">{{ currentStep.title }}</h3>
        <p class="text-slate-600 dark:text-slate-300 leading-tight" style="font-size: 9px; margin: 0">{{ currentStep.description }}</p>
        <div v-if="currentStep.tags?.length" class="mt-1 flex flex-wrap gap-1 opacity-60">
          <span v-for="tag in currentStep.tags" :key="tag" class="px-1 py-0 bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-mono" style="font-size: 8px">#{{ tag }}</span>
        </div>
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
@container (max-height: 400px) {
  .diagram-scaler { transform: scale(min(0.85, calc(100cqh / 450))); }
}

.flow-line {
  stroke-dasharray: 8;
  animation: flow 1s linear infinite;
}
@keyframes flow {
  from { stroke-dashoffset: 16; }
  to { stroke-dashoffset: 0; }
}

.node-active {
  transform: scale(1.05);
  box-shadow: 0 0 20px rgba(59, 130, 246, 0.25);
  z-index: 20;
}

button:disabled { cursor: not-allowed; opacity: 0.3; }

.mini-mode { background: transparent !important; border: none !important; }
.mini-scaler {
  position: absolute;
  top: 0; left: 0;
  width: 1000px; height: 400px;
  transform-origin: top left;
  transform: scale(0.22);
}
.mini-mode .node-active {
  transform: scale(1.3);
  box-shadow: 0 0 15px rgba(59, 130, 246, 0.6);
  z-index: 100;
}
</style>
