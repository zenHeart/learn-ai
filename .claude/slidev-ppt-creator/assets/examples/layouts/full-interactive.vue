<template>
  <div
    class="slidev-layout full-screen-interactive h-full w-full"
    :class="$attrs.class || 'p-0'"
  >
    <slot />
  </div>
</template>

<style>
  :root {
    /* 移除 Slidev 默认的内容容器背景及 Padding */
    --slidev-slide-container-background: transparent !important;
  }
</style>

<style scoped>
  .full-screen-interactive {
    display: flex;
    flex-direction: column;
    background: transparent;
    overflow: hidden;
  }
</style>
