<template>
  <div class="sel">
    <!-- Scenario picker -->
    <div v-if="!current" class="sel-intro">
      <p class="sel-intro-text">{{ labels.selectIntro }}</p>
    </div>

    <div class="sel-uses">
      <button
        :class="['sel-use', { active: activeUseCase === 'all' }]"
        @click="$emit('update:activeUseCase', 'all')"
      >
        <span aria-hidden="true">🧭</span>
        {{ labels.allUseCases }}
        <span class="sel-use-count">{{ useCases.length }}</span>
      </button>
      <button
        v-for="uc in useCases"
        :key="uc.id"
        :class="['sel-use', { active: activeUseCase === uc.id }]"
        @click="pickUseCase(uc.id)"
      >
        {{ isZh ? uc.titleZh : uc.title }}
        <span class="sel-use-count">{{ uc.productCount }}</span>
      </button>
    </div>

    <!-- No scenario chosen yet: show every scenario with its products, so the
         first paint is a problem-organised list rather than an empty picker. -->
    <div v-if="!current" class="sel-board">
      <section v-for="uc in useCases" :key="uc.id" class="sel-board-group">
        <header class="sel-board-head">
          <h2 class="sel-board-title">
            <button class="sel-board-link" @click="pickUseCase(uc.id)">
              {{ isZh ? uc.titleZh : uc.title }}
            </button>
            <span class="sel-board-count">{{ uc.productCount }}</span>
          </h2>
          <p class="sel-board-desc">{{ isZh ? uc.descriptionZh : uc.description }}</p>
        </header>
        <div class="sel-grid">
          <ProductEntry
            v-for="product in membersOf(uc)"
            :key="product.id"
            :product="product"
            :is-zh="isZh"
            :labels="labels"
            :category="categoryOf(product.category)"
            :successor-name="successorNameOf(product)"
          />
        </div>
      </section>
    </div>

    <!-- Scenario detail -->
    <template v-else>
      <header class="sel-head">
        <h2 class="sel-title">
          {{ isZh ? current.titleZh : current.title }}
          <span class="sel-title-count">{{ current.productCount }}</span>
        </h2>
        <p class="sel-desc">
          {{ isZh ? current.descriptionZh : current.description }}
        </p>
      </header>

      <div v-if="current.dimensions.length" class="sel-dims">
        <button
          :class="['sel-dim', { active: !activeDimension }]"
          @click="$emit('update:activeDimension', '')"
        >
          {{ labels.allDimensions }}
          <span class="sel-dim-count">{{ current.productCount }}</span>
        </button>
        <button
          v-for="d in current.dimensions"
          :key="d.id"
          :class="['sel-dim', { active: activeDimension === d.id }]"
          @click="$emit('update:activeDimension', activeDimension === d.id ? '' : d.id)"
        >
          <span class="sel-dim-weight" :data-weight="d.weight"
            >{{ '●'.repeat(d.weight) }}</span
          >
          {{ isZh ? d.labelZh : d.label }}
          <span class="sel-dim-count">{{ d.productCount }}</span>
        </button>
      </div>

      <div class="sel-grid">
        <ProductEntry
          v-for="product in selectedProducts"
          :key="product.id"
          :product="product"
          :is-zh="isZh"
          :labels="labels"
          :category="categoryOf(product.category)"
          :successor-name="product.successorName || ''"
        />
      </div>

      <p v-if="!selectedProducts.length" class="sel-empty">
        {{ labels.empty }}
      </p>
    </template>
  </div>
</template>

<script setup>
  import { computed } from 'vue'
  import ProductEntry from './ProductEntry.vue'

  const props = defineProps({
    useCases: { type: Array, required: true },
    products: { type: Array, required: true },
    categories: { type: Array, default: () => [] },
    activeUseCase: { type: String, default: 'all' },
    activeDimension: { type: String, default: '' },
    isZh: { type: Boolean, default: false },
    labels: { type: Object, required: true },
  })

  const emit = defineEmits(['update:activeUseCase', 'update:activeDimension'])

  const current = computed(
    () => props.useCases.find((u) => u.id === props.activeUseCase) ?? null
  )

  // Changing scenario invalidates the dimension: the old one belongs to a
  // different list and would silently show nothing.
  const pickUseCase = (id) => {
    emit('update:activeUseCase', id)
    emit('update:activeDimension', '')
  }

  const selectedProducts = computed(() => {
    if (!current.value) return []
    const dim = current.value.dimensions.find((d) => d.id === props.activeDimension)
    const ids = dim ? new Set(dim.productIds) : new Set(current.value.products)
    return props.products.filter((p) => ids.has(p.id))
  })

  // A scenario with 70 products would swamp the page before anyone clicks, so
  // the unselected state previews the most recent ones and links to the rest.
  const PREVIEW = 6
  const membersOf = (uc) => {
    const ids = new Set(uc.products)
    return props.products.filter((p) => ids.has(p.id)).slice(0, PREVIEW)
  }
  const successorNameOf = (product) => product.successorName || ''

  const categoryIndex = computed(() => {
    const m = new Map()
    for (const c of props.categories) m.set(c.id, c)
    return m
  })
  const categoryOf = (id) => categoryIndex.value.get(id) ?? null
</script>

<style scoped>
  .sel {
    max-width: 1200px;
    margin: 0 auto;
  }

  .sel-intro {
    margin-bottom: 16px;
  }

  .sel-intro-text {
    margin: 0;
    font-size: 14px;
    color: var(--vp-c-text-3);
  }

  .sel-uses {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 28px;
  }

  .sel-use {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 9px 16px;
    border: 1px solid var(--vp-c-divider);
    border-radius: 24px;
    background: var(--vp-c-bg);
    color: var(--vp-c-text-2);
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .sel-use:hover {
    border-color: var(--vp-c-brand);
    color: var(--vp-c-brand);
  }

  .sel-use.active {
    background: var(--vp-c-brand);
    border-color: var(--vp-c-brand);
    color: white;
  }

  .sel-use-count,
  .sel-dim-count {
    font-size: 11px;
    padding: 1px 7px;
    border-radius: 10px;
    background: var(--vp-c-bg-soft);
    color: var(--vp-c-text-3);
  }

  .sel-use.active .sel-use-count {
    background: rgba(255, 255, 255, 0.22);
    color: white;
  }

  .sel-head {
    margin-bottom: 18px;
  }

  .sel-title {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 0 0 8px;
    font-size: 24px;
    font-weight: 700;
    color: var(--vp-c-text-1);
  }

  .sel-title-count {
    font-size: 13px;
    font-weight: 400;
    padding: 3px 12px;
    border-radius: 14px;
    background: var(--vp-c-bg-soft);
    color: var(--vp-c-text-3);
  }

  .sel-desc {
    margin: 0;
    max-width: 720px;
    font-size: 14.5px;
    line-height: 1.65;
    color: var(--vp-c-text-2);
  }

  .sel-dims {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 22px;
    padding-bottom: 18px;
    border-bottom: 1px solid var(--vp-c-divider);
  }

  .sel-dim {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 13px;
    border: 1px solid var(--vp-c-divider);
    border-radius: 20px;
    background: var(--vp-c-bg-soft);
    color: var(--vp-c-text-2);
    font-size: 13px;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .sel-dim:hover {
    border-color: var(--vp-c-brand);
    color: var(--vp-c-brand);
  }

  .sel-dim.active {
    border-color: var(--vp-c-brand);
    background: var(--vp-c-brand-soft);
    color: var(--vp-c-brand);
    font-weight: 600;
  }

  .sel-dim-weight {
    font-size: 8px;
    letter-spacing: 1px;
    color: var(--vp-c-text-3);
  }

  .sel-board-group {
    margin-bottom: 40px;
  }

  .sel-board-head {
    margin-bottom: 14px;
  }

  .sel-board-title {
    display: flex;
    align-items: baseline;
    gap: 9px;
    margin: 0 0 5px;
  }

  .sel-board-link {
    padding: 0;
    border: none;
    background: none;
    font-size: 20px;
    font-weight: 700;
    color: var(--vp-c-text-1);
    cursor: pointer;
    text-align: left;
  }

  .sel-board-link:hover {
    color: var(--vp-c-brand);
  }

  .sel-board-count {
    font-size: 12.5px;
    padding: 2px 10px;
    border-radius: 13px;
    background: var(--vp-c-bg-soft);
    color: var(--vp-c-text-3);
  }

  .sel-board-desc {
    margin: 0;
    max-width: 760px;
    font-size: 13.5px;
    line-height: 1.6;
    color: var(--vp-c-text-2);
  }

  .sel-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(310px, 1fr));
    gap: 14px;
  }

  .sel-empty {
    margin: 40px 0;
    text-align: center;
    color: var(--vp-c-text-2);
  }

  @media (max-width: 768px) {
    .sel-board-group {
    margin-bottom: 40px;
  }

  .sel-board-head {
    margin-bottom: 14px;
  }

  .sel-board-title {
    display: flex;
    align-items: baseline;
    gap: 9px;
    margin: 0 0 5px;
  }

  .sel-board-link {
    padding: 0;
    border: none;
    background: none;
    font-size: 20px;
    font-weight: 700;
    color: var(--vp-c-text-1);
    cursor: pointer;
    text-align: left;
  }

  .sel-board-link:hover {
    color: var(--vp-c-brand);
  }

  .sel-board-count {
    font-size: 12.5px;
    padding: 2px 10px;
    border-radius: 13px;
    background: var(--vp-c-bg-soft);
    color: var(--vp-c-text-3);
  }

  .sel-board-desc {
    margin: 0;
    max-width: 760px;
    font-size: 13.5px;
    line-height: 1.6;
    color: var(--vp-c-text-2);
  }

  .sel-grid {
      grid-template-columns: 1fr;
      gap: 12px;
    }

    .sel-title {
      font-size: 20px;
    }
  }
</style>
