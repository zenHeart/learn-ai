<template>
  <div :class="['entry', `entry--${variant}`, { 'entry--no-doc': !docHref }]">
    <div class="entry-head">
      <span class="entry-icon" aria-hidden="true">{{ product.glyph || '◆' }}</span>
      <div class="entry-heading">
        <!-- Primary affordance: the product's own homepage (the default jump). -->
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
        <span :class="['entry-region', `entry-region--${product.region}`]">
          {{ regionLabel }}
        </span>
      </span>
    </div>

    <p class="entry-desc">{{ desc }}</p>

    <div class="entry-foot">
      <span :class="['entry-cat', `entry-cat--${product.category}`]">
        {{ categoryLabel }}
      </span>
      <ul v-if="usefulTags.length" class="entry-tags">
        <li v-for="tag in usefulTags" :key="tag" class="entry-tag">{{ tag }}</li>
      </ul>
    </div>

    <!-- Secondary affordance: our own handbook, only when one exists. -->
    <a v-if="docHref" class="entry-doc" :href="docHref">
      <span aria-hidden="true">📖</span>
      {{ labels.doc }}
    </a>
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
  })

  const label = computed(() =>
    props.isZh ? props.product.nameZh || props.product.name : props.product.name
  )
  const desc = computed(() =>
    props.isZh ? props.product.descZh || props.product.desc : props.product.desc
  )
  const vendorLabel = computed(() =>
    props.isZh ? props.product.vendorZh || props.product.vendor : props.product.vendor
  )
  const categoryLabel = computed(
    () => props.category?.name || props.product.category
  )
  // A renamed / merged / discontinued product is history worth showing, not
  // a dead row — the timeline only tells the evolution story if it is visible.
  const statusLabel = computed(() => {
    const map = props.labels.statuses || {}
    return map[props.product.status] || props.product.status
  })
  const regionLabel = computed(() =>
    props.product.region === 'cn'
      ? props.labels.regionCn
      : props.labels.regionIntl
  )
  // Month precision reads better than a bare day when we only know the month.
  const dateLabel = computed(() => {
    const raw = props.product.released || ''
    return /^\d{4}-\d{2}$/.test(raw) ? raw : raw.slice(0, 10)
  })
  const docHref = computed(() => {
    const handbook = props.product.handbook
    if (handbook?.status !== 'written') return null
    const route = props.isZh ? handbook.route?.zh : handbook.route?.en
    return route ? withBase(route) : null
  })
  // A tag that just restates the category chip above it is noise.
  const usefulTags = computed(() =>
    (props.product.tags || []).filter((t) => t !== props.product.category)
  )
</script>

<style scoped>
  .entry {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 16px 18px;
    background: var(--vp-c-bg-soft);
    border: 1px solid var(--vp-c-divider);
    border-radius: 12px;
    transition: border-color 0.2s ease, transform 0.2s ease;
  }

  .entry:hover {
    border-color: var(--vp-c-brand);
    transform: translateY(-2px);
  }

  .entry-head {
    display: flex;
    align-items: flex-start;
    gap: 12px;
  }

  .entry-icon {
    flex-shrink: 0;
    width: 38px;
    height: 38px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 17px;
    font-weight: 600;
    color: var(--vp-c-brand);
    background: var(--vp-c-bg);
    border: 1px solid var(--vp-c-divider);
    border-radius: 9px;
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

  .entry-badges {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 4px;
    flex-shrink: 0;
  }

  .entry-status {
    padding: 2px 8px;
    font-size: 11px;
    border-radius: 10px;
    white-space: nowrap;
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

  .entry-region {
    flex-shrink: 0;
    padding: 2px 8px;
    font-size: 11px;
    border-radius: 10px;
    background: var(--vp-c-default-soft);
    color: var(--vp-c-text-3);
  }

  .entry-desc {
    margin: 0;
    font-size: 13.5px;
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

  .entry-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .entry-tag {
    padding: 2px 7px;
    font-size: 11px;
    border-radius: 8px;
    background: var(--vp-c-default-soft);
    color: var(--vp-c-text-3);
  }

  .entry-doc {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    align-self: flex-start;
    margin-top: 2px;
    padding: 5px 12px;
    font-size: 12.5px;
    border-radius: 20px;
    border: 1px dashed var(--vp-c-brand);
    color: var(--vp-c-brand);
    text-decoration: none;
  }

  .entry-doc:hover {
    background: var(--vp-c-brand);
    border-style: solid;
    color: white;
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
    transform: none;
    border-color: var(--vp-c-divider);
  }

  .entry--row .entry-icon {
    width: 32px;
    height: 32px;
    font-size: 15px;
  }

  .entry--row .entry-desc {
    font-size: 13px;
  }

  @media (max-width: 768px) {
    .entry {
      padding: 14px;
    }

    .entry--row {
      padding: 12px 0;
    }

    .entry-desc {
      font-size: 13px;
    }
  }
</style>
