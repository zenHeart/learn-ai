<script setup lang="ts">
/**
 * Diagram figure for product pages outside REA: readable inline, full-screen on click.
 *
 * Inline. The article column is narrow (688px by default), and a wide SVG scaled to
 * it turns its labels into 6px text. From 768px up the image may shrink but never
 * below `width * minScale`, and the frame pans if it is still too wide. Below 768px
 * the image fits the column as an overview, because a phone cannot show a dense
 * diagram readably either way; the full-screen view is the reading mode there.
 *
 * Full-screen. Click, tap, Enter or Space opens a dialog that shows the SVG at
 * `width` px, with zoom controls. Esc and the backdrop close it, focus stays inside
 * while it is open, and the page does not scroll underneath.
 */
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'

interface Props {
  src: string
  alt: string
  /** viewBox width of the SVG, in px. */
  width: number
  /** Smallest rendered scale once the image is allowed to shrink. */
  minScale?: number
  /** Language of the controls. */
  lang?: 'zh' | 'en'
  /** Replaces the caption shown while the frame overflows and has to be panned. */
  hint?: string
}

const props = withDefaults(defineProps<Props>(), { minScale: 0.8, lang: 'zh', hint: undefined })

const zh = {
  enlarge: '放大',
  open: '全屏查看这张图解',
  zoomIn: '放大',
  zoomOut: '缩小',
  reset: '适应窗口',
  close: '关闭',
  dialog: '图解查看器',
  overflow: '图比正文栏宽，可左右滑动查看完整图解；点按可全屏放大。',
  mobile: '点按图解可全屏查看并缩放。每张图都带有完整的文字描述。'
}
const en = {
  enlarge: 'Enlarge',
  open: 'Open this diagram full screen',
  zoomIn: 'Zoom in',
  zoomOut: 'Zoom out',
  reset: 'Fit or 100%',
  close: 'Close',
  dialog: 'Diagram viewer',
  overflow: 'This diagram is wider than the column. Scroll sideways to see all of it, or click it to enlarge.',
  mobile: 'Tap the diagram to view it full screen and zoom in. Every diagram also carries a full text description.'
}
const t = computed(() => (props.lang === 'en' ? en : zh))
const caption = computed(() => props.hint ?? t.value.overflow)

const frame = ref<HTMLElement | null>(null)
const overflowing = ref(false)
let observer: ResizeObserver | undefined

function measure() {
  const el = frame.value
  if (!el) return
  overflowing.value = el.scrollWidth > el.clientWidth + 1
}

// ---- full-screen viewer ----
const open = ref(false)
const zoom = ref(1)
const dialog = ref<HTMLElement | null>(null)
const closeButton = ref<HTMLButtonElement | null>(null)
let savedOverflow = ''
let savedPadding = ''

/** Full size when it fits the window; never below `minScale`, so labels stay legible. */
function defaultZoom() {
  if (typeof window === 'undefined') return 1
  const fit = (window.innerWidth - 64) / props.width
  return Math.min(1, Math.max(props.minScale, fit))
}

async function showViewer() {
  // A drag that selects text inside the frame also ends in a click; ignore it.
  if (typeof window !== 'undefined' && String(window.getSelection?.() ?? '').length > 0) return
  zoom.value = defaultZoom()
  open.value = true
  const root = document.documentElement
  const body = document.body
  savedOverflow = root.style.overflow
  savedPadding = body.style.paddingRight
  // Lock the page without the layout shift caused by the scrollbar disappearing.
  const scrollbar = window.innerWidth - root.clientWidth
  if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`
  root.style.overflow = 'hidden'
  await nextTick()
  closeButton.value?.focus()
}

function hideViewer() {
  open.value = false
  document.documentElement.style.overflow = savedOverflow
  document.body.style.paddingRight = savedPadding
  frame.value?.focus()
}

function zoomBy(factor: number) {
  zoom.value = Math.min(4, Math.max(0.2, zoom.value * factor))
}

function resetZoom() {
  zoom.value = defaultZoom()
}

function onDialogKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    event.preventDefault()
    hideViewer()
    return
  }
  if (event.key !== 'Tab') return
  // Keep focus inside the dialog while it is open.
  const focusable = dialog.value?.querySelectorAll<HTMLElement>('button:not([disabled])')
  if (!focusable?.length) return
  const first = focusable[0]
  const last = focusable[focusable.length - 1]
  const active = document.activeElement
  if (event.shiftKey && (active === first || !dialog.value?.contains(active))) {
    event.preventDefault()
    last.focus()
  } else if (!event.shiftKey && active === last) {
    event.preventDefault()
    first.focus()
  }
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
  // A route change while the viewer is open must not leave the page unscrollable.
  if (open.value) {
    document.documentElement.style.overflow = savedOverflow
    document.body.style.paddingRight = savedPadding
  }
})

const floor = computed(() => Math.round(props.width * props.minScale))
const renderedWidth = computed(() => Math.round(props.width * zoom.value))
</script>

<template>
  <figure class="dd">
    <div class="dd-stage">
      <div
        ref="frame"
        class="dd-frame"
        role="button"
        tabindex="0"
        :aria-label="t.open"
        @click="showViewer"
        @keydown.enter.prevent="showViewer"
        @keydown.space.prevent="showViewer"
      >
        <img
          class="dd-img"
          :src="props.src"
          :alt="props.alt"
          :style="{ '--dd-full': `${props.width}px`, '--dd-floor': `${floor}px` }"
          @load="measure"
        />
      </div>
      <span class="dd-pill" aria-hidden="true">{{ t.enlarge }}</span>
    </div>
    <figcaption class="dd-hint dd-hint--mobile">{{ t.mobile }}</figcaption>
    <figcaption v-if="overflowing" class="dd-hint dd-hint--desktop">{{ caption }}</figcaption>
  </figure>

  <Teleport to="body">
    <div
      v-if="open"
      ref="dialog"
      class="dd-viewer"
      role="dialog"
      aria-modal="true"
      :aria-label="t.dialog"
      @keydown="onDialogKeydown"
    >
      <div class="dd-bar">
        <span class="dd-zoom-label" aria-live="polite">{{ Math.round(zoom * 100) }}%</span>
        <button type="button" class="dd-btn" :aria-label="t.zoomOut" @click="zoomBy(1 / 1.25)">−</button>
        <button type="button" class="dd-btn" :aria-label="t.zoomIn" @click="zoomBy(1.25)">+</button>
        <button type="button" class="dd-btn dd-btn--text" @click="resetZoom">{{ t.reset }}</button>
        <button ref="closeButton" type="button" class="dd-btn dd-btn--text dd-btn--close" @click="hideViewer">
          {{ t.close }}
        </button>
      </div>
      <div class="dd-scroll" @click.self="hideViewer">
        <img class="dd-full" :src="props.src" :alt="props.alt" :style="{ width: `${renderedWidth}px` }" />
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.dd { margin: 1.75rem 0; }
.dd-stage { position: relative; }
.dd-frame {
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  border-radius: 8px;
  cursor: zoom-in;
  scrollbar-width: thin;
  scrollbar-color: var(--vp-c-divider) transparent;
}
.dd-frame:focus-visible { outline: 2px solid var(--vp-c-brand); outline-offset: 2px; }
.dd-img { display: block; width: 100%; max-width: var(--dd-full); height: auto; margin: 0 auto; }
@media (min-width: 768px) {
  .dd-img { min-width: var(--dd-floor); }
}
.dd-pill {
  position: absolute;
  top: 8px;
  right: 8px;
  padding: 2px 9px;
  border-radius: 999px;
  background: rgba(15, 23, 42, 0.82);
  color: #e2e8f0;
  font-size: 12px;
  line-height: 18px;
  pointer-events: none;
}
.dd-hint { margin: .5rem 0 0; font-size: .78rem; color: var(--vp-c-text-3); line-height: 1.6; }
.dd-hint--mobile { display: none; }
@media (max-width: 767.98px) {
  .dd-hint--mobile { display: block; }
  .dd-hint--desktop { display: none; }
}

/* Full-screen viewer. Dark in both themes: it frames the dark SVG. */
.dd-viewer {
  position: fixed;
  inset: 0;
  z-index: 200;
  display: flex;
  flex-direction: column;
  background: rgba(2, 6, 23, 0.96);
  color: #e2e8f0;
}
.dd-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  padding-top: max(8px, env(safe-area-inset-top));
  background: rgba(2, 6, 23, 0.92);
  border-bottom: 1px solid #334155;
}
.dd-zoom-label { min-width: 44px; text-align: center; font-size: 13px; font-variant-numeric: tabular-nums; color: #94a3b8; }
.dd-btn {
  min-width: 44px;
  height: 40px;
  padding: 0 10px;
  border: 1px solid #475569;
  border-radius: 8px;
  background: #0f172a;
  color: #e2e8f0;
  font-size: 18px;
  line-height: 1;
  cursor: pointer;
}
.dd-btn--text { font-size: 14px; }
.dd-btn:hover { background: #1e293b; }
.dd-btn:focus-visible { outline: 2px solid #7dd3fc; outline-offset: 2px; }
.dd-btn--close { margin-left: auto; }
.dd-scroll { flex: 1; overflow: auto; -webkit-overflow-scrolling: touch; display: flex; }
/* `max-width: none` overrides the base reset's `img, video { max-width: 100% }`,
   which would otherwise cap the viewer image at the viewport and defeat zoom. */
.dd-full { display: block; flex: none; max-width: none; margin: auto; height: auto; border-radius: 8px; }
</style>
