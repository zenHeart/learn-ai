<template>
  <div class="hub">
    <!-- Search + view toggle -->
    <div class="hub-bar">
      <div class="hub-search">
        <span class="hub-search-icon" aria-hidden="true">🔍</span>
        <input
          v-model="query"
          type="search"
          class="hub-search-input"
          :placeholder="labels.searchPlaceholder"
        />
        <button v-if="query" class="hub-search-clear" @click="query = ''">✕</button>
      </div>
      <div class="hub-views" role="tablist" :aria-label="labels.viewLabel">
        <button
          v-for="mode in ['grid', 'timeline']"
          :key="mode"
          :class="['hub-view-btn', { active: view === mode }]"
          role="tab"
          :aria-selected="view === mode"
          @click="view = mode"
        >
          <span aria-hidden="true">{{ mode === 'grid' ? '▦' : '◷' }}</span>
          <span class="hub-view-name">{{ labels.views[mode] }}</span>
          <span class="hub-view-count">{{ mode === 'grid' ? total : total }}</span>
        </button>
      </div>
    </div>

    <!-- Category filters -->
    <div class="hub-chips">
      <button
        :class="['hub-chip', { active: activeCategory === 'all' }]"
        @click="activeCategory = 'all'"
      >
        <span aria-hidden="true">🌐</span>
        {{ labels.all }}
        <span class="hub-chip-count">{{ total }}</span>
      </button>
      <button
        v-for="cat in categories"
        :key="cat.id"
        :class="['hub-chip', { active: activeCategory === cat.id }]"
        @click="activeCategory = cat.id"
      >
        <span aria-hidden="true">{{ cat.icon }}</span>
        {{ cat.name }}
        <span class="hub-chip-count">{{ cat.count }}</span>
      </button>
    </div>

    <!-- Secondary filters: region, doc coverage, vendor -->
    <div class="hub-filters">
      <div class="hub-filter-group">
        <button
          v-for="opt in regionOptions"
          :key="opt.id"
          :class="['hub-mini', { active: region === opt.id }]"
          @click="region = opt.id"
        >
          {{ opt.name }}
        </button>
      </div>
      <div class="hub-filter-group">
        <button
          :class="['hub-mini', { active: docOnly }]"
          @click="docOnly = !docOnly"
        >
          {{ labels.docOnly }}
        </button>
      </div>
      <div v-if="vendors.length" class="hub-vendors">
        <button
          :class="['hub-mini', { active: activeVendor === 'all' }]"
          @click="activeVendor = 'all'"
        >
          {{ labels.allVendors }}
        </button>
        <button
          v-for="vendor in vendors"
          :key="vendor.id"
          :class="['hub-mini', { active: activeVendor === vendor.id }]"
          @click="activeVendor = vendor.id"
        >
          {{ vendor.name }}
          <span class="hub-mini-count">{{ vendor.count }}</span>
        </button>
      </div>
    </div>

    <p class="hub-result-line">
      {{ filtered.length }} / {{ total }}
    </p>

    <!-- Grid view -->
    <div v-if="view === 'grid'" class="hub-grid-view">
      <template v-if="byCategory.length">
        <section v-for="group in byCategory" :key="group.id" class="hub-group">
          <h2 class="hub-group-title">
            <span class="hub-group-icon" aria-hidden="true">{{ group.icon }}</span>
            {{ group.name }}
            <span class="hub-group-count">{{ group.items.length }}</span>
          </h2>
          <div class="hub-grid">
            <ProductEntry
              v-for="product in group.items"
              :key="product.id"
              :product="product"
              :is-zh="isZh"
              :labels="labels"
            />
          </div>
        </section>
      </template>
      <EmptyState v-else :labels="labels" @reset="reset" />
    </div>

    <!-- Timeline view -->
    <div v-else class="hub-timeline-view">
      <ProductTimeline
        v-if="filtered.length"
        :products="filtered"
        :is-zh="isZh"
        :labels="labels"
      />
      <EmptyState v-else :labels="labels" @reset="reset" />
    </div>
  </div>
</template>

<script setup>
  import { ref, computed } from 'vue'
  import ProductEntry from './ProductEntry.vue'
  import ProductTimeline from './ProductTimeline.vue'
  import EmptyState from './ProductHubEmpty.vue'

  const props = defineProps({
    products: { type: Array, required: true },
    isZh: { type: Boolean, default: false },
    labels: { type: Object, required: true },
  })

  const query = ref('')
  const view = ref('timeline')
  const activeCategory = ref('all')
  const activeVendor = ref('all')
  const region = ref('all')
  const docOnly = ref(false)

  const total = computed(() => props.products.length)

  const categories = computed(() =>
    Object.entries(props.labels.categories)
      .map(([id, name]) => {
        const count = props.products.filter((p) => p.category === id).length
        return { id, name, count, icon: props.labels.categoryIcons[id] || '◆' }
      })
      .filter((c) => c.count > 0)
      .sort((a, b) => b.count - a.count)
  )

  const regionOptions = computed(() => [
    { id: 'all', name: props.labels.allRegions },
    { id: 'intl', name: props.labels.regionIntl },
    { id: 'cn', name: props.labels.regionCn },
  ])

  // Vendor counts respect the other active filters, so the sidebar never
  // offers a combination that yields zero rows.
  const vendors = computed(() => {
    const pool = props.products.filter(
      (p) => activeCategory.value === 'all' || p.category === activeCategory.value
    )
    const counts = new Map()
    for (const p of pool) {
      const key = p.vendor
      counts.set(key, (counts.get(key) || 0) + 1)
    }
    return [...counts.entries()]
      .map(([id, count]) => ({ id, name: id, count }))
      .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
      .slice(0, 28)
  })

  const docRoute = (p) => (props.isZh ? p.docs?.zh : p.docs?.en)

  const filtered = computed(() => {
    const q = query.value.toLowerCase().trim()
    return props.products.filter((p) => {
      if (activeCategory.value !== 'all' && p.category !== activeCategory.value)
        return false
      if (activeVendor.value !== 'all' && p.vendor !== activeVendor.value) return false
      if (region.value !== 'all' && p.region !== region.value) return false
      if (docOnly.value && !docRoute(p)) return false
      if (!q) return true
      const haystack = [
        p.name,
        p.nameZh,
        p.vendor,
        p.vendorZh,
        p.desc,
        p.descZh,
        p.category,
        ...(p.tags || []),
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
      return haystack.includes(q)
    })
  })

  const byCategory = computed(() =>
    categories.value
      .map((cat) => ({
        ...cat,
        items: filtered.value
          .filter((p) => p.category === cat.id)
          .sort((a, b) => (a.released < b.released ? 1 : -1)),
      }))
      .filter((g) => g.items.length)
  )

  const reset = () => {
    query.value = ''
    activeCategory.value = 'all'
    activeVendor.value = 'all'
    region.value = 'all'
    docOnly.value = false
  }
</script>

<style scoped>
  .hub {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
  }

  .hub-bar {
    display: flex;
    align-items: center;
    gap: 16px;
    flex-wrap: wrap;
    margin-bottom: 24px;
  }

  .hub-search {
    position: relative;
    flex: 1 1 320px;
    min-width: 240px;
  }

  .hub-search-icon {
    position: absolute;
    left: 18px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 16px;
    pointer-events: none;
    opacity: 0.6;
  }

  .hub-search-input {
    width: 100%;
    padding: 13px 44px;
    font-size: 15px;
    border: 2px solid var(--vp-c-divider);
    border-radius: 40px;
    background: var(--vp-c-bg);
    color: var(--vp-c-text-1);
    outline: none;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
  }

  .hub-search-input:focus {
    border-color: var(--vp-c-brand);
    box-shadow: 0 0 0 4px var(--vp-c-brand-soft);
  }

  .hub-search-clear {
    position: absolute;
    right: 14px;
    top: 50%;
    transform: translateY(-50%);
    width: 22px;
    height: 22px;
    border: none;
    border-radius: 50%;
    background: var(--vp-c-bg-soft);
    color: var(--vp-c-text-2);
    font-size: 11px;
    cursor: pointer;
  }

  .hub-views {
    display: flex;
    gap: 4px;
    padding: 4px;
    background: var(--vp-c-bg-soft);
    border-radius: 30px;
  }

  .hub-view-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 8px 16px;
    border: none;
    border-radius: 24px;
    background: transparent;
    color: var(--vp-c-text-2);
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .hub-view-btn.active {
    background: var(--vp-c-brand);
    color: white;
  }

  .hub-view-count {
    font-size: 11px;
    opacity: 0.7;
  }

  .hub-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 16px;
  }

  .hub-chip {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 7px 15px;
    border: 1px solid var(--vp-c-divider);
    border-radius: 24px;
    background: var(--vp-c-bg);
    color: var(--vp-c-text-2);
    font-size: 13.5px;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .hub-chip:hover {
    border-color: var(--vp-c-brand);
    color: var(--vp-c-brand);
  }

  .hub-chip.active {
    background: var(--vp-c-brand);
    border-color: var(--vp-c-brand);
    color: white;
  }

  .hub-chip-count {
    font-size: 11px;
    padding: 1px 7px;
    border-radius: 10px;
    background: var(--vp-c-bg-soft);
    color: var(--vp-c-text-3);
  }

  .hub-chip.active .hub-chip-count {
    background: rgba(255, 255, 255, 0.22);
    color: white;
  }

  .hub-filters {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 14px 16px;
    margin-bottom: 18px;
    background: var(--vp-c-bg-soft);
    border-radius: 12px;
  }

  .hub-filter-group,
  .hub-vendors {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    align-items: center;
  }

  .hub-mini {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 4px 11px;
    border: 1px solid transparent;
    border-radius: 16px;
    background: var(--vp-c-bg);
    color: var(--vp-c-text-3);
    font-size: 12.5px;
    cursor: pointer;
    transition: all 0.15s ease;
  }

  .hub-mini:hover {
    color: var(--vp-c-brand);
  }

  .hub-mini.active {
    border-color: var(--vp-c-brand);
    color: var(--vp-c-brand);
    font-weight: 600;
  }

  .hub-mini-count {
    font-size: 10.5px;
    opacity: 0.7;
  }

  .hub-result-line {
    margin: 0 0 20px;
    font-size: 12.5px;
    color: var(--vp-c-text-3);
    font-variant-numeric: tabular-nums;
  }

  .hub-group {
    margin-bottom: 44px;
  }

  .hub-group-title {
    display: flex;
    align-items: center;
    gap: 9px;
    margin: 0 0 16px;
    font-size: 21px;
    font-weight: 600;
    color: var(--vp-c-text-1);
  }

  .hub-group-icon {
    font-size: 23px;
  }

  .hub-group-count {
    font-size: 12.5px;
    font-weight: 400;
    padding: 2px 10px;
    border-radius: 14px;
    background: var(--vp-c-bg-soft);
    color: var(--vp-c-text-3);
  }

  .hub-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(310px, 1fr));
    gap: 14px;
  }

  @media (max-width: 768px) {
    .hub {
      padding: 0 16px;
    }

    .hub-bar {
      gap: 12px;
    }

    .hub-view-name {
      display: none;
    }

    .hub-grid {
      grid-template-columns: 1fr;
      gap: 12px;
    }

    .hub-filters {
      padding: 12px;
    }
  }
</style>
