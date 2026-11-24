<script setup lang="ts">
/**
 * Pannable diagram figure for product pages outside REA.
 *
 * The article column is 688px wide, so a wide SVG scaled to the column turns
 * its labels into unreadable text. Two thresholds keep labels legible:
 * below 768px the image keeps its full width and the frame pans; from 768px up
 * the image may shrink, but never below `width * minScale`, so a 1080px diagram
 * still renders at 864px and the frame pans instead of shrinking labels to 6px.
 */
import { onBeforeUnmount, onMounted, ref } from 'vue'

interface Props {
  src: string
  alt: string
  /** viewBox width of the SVG, in px. */
  width: number
  /** Smallest rendered scale once the image is allowed to shrink. */
  minScale?: number
  /** Caption shown while the frame overflows and has to be panned. */
  hint?: string
}

const props = withDefaults(defineProps<Props>(), {
  minScale: 0.8,
  hint: '图比正文栏宽，可左右滑动查看完整图解；每张 SVG 都带有完整的长描述文字。'
})

const frame = ref<HTMLElement | null>(null)
const overflowing = ref(false)
let observer: ResizeObserver | undefined

function measure() {
  const el = frame.value
  if (!el) return
  overflowing.value = el.scrollWidth > el.clientWidth + 1
}

onMounted(() => {
  measure()
  if (typeof ResizeObserver !== 'undefined') {
    observer = new ResizeObserver(measure)
    if (frame.value) observer.observe(frame.value)
  }
  window.addEventListener('resize', measure)
})

onBeforeUnmount(() => {
  observer?.disconnect()
  window.removeEventListener('resize', measure)
})
</script>

<template>
  <figure class="dd">
    <div
      ref="frame"
      class="dd-frame"
      tabindex="0"
      role="group"
      :aria-label="`${props.alt.slice(0, 40)}……（图解，可横向滚动）`"
    >
      <img
        class="dd-img"
        :src="props.src"
        :alt="props.alt"
        :style="{
          '--dd-full': `${props.width}px`,
          '--dd-floor': `${Math.round(props.width * props.minScale)}px`
        }"
      />
    </div>
    <figcaption v-if="overflowing" class="dd-hint">{{ props.hint }}</figcaption>
  </figure>
</template>

<style scoped>
.dd { margin: 1.75rem 0; }
.dd-frame {
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  border-radius: 8px;
  scrollbar-width: thin;
  scrollbar-color: var(--vp-c-divider) transparent;
}
.dd-frame:focus-visible { outline: 2px solid var(--vp-c-brand); outline-offset: 2px; }
.dd-img { display: block; width: 100%; min-width: var(--dd-full); height: auto; }
@media (min-width: 768px) {
  .dd-img { min-width: var(--dd-floor); }
}
.dd-hint { margin: .5rem 0 0; font-size: .78rem; color: var(--vp-c-text-3); line-height: 1.6; }
</style>
