<script setup>
import { ref } from "vue";

const props = defineProps({
  id: { type: String, required: true }
});
const showTooltip = ref(false);
</script>

<template>
  <span 
    class="relative inline-block mx-1 text-blue-500 underline transition-colors cursor-pointer example-badge decoration-dashed hover:text-blue-700" 
    @click="showTooltip = !showTooltip"
    title="点击查看 Demo 详情"
  >
    Demo {{ id }}
    
    <!-- Tooltip 提示框 -->
    <div 
      v-if="showTooltip" 
      class="absolute z-50 w-64 p-3 mb-2 text-sm font-normal text-left text-gray-800 normal-case -translate-x-1/2 bg-white border border-gray-200 rounded shadow-lg pointer-events-none bottom-full left-1/2"
    >
      <div class="pb-1 mb-2 font-bold border-b border-gray-100">Example {{ id }}</div>
      <p class="mb-1 text-gray-600">请参阅对应的 README 文档：</p>
      <code class="block p-1 text-xs text-blue-600 break-all rounded bg-gray-50">examples/{{ id }}.slug/README.md</code>
      
      <!-- 三角形箭头 -->
      <div class="absolute -translate-x-1/2 border-4 border-transparent top-full left-1/2 border-t-white drop-shadow-sm"></div>
    </div>
  </span>
</template>

<style scoped>
/* 局部作用域样式，确保不会污染 PPT 其他组件的样式 */
.example-badge {
  font-weight: 500;
}
</style>
