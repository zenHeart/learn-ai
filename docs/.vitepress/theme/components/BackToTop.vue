<script setup>
/**
 * Floating back-to-top button. Renders after 480px of scroll;
 * pure client behavior, nothing at SSR time.
 */
import { onMounted, onUnmounted, ref } from 'vue'
import { useData } from 'vitepress'

const { lang } = useData()
const visible = ref(false)
const onScroll = () => { visible.value = window.scrollY > 480 }
const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

onMounted(() => { window.addEventListener('scroll', onScroll, { passive: true }); onScroll() })
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <Transition name="btt-fade">
    <button v-if="visible" class="back-to-top" type="button" :aria-label="lang?.startsWith('zh') ? '返回顶部' : 'Back to top'" @click="toTop">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M8 3L2.5 8.5L4 10L8 6L12 10L13.5 8.5L8 3Z" fill="currentColor" />
      </svg>
    </button>
  </Transition>
</template>

<style scoped>
.back-to-top {
  position: fixed; right: 1.5rem; bottom: 2.5rem; z-index: 90;
  width: 2.4rem; height: 2.4rem; border-radius: 50%;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg); color: var(--vp-c-text-2);
  display: grid; place-items: center; cursor: pointer;
  box-shadow: 0 2px 12px rgba(0, 0, 0, .12);
  transition: all .2s ease;
}
.back-to-top:hover { color: var(--vp-c-brand); border-color: var(--vp-c-brand); transform: translateY(-2px); }
.btt-fade-enter-active, .btt-fade-leave-active { transition: opacity .2s ease, transform .2s ease; }
.btt-fade-enter-from, .btt-fade-leave-to { opacity: 0; transform: translateY(8px); }
@media (max-width: 768px) { .back-to-top { right: 1rem; bottom: 1.5rem; } }
</style>
