<script setup>
import { computed } from 'vue'
import { useData, useRoute, withBase } from 'vitepress'
import { data as catalog } from '../data/catalog.data.js'

const props = defineProps({
  domain: { type: String, default: undefined },
  tag: { type: String, default: undefined },
  homesOnly: { type: Boolean, default: false }
})

const { frontmatter } = useData()
const route = useRoute()

function normalizeUrl(url) {
  const trimmed = String(url || '')
    .replace(/\.html$/, '')
    .replace(/\/index$/, '/')
    .replace(/\/$/, '')
  return trimmed || '/'
}

function isDomainHome(url, domainName) {
  const parts = normalizeUrl(url).split('/').filter(Boolean)
  const offset = parts[0] === 'zh' ? 1 : 0
  const folder = {
    product: 'products',
    path: 'paths',
    tech: 'tech',
    practice: 'practice',
    recipe: 'cookbook',
    project: 'projects',
    deploy: 'deployment'
  }[domainName]
  if (!folder) return parts.length === offset + 1
  return parts[offset] === folder && parts.length === offset + 2
}

const items = computed(() => {
  const domain = props.domain ?? frontmatter.value.domain ?? ''
  const tag = props.tag ?? ''
  const here = normalizeUrl(route.path)

  const zhHere = here === '/zh' || here.startsWith('/zh/')

  return catalog.filter((page) => {
    if (!page.listed) return false
    if (normalizeUrl(page.url) === here) return false
    const pageZh = normalizeUrl(page.url).startsWith('/zh/')
    if (zhHere !== pageZh) return false
    if (domain && page.domain !== domain) return false
    if (tag && !(page.tags || []).includes(tag)) return false
    if (props.homesOnly && !isDomainHome(page.url, domain || page.domain)) return false
    return true
  })
})
</script>

<template>
  <ul v-if="items.length" class="catalog-list">
    <li v-for="page in items" :key="page.url" class="catalog-item">
      <a class="catalog-link" :href="withBase(page.url)">{{ page.title || page.url }}</a>
      <span v-if="page.tags.length" class="catalog-tags">
        {{ page.tags.join(', ') }}
      </span>
      <p v-if="page.description" class="catalog-desc">{{ page.description }}</p>
    </li>
  </ul>
  <p v-else class="catalog-empty">这一组还没有打 domain 的页面。</p>
</template>

<style scoped>
.catalog-list {
  list-style: none;
  padding: 0;
}

.catalog-item {
  margin: 0.85rem 0;
}

.catalog-link {
  font-weight: 600;
}

.catalog-tags {
  margin-left: 0.5rem;
  font-size: 0.8em;
  opacity: 0.65;
}

.catalog-desc {
  margin: 0.2rem 0 0;
  font-size: 0.9em;
  opacity: 0.8;
}

.catalog-empty {
  opacity: 0.7;
}
</style>
