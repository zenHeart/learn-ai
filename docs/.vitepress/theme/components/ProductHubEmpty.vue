<template>
  <div class="hub-empty">
    <span class="hub-empty-icon" aria-hidden="true">🗺️</span>
    <p>{{ labels.empty }}</p>
    <button class="hub-empty-reset" @click="$emit('reset')">{{ labels.reset }}</button>
  </div>
</template>

<script setup>
  defineProps({
    labels: { type: Object, required: true },
  })
  defineEmits(['reset'])
</script>

<style scoped>
  .hub-empty {
    text-align: center;
    padding: 70px 20px;
    color: var(--vp-c-text-2);
  }

  .hub-empty-icon {
    display: block;
    font-size: 56px;
    margin-bottom: 14px;
  }

  .hub-empty p {
    margin: 0 0 18px;
    font-size: 16px;
  }

  .hub-empty-reset {
    padding: 9px 22px;
    border: 1px solid var(--vp-c-brand);
    border-radius: 22px;
    background: transparent;
    color: var(--vp-c-brand);
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .hub-empty-reset:hover {
    background: var(--vp-c-brand);
    color: white;
  }
</style>
