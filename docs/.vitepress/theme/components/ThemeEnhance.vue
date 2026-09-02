<script setup>
/**
 * Layout-bottom enhancement layer: back-to-top button + delegated
 * mermaid click-to-zoom (lightbox). One client mount point keeps the
 * rest of the theme SSR-pure.
 */
import { onMounted, onUnmounted } from 'vue'
import BackToTop from './BackToTop.vue'

let root

function onDocClick(e) {
  const svg = e.target.closest?.('.vp-doc .mermaid svg')
  const box = e.target.closest?.('.mermaid.zoomed')
  if (svg) svg.closest('.mermaid').classList.add('zoomed')
  else if (box) box.classList.remove('zoomed')
}
function onKey(e) {
  if (e.key === 'Escape') root?.querySelector('.mermaid.zoomed')?.classList.remove('zoomed')
}

onMounted(() => {
  root = document
  document.addEventListener('click', onDocClick)
  document.addEventListener('keydown', onKey)
})
onUnmounted(() => {
  document.removeEventListener('click', onDocClick)
  document.removeEventListener('keydown', onKey)
})
</script>

<template>
  <BackToTop />
</template>
