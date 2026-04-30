<script setup>
  defineProps({
    activeLayer: {
      type: String,
      default: "all",
      validator: (v) => ["prompt", "context", "harness", "all"].includes(v),
    },
  });

  const layers = [
    { id: "prompt", label: "Prompt", hint: "考题说明书" },
    { id: "context", label: "Context", hint: "开卷笔记" },
    { id: "harness", label: "Harness", hint: "考场基建" },
  ];
</script>

<template>
  <div class="slidev-layout keynote-step h-full w-full relative">
    <div class="h-full relative z-10">
      <slot />
    </div>

    <div class="layer-indicator">
      <div
        v-for="layer in layers"
        :key="layer.id"
        class="layer-pill"
        :class="{ active: activeLayer === layer.id || activeLayer === 'all' }"
      >
        <span class="layer-label">{{ layer.label }}</span>
        <span class="layer-hint">{{ layer.hint }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .keynote-step {
    padding: 2rem 4rem;
  }

  .layer-indicator {
    position: absolute;
    top: 12px;
    right: 16px;
    display: flex;
    gap: 6px;
    z-index: 0;
    pointer-events: none;
    opacity: 0.85;
  }

  .layer-pill {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 4px 10px;
    border-radius: 6px;
    border: 1px solid rgba(148, 163, 184, 0.3);
    background: rgba(255, 255, 255, 0.6);
    min-width: 64px;
    transition:
      background 0.2s,
      border-color 0.2s;
  }

  .layer-pill.active {
    background: rgba(59, 130, 246, 0.12);
    border-color: rgba(59, 130, 246, 0.5);
  }

  .layer-label {
    font-size: 11px;
    font-weight: 600;
    color: #475569;
    line-height: 1.2;
  }

  .layer-pill.active .layer-label {
    color: #1d4ed8;
  }

  .layer-hint {
    font-size: 9px;
    color: #94a3b8;
    line-height: 1.2;
    margin-top: 2px;
  }

  :deep(h1),
  :deep(h2) {
    max-width: 75%;
  }
</style>
