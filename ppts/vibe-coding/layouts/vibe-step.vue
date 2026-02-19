<script setup>
  const props = defineProps({
    activeStep: {
      type: String,
      default: "start",
    },
  });
</script>

<template>
  <div class="slidev-layout vibe-step h-full w-full relative">
    <!-- 正文内容插槽 -->
    <div class="h-full">
      <slot />
    </div>

    <!-- 右上角固定缩略图：用 overflow:hidden 裁剪，内容通过 transform 缩放 -->
    <div class="mini-map-wrapper">
      <VibeWorkflow mini :activeStepId="activeStep" />
    </div>
  </div>
</template>

<style scoped>
  .vibe-step {
    padding: 2rem 4rem;
  }

  /* 缩略图外壳：固定位置和尺寸，裁剪溢出 */
  .mini-map-wrapper {
    position: absolute;
    top: 8px;
    right: 8px;
    width: 220px;
    height: 100px;
    overflow: hidden;
    z-index: 50;
    pointer-events: none;
    opacity: 0.85;
    border-radius: 4px;
    border: 1px solid rgba(148, 163, 184, 0.2);
    background: rgba(255, 255, 255, 0.5);
  }

  /* 确保正文不会被缩略图完全遮挡重要操作点 */
  :deep(h1),
  :deep(h2) {
    max-width: 80%;
  }
</style>
