<template>
  <div
    class="slidev-layout full-vibe h-full w-full"
    :class="$attrs.class || 'p-8'"
  >
    <slot />
  </div>
</template>

<style>
  :root {
    --slidev-slide-container-background: transparent !important;
  }
</style>

<style scoped>
  .full-vibe {
    display: flex;
    flex-direction: column;
    background: transparent;
    overflow-y: auto;
  }
</style>
