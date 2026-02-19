<template>
  <div class="slidev-layout full-vibe h-full w-full p-0">
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
  }
</style>
