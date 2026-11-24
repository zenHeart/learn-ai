<template>
  <div class="timeline">
    <section v-for="group in groups" :key="group.year" class="tl-year">
      <h2 class="tl-year-label">
        <span class="tl-year-text">{{ group.year }}</span>
        <span class="tl-year-rule" aria-hidden="true"></span>
        <span class="tl-year-count">{{ group.items.length }}</span>
      </h2>

      <div class="tl-items">
        <div v-for="product in group.items" :key="product.id" class="tl-item">
          <time
            class="tl-date"
            :class="{ 'tl-date--coarse': isCoarse(product) }"
            :datetime="product.released"
            :title="dateTitle(product)"
          >
            {{ monthLabel(product) }}
          </time>
          <div class="tl-marker" aria-hidden="true">
            <span class="tl-dot"></span>
          </div>
          <div class="tl-body">
            <ProductEntry
              :product="product"
              variant="row"
              :is-zh="isZh"
              :labels="labels"
              :category="categoryOf(product.category)"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
  import { computed } from 'vue'
  import ProductEntry from './ProductEntry.vue'

  const props = defineProps({
    products: { type: Array, required: true },
    categories: { type: Array, default: () => [] },
    isZh: { type: Boolean, default: false },
    labels: { type: Object, required: true },
  })

  const categoryIndex = computed(() => {
    const m = new Map()
    for (const c of props.categories) m.set(c.id, c)
    return m
  })
  const categoryOf = (id) => categoryIndex.value.get(id) ?? null

  const isCoarse = (product) => !!product.datePrecision && product.datePrecision !== 'day'
  // A date stored as "2026-06-01" with month precision only says "some day in
  // June". The list is newest first, so sorted as June 1st it would come
  // after every precise June date yet still read as the earliest June launch.
  // A coarse date goes to the end of its month instead ("00" is below any
  // real day), where it claims no place among the dated ones.
  const sortKey = (product) => {
    const raw = String(product.released || '')
    if (product.datePrecision === 'year') return `${raw.slice(0, 4)}-00-00`
    if (product.datePrecision === 'month') return `${raw.slice(0, 7)}-00`
    return raw
  }

  // Newest first, so the hub reads as "what just shipped → what came before".
  const groups = computed(() => {
    const sorted = [...props.products].sort((a, b) => {
      const ka = sortKey(a)
      const kb = sortKey(b)
      if (ka !== kb) return ka < kb ? 1 : -1
      return (a.name || '').localeCompare(b.name || '')
    })
    const byYear = new Map()
    for (const product of sorted) {
      const year = (product.released || '').slice(0, 4) || '????'
      if (!byYear.has(year)) byYear.set(year, [])
      byYear.get(year).push(product)
    }
    return [...byYear.entries()]
      .sort((a, b) => (a[0] < b[0] ? 1 : -1))
      .map(([year, items]) => ({ year, items }))
  })

  // The year is the section heading, so a day-precise date shows month and
  // day. A coarse date is stored on the first of the month or year as a
  // placeholder, and printing that placeholder read as "June 1st" for a
  // product only known to have shipped in June. So the label stops at the
  // precision we have, and "≈" says so.
  const MONTHS_EN = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const monthLabel = (product) => {
    const raw = String(product.released || '')
    if (product.datePrecision === 'year') return `≈ ${raw.slice(0, 4)}`
    if (product.datePrecision === 'month') {
      const m = Number(raw.slice(5, 7))
      return props.isZh ? `≈ ${m} 月` : `≈ ${MONTHS_EN[m - 1] ?? raw.slice(5, 7)}`
    }
    return raw.slice(5, 10) || '—'
  }
  const dateTitle = (product) => {
    const raw = String(product.released || '')
    if (product.datePrecision === 'year') return props.isZh ? `${raw.slice(0, 4)} 年，仅精确到年` : `${raw.slice(0, 4)}, year only`
    if (product.datePrecision === 'month') return props.isZh ? `${raw.slice(0, 4)} 年，仅精确到月` : `${raw.slice(0, 7)}, month only`
    return raw
  }
</script>

<style scoped>
  .timeline {
    max-width: 900px;
    margin: 0 auto;
  }

  .tl-year {
    margin-bottom: 40px;
  }

  .tl-year-label {
    display: flex;
    align-items: center;
    gap: 14px;
    margin: 0 0 8px;
  }

  .tl-year-text {
    font-size: 26px;
    font-weight: 700;
    color: var(--vp-c-text-1);
    font-variant-numeric: tabular-nums;
    letter-spacing: 0.02em;
  }

  .tl-year-rule {
    flex: 1;
    height: 1px;
    background: var(--vp-c-divider);
  }

  .tl-year-count {
    font-size: 12px;
    padding: 2px 10px;
    border-radius: 12px;
    background: var(--vp-c-bg-soft);
    color: var(--vp-c-text-3);
  }

  .tl-items {
    position: relative;
  }

  /* Rail geometry is shared with the row grid: 56px date + 24px marker
     column, so the line lands exactly on every dot's centre. */
  .tl-items::before {
    content: '';
    position: absolute;
    left: 68px;
    top: 6px;
    bottom: 6px;
    width: 1px;
    background: var(--vp-c-divider);
  }

  .tl-item {
    position: relative;
    display: grid;
    grid-template-columns: 56px 24px 1fr;
    align-items: start;
  }

  .tl-date {
    padding-top: 19px;
    text-align: right;
    font-size: 12.5px;
    color: var(--vp-c-text-3);
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
  }

  /* "≈ 2014" is wider than "06-01"; a hair smaller keeps it in the column. */
  .tl-date--coarse {
    font-size: 12px;
  }

  .tl-marker {
    display: flex;
    justify-content: center;
    padding-top: 22px;
  }

  .tl-dot {
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background: var(--vp-c-bg);
    border: 2px solid var(--vp-c-brand);
    z-index: 1;
  }

  .tl-body {
    min-width: 0;
  }

  @media (max-width: 768px) {
    .tl-items::before {
      /* The dot is a 9px border-box pinned at left: 0, so its centre is 4.5px. */
      left: 4.5px;
      top: 4px;
      bottom: 4px;
    }

    .tl-item {
      grid-template-columns: 1fr;
      padding-left: 26px;
    }

    .tl-marker {
      position: absolute;
      left: 0;
      top: 0;
      padding-top: 18px;
    }

    .tl-date {
      padding-top: 0;
      text-align: left;
      margin-bottom: 2px;
    }

    .tl-year-text {
      font-size: 21px;
    }
  }
</style>
