<script setup lang="ts">
/**
 * 图解容器：宽图在窄屏上改为可横向平移，而不是缩成不可读的缩略图。
 *
 * 背景：两张 REA 图的 viewBox 宽 880px。在 390px 手机上按比例缩到 327px 后，
 * 10.5px 的图内字号只剩约 3.9px，B11「默认展示尺寸下核心标签不可读」直接命中。
 * 因此这里在窄屏保持接近原始尺寸并允许平移，在宽屏才缩放到容器宽度。
 */
interface Props {
  src: string
  alt: string
  /** 窄屏下保持的最小宽度；默认取接近 SVG 原始 viewBox 宽度。 */
  minWidth?: number
}

const props = withDefaults(defineProps<Props>(), { minWidth: 860 })
</script>

<template>
  <figure class="rd">
    <div class="rd-frame" tabindex="0" role="group" :aria-label="`${props.alt.slice(0, 40)}……（图解，可横向滚动）`">
      <img class="rd-img" :src="props.src" :alt="props.alt" :style="{ minWidth: `${props.minWidth}px` }" />
    </div>
    <figcaption class="rd-hint">窄屏下可横向滑动查看完整图解；图内每张 SVG 都带有完整的长描述文字。</figcaption>
    <slot />
  </figure>
</template>

<style scoped>
.rd { margin: 1.75rem 0; }
.rd-frame { overflow-x: auto; overflow-y: hidden; -webkit-overflow-scrolling: touch; border-radius: 8px; }
.rd-frame:focus-visible { outline: 2px solid var(--vp-c-brand); outline-offset: 2px; }
.rd-img { display: block; width: 100%; height: auto; }
.rd-hint { margin: .5rem 0 0; font-size: .78rem; color: var(--vp-c-text-3); line-height: 1.6; }
@media (min-width: 768px) {
  /* 容器够宽时才允许缩放到容器宽度；否则保持 minWidth。 */
  .rd-img { min-width: 0 !important; }
  .rd-hint { display: none; }
}
</style>