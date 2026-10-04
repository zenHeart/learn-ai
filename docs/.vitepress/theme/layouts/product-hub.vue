<template>
  <div class="hub-layout">
    <header class="hub-hero">
      <div class="hub-hero-inner">
        <h1 class="hub-hero-title">
          <span class="hub-hero-icon" aria-hidden="true">🛰️</span>
          {{ frontmatter.title || labels.title }}
        </h1>
        <p class="hub-hero-desc">{{ frontmatter.description || labels.description }}</p>
        <dl class="hub-stats">
          <div class="hub-stat">
            <dt>{{ labels.statProducts }}</dt>
            <dd>{{ total }}</dd>
          </div>
          <div class="hub-stat">
            <dt>{{ labels.statVendors }}</dt>
            <dd>{{ vendorCount }}</dd>
          </div>
          <div class="hub-stat">
            <dt>{{ labels.statYears }}</dt>
            <dd>{{ yearSpan }}</dd>
          </div>
          <div class="hub-stat">
            <dt>{{ labels.statGuides }}</dt>
            <dd>{{ guideCount }}</dd>
          </div>
        </dl>
        <p class="hub-hero-hint">{{ labels.hint }}</p>
      </div>
    </header>

    <main class="hub-main">
      <ProductHub :products="products" :is-zh="isZh" :labels="labels" />
    </main>

    <footer class="hub-footer">
      <p>
        <a :href="isZh ? '/zh/paths/' : '/paths/'">{{ isZh ? '按路径学' : 'Learn by path' }}</a>
        ·
        <a :href="isZh ? '/zh/ai-tools/' : '/ai-tools/'">
          {{ isZh ? '外部工具目录' : 'External tool directory' }}
        </a>
      </p>
    </footer>
  </div>
</template>

<script setup>
  import { computed } from 'vue'
  import { useData } from 'vitepress'
  import ProductHub from '../components/ProductHub.vue'
  import { productHub } from '../data/product-hub.js'

  const { frontmatter, lang } = useData()
  const isZh = computed(() => String(lang.value || '').startsWith('zh'))
  const labels = computed(() => (isZh.value ? productHub.zh : productHub.en))
  const products = computed(() => productHub.products)

  const total = computed(() => products.value.length)
  const vendorCount = computed(
    () => new Set(products.value.map((p) => p.vendor)).size
  )
  const guideCount = computed(
    () => products.value.filter((p) => p.docs?.en || p.docs?.zh).length
  )
  const yearSpan = computed(() => {
    const years = products.value
      .map((p) => Number((p.released || '').slice(0, 4)))
      .filter(Boolean)
    if (!years.length) return '—'
    return `${Math.min(...years)}–${Math.max(...years)}`
  })
</script>

<style scoped>
  .hub-layout {
    min-height: 100vh;
    background: var(--vp-c-bg);
  }

  .hub-hero {
    padding: 56px 24px 36px;
    text-align: center;
    background: linear-gradient(
      180deg,
      var(--vp-c-bg-soft) 0%,
      var(--vp-c-bg) 100%
    );
    border-bottom: 1px solid var(--vp-c-divider);
  }

  .hub-hero-inner {
    max-width: 780px;
    margin: 0 auto;
  }

  .hub-hero-title {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    margin: 0 0 14px;
    font-size: 2.4rem;
    font-weight: 700;
    line-height: 1.2;
    color: var(--vp-c-text-1);
  }

  .hub-hero-icon {
    font-size: 2.6rem;
  }

  .hub-hero-desc {
    margin: 0 auto 26px;
    max-width: 640px;
    font-size: 1.05rem;
    line-height: 1.6;
    color: var(--vp-c-text-2);
  }

  .hub-stats {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 12px;
    margin: 0 0 18px;
  }

  .hub-stat {
    min-width: 108px;
    padding: 12px 18px;
    background: var(--vp-c-bg);
    border: 1px solid var(--vp-c-divider);
    border-radius: 12px;
  }

  .hub-stat dt {
    font-size: 11.5px;
    color: var(--vp-c-text-3);
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .hub-stat dd {
    margin: 3px 0 0;
    font-size: 1.35rem;
    font-weight: 700;
    color: var(--vp-c-text-1);
    font-variant-numeric: tabular-nums;
  }

  .hub-hero-hint {
    margin: 0;
    font-size: 13.5px;
    color: var(--vp-c-text-3);
  }

  .hub-main {
    padding: 28px 0 64px;
  }

  .hub-footer {
    text-align: center;
    padding: 34px 24px;
    border-top: 1px solid var(--vp-c-divider);
    color: var(--vp-c-text-2);
    font-size: 14px;
  }

  .hub-footer a {
    color: var(--vp-c-brand);
    text-decoration: none;
  }

  .hub-footer a:hover {
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    .hub-hero {
      padding: 36px 16px 26px;
    }

    .hub-hero-title {
      font-size: 1.7rem;
    }

    .hub-hero-icon {
      font-size: 1.9rem;
    }

    .hub-hero-desc {
      font-size: 0.98rem;
    }

    .hub-stat {
      min-width: 88px;
      padding: 9px 12px;
    }

    .hub-stat dd {
      font-size: 1.1rem;
    }
  }
</style>
