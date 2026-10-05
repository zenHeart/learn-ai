<template>
  <div :class="['entry', `entry--${variant}`, { 'entry--no-doc': !docHref }]">
    <div class="entry-head">
      <span class="entry-icon" aria-hidden="true">
        <img
          v-if="product.logo"
          class="entry-logo"
          :src="product.logo"
          :alt="''"
          loading="lazy"
          decoding="async"
        />
        <template v-else>{{ product.glyph || '◆' }}</template>
      </span>
      <div class="entry-heading">
        <a
          class="entry-name"
          :href="product.homepage"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ label }}
          <span class="entry-external" aria-hidden="true">↗</span>
        </a>
        <div class="entry-meta">
          <span class="entry-vendor">{{ vendorLabel }}</span>
          <span class="entry-dot" aria-hidden="true">·</span>
          <span class="entry-date">
            <time :datetime="product.released">{{ dateLabel }}</time>
            <span v-if="product.datePrecision === 'month'" class="entry-precision">
              ({{ isZh ? '约' : '~' }})
            </span>
          </span>
        </div>
      </div>
      <span class="entry-badges">
        <span
          v-if="product.status && product.status !== 'active'"
          :class="['entry-status', `entry-status--${product.status}`]"
        >
          {{ statusLabel }}
        </span>
        <span
          v-if="product.surface && product.surface !== 'standalone'"
          :class="['entry-surface', `entry-surface--${product.surface}`]"
        >
          {{ surfaceLabel }}
        </span>
        <span :class="['entry-region', `entry-region--${product.region}`]">
          {{ regionLabel }}
        </span>
      </span>
    </div>

    <!-- Lead with the problem, not the spec sheet. -->
    <p v-if="solves" class="entry-solves">{{ solves }}</p>
    <p v-if="bestFor" class="entry-when">{{ bestFor }}</p>

    <div class="entry-foot">
      <span :class="['entry-cat', `entry-cat--${product.category}`]">
        {{ categoryLabel }}
      </span>
      <span v-if="product.supersededBy" class="entry-since">
        {{ isZh ? '现为' : 'now' }}
        {{ successorName }}
      </span>
    </div>

    <details class="entry-more">
      <summary>{{ isZh ? '更多' : 'More' }}</summary>
      <dl class="entry-detail">
        <div class="entry-detail-row">
          <dt>{{ isZh ? '厂商' : 'Vendor' }}</dt>
          <dd>{{ vendorLabel }}</dd>
        </div>
        <div class="entry-detail-row">
          <dt>{{ isZh ? '首次发布' : 'Released' }}</dt>
          <dd>{{ dateLabel }}{{ product.datePrecision === 'month' ? (isZh ? '（仅精确到月）' : ' (month only)') : '' }}</dd>
        </div>
        <div v-if="product.tags?.length" class="entry-detail-row">
          <dt>{{ isZh ? '能力标签' : 'Capabilities' }}</dt>
          <dd>{{ product.tags.join(' · ') }}</dd>
        </div>
        <div class="entry-detail-row">
          <dt>{{ isZh ? '入口' : 'Where' }}</dt>
          <dd>{{ surfaceLabel }}</dd>
        </div>
        <div v-if="product.notes" class="entry-detail-row">
          <dt>{{ isZh ? '备注' : 'Notes' }}</dt>
          <dd>{{ product.notes }}</dd>
        </div>
      </dl>
      <div class="entry-links">
        <a :href="product.homepage" target="_blank" rel="noopener noreferrer">
          {{ isZh ? '官网 ↗' : 'Official site ↗' }}
        </a>
        <a v-if="docHref" :href="docHref">{{ labels.doc }}</a>
      </div>
    </details>
  </div>
</template>

<script setup>
  import { computed } from 'vue'
  import { withBase } from 'vitepress'

  const props = defineProps({
    product: { type: Object, required: true },
    variant: { type: String, default: 'card' },
    isZh: { type: Boolean, default: false },
    labels: { type: Object, required: true },
    category: { type: Object, default: null },
    successorName: { type: String, default: '' },
  })

  const pick = (zh, en) => (props.isZh ? zh || en : en || zh)
  const label = computed(() => pick(props.product.nameZh, props.product.name))
  const solves = computed(() => pick(props.product.solvesZh, props.product.solves))
  const bestFor = computed(() =>
    String(pick(props.product.bestForZh, props.product.bestFor) || '')
  )
  const vendorLabel = computed(() => pick(props.product.vendorZh, props.product.vendor))
  const categoryLabel = computed(() => {
    if (props.category) return pick(props.category.nameZh, props.category.name)
    return props.product.category
  })
  // A renamed / merged / discontinued product is history worth showing, not
  // a dead row — the timeline only tells the evolution story if it is visible.
  const statusLabel = computed(
    () => (props.labels.statuses || {})[props.product.status] || props.product.status
  )
  const surfaceLabel = computed(
    () => (props.labels.surfaces || {})[props.product.surface] || props.product.surface
  )
  const regionLabel = computed(
    () => (props.product.region === 'cn' ? props.labels.regionCn : props.labels.regionIntl)
  )
  // Month precision reads better than a bare day when we only know the month.
  const dateLabel = computed(() => String(props.product.released || '').slice(0, 10))
  const docHref = computed(() => {
    const handbook = props.product.handbook
    if (handbook?.status !== 'written') return null
    const route = props.isZh ? handbook.route?.zh : handbook.route?.en
    return route ? withBase(route) : null
  })
</script>

<style scoped>
  .entry {
    display: flex;
    flex-direction: column;
    gap: 9px;
    padding: 16px 18px;
    background: var(--vp-c-bg-soft);
    border: 1px solid var(--vp-c-divider);
    border-radius: 12px;
    transition: border-color 0.2s ease;
  }

  .entry:hover {
    border-color: var(--vp-c-brand);
  }

  .entry-head {
    display: flex;
    align-items: flex-start;
    gap: 12px;
  }

  .entry-icon {
    flex-shrink: 0;
    width: 34px;
    height: 34px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-weight: 600;
    color: var(--vp-c-brand);
    background: var(--vp-c-bg);
    border: 1px solid var(--vp-c-divider);
    border-radius: 9px;
    overflow: hidden;
  }

  /* Real marks sit on their own background: many vendor logos are white-on-
     transparent and would vanish on a light card. */
  .entry-logo {
    width: 100%;
    height: 100%;
    object-fit: contain;
    padding: 4px;
  }

  .entry-heading {
    flex: 1;
    min-width: 0;
  }

  .entry-name {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 16px;
    font-weight: 600;
    line-height: 1.35;
    color: var(--vp-c-text-1);
    text-decoration: none;
  }

  .entry-name:hover {
    color: var(--vp-c-brand);
  }

  .entry-external {
    font-size: 11px;
    color: var(--vp-c-text-3);
  }

  .entry-meta {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12.5px;
    color: var(--vp-c-text-3);
    margin-top: 2px;
  }

  .entry-date {
    font-variant-numeric: tabular-nums;
  }

  .entry-precision {
    font-size: 11px;
    opacity: 0.75;
  }

  .entry-badges {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 4px;
    flex-shrink: 0;
  }

  .entry-status,
  .entry-surface,
  .entry-region {
    padding: 2px 8px;
    font-size: 11px;
    border-radius: 10px;
    white-space: nowrap;
  }

  .entry-region {
    background: var(--vp-c-default-soft);
    color: var(--vp-c-text-3);
  }

  .entry-status--renamed {
    background: rgba(234, 88, 12, 0.12);
    color: #c2410c;
  }

  .entry-status--merged {
    background: rgba(124, 58, 237, 0.12);
    color: #6d28d9;
  }

  .entry-status--discontinued {
    background: rgba(100, 116, 139, 0.15);
    color: #64748b;
    text-decoration: line-through;
  }

  .entry-surface--in-product {
    background: rgba(37, 99, 235, 0.12);
    color: #1d4ed8;
  }

  .entry-surface--plugin,
  .entry-surface--extension {
    background: rgba(13, 148, 136, 0.12);
    color: #0f766e;
  }

  /* The problem statement is the reason this card exists; give it room. */
  .entry-solves {
    margin: 0;
    font-size: 14px;
    line-height: 1.6;
    color: var(--vp-c-text-1);
  }

  .entry-when {
    margin: 0;
    padding-left: 10px;
    border-left: 2px solid var(--vp-c-divider);
    font-size: 13px;
    line-height: 1.55;
    color: var(--vp-c-text-2);
  }

  .entry-foot {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 6px;
  }

  .entry-cat {
    padding: 2px 8px;
    font-size: 11px;
    border-radius: 8px;
    background: var(--vp-c-brand-soft);
    color: var(--vp-c-brand-dark, var(--vp-c-brand));
  }

  .entry-since {
    font-size: 11.5px;
    color: var(--vp-c-text-3);
  }

  .entry-more {
    margin-top: 2px;
    border-top: 1px dashed var(--vp-c-divider);
    padding-top: 8px;
  }

  .entry-more summary {
    cursor: pointer;
    font-size: 12.5px;
    color: var(--vp-c-text-3);
    list-style: none;
  }

  .entry-more summary::-webkit-details-marker {
    display: none;
  }

  .entry-more summary::before {
    content: '＋ ';
  }

  .entry-more[open] summary::before {
    content: '－ ';
  }

  .entry-more summary:hover {
    color: var(--vp-c-brand);
  }

  .entry-detail {
    margin: 8px 0 0;
    display: grid;
    gap: 5px;
  }

  .entry-detail-row {
    display: grid;
    grid-template-columns: 78px 1fr;
    gap: 8px;
    font-size: 12.5px;
  }

  .entry-detail-row dt {
    color: var(--vp-c-text-3);
  }

  .entry-detail-row dd {
    margin: 0;
    color: var(--vp-c-text-2);
    word-break: break-word;
  }

  .entry-links {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 10px;
  }

  .entry-links a {
    font-size: 12.5px;
    color: var(--vp-c-brand);
    text-decoration: none;
  }

  .entry-links a:hover {
    text-decoration: underline;
  }

  /* Timeline rows sit on a rail, so they read as a list rather than cards. */
  .entry--row {
    background: var(--vp-c-bg);
    border-radius: 0;
    border: none;
    border-bottom: 1px solid var(--vp-c-divider);
    padding: 14px 0;
  }

  .entry--row:hover {
    border-color: var(--vp-c-divider);
  }

  .entry--row .entry-icon {
    width: 28px;
    height: 28px;
    font-size: 14px;
  }

  .entry--row .entry-solves {
    font-size: 13.5px;
  }

  .entry--row .entry-when {
    font-size: 12.5px;
  }

  @media (max-width: 768px) {
    .entry {
      padding: 14px;
    }

    .entry--row {
      padding: 12px 0;
    }

    .entry-solves {
      font-size: 13.5px;
    }
  }
</style>
