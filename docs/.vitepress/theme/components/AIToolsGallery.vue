<template>
  <div class="ai-tools-gallery">
    <!-- 搜索栏 -->
    <div class="search-section">
      <div class="search-wrapper">
        <span class="search-icon">🔍</span>
        <input
          v-model="searchQuery"
          type="text"
          :placeholder="placeholder"
          class="search-input"
        />
        <button
          v-if="searchQuery"
          class="search-clear"
          @click="searchQuery = ''"
        >
          ✕
        </button>
      </div>
    </div>

    <!-- 分类标签筛选 -->
    <div class="category-tabs">
      <button
        v-for="cat in allCategories"
        :key="cat.id"
        :class="['category-tab', { active: activeCategory === cat.id }]"
        @click="activeCategory = cat.id"
      >
        <span class="tab-icon">{{ cat.icon }}</span>
        <span class="tab-name">{{ cat.name }}</span>
        <span v-if="cat.count" class="tab-count">{{ cat.count }}</span>
      </button>
    </div>

    <!-- 工具列表 -->
    <div class="tools-container">
      <template v-if="filteredCategories.length > 0">
        <div
          v-for="category in filteredCategories"
          :key="category.name"
          class="category-section"
        >
          <h2 class="category-title">
            <span class="category-icon">{{ category.icon }}</span>
            {{ category.name }}
            <span class="category-count">{{ category.tools.length }}</span>
          </h2>
          <div class="tools-grid">
            <ToolCard
              v-for="tool in category.tools"
              :key="tool.name"
              :tool="tool"
            />
          </div>
        </div>
      </template>

      <!-- 空状态 -->
      <div v-else class="empty-state">
        <span class="empty-icon">😅</span>
        <p>没有找到匹配的工具</p>
        <button class="reset-btn" @click="resetFilters">重置筛选</button>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed } from "vue";
  import { toolsData } from "../data/ai-tools";
  import ToolCard from "./ToolCard.vue";

  const props = defineProps({
    placeholder: {
      type: String,
      default: "搜索工具名称、描述或标签...",
    },
    categories: {
      type: Array,
      default: null,
    },
    allLabel: {
      type: String,
      default: "全部",
    },
  });

  const source = computed(() =>
    props.categories && props.categories.length ? props.categories : toolsData
  );

  const searchQuery = ref("");
  const activeCategory = ref("all");

  // 构建分类标签列表
  const allCategories = computed(() => {
    const categories = source.value.map((cat) => ({
      id: cat.name,
      name: cat.name,
      icon: cat.icon,
      count: cat.tools.length,
    }));

    const totalCount = source.value.reduce(
      (sum, cat) => sum + cat.tools.length,
      0,
    );

    return [
      { id: "all", name: props.allLabel, icon: "🌐", count: totalCount },
      ...categories,
    ];
  });

  // 过滤后的类目和工具
  const filteredCategories = computed(() => {
    const query = searchQuery.value.toLowerCase().trim();

    // 过滤类目
    let result = source.value;
    if (activeCategory.value !== "all") {
      result = result.filter((cat) => cat.name === activeCategory.value);
    }

    // 搜索过滤
    if (query) {
      result = result
        .map((cat) => ({
          ...cat,
          tools: cat.tools.filter(
            (tool) =>
              tool.name.toLowerCase().includes(query) ||
              tool.desc.toLowerCase().includes(query) ||
              (tool.tags &&
                tool.tags.some((tag) => tag.toLowerCase().includes(query))),
          ),
        }))
        .filter((cat) => cat.tools.length > 0);
    }

    return result;
  });

  const resetFilters = () => {
    searchQuery.value = "";
    activeCategory.value = "all";
  };
</script>

<style scoped>
  .ai-tools-gallery {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
  }

  /* 搜索栏 */
  .search-section {
    display: flex;
    justify-content: center;
    margin-bottom: 32px;
  }

  .search-wrapper {
    position: relative;
    width: 100%;
    max-width: 600px;
  }

  .search-icon {
    position: absolute;
    left: 20px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 18px;
    pointer-events: none;
  }

  .search-input {
    width: 100%;
    padding: 16px 48px;
    font-size: 16px;
    border: 2px solid var(--vp-c-divider);
    border-radius: 50px;
    background: var(--vp-c-bg);
    color: var(--vp-c-text-1);
    outline: none;
    transition: all 0.3s ease;
  }

  .search-input::placeholder {
    color: var(--vp-c-text-3);
  }

  .search-input:focus {
    border-color: var(--vp-c-brand);
    box-shadow: 0 0 0 4px var(--vp-c-brand-soft);
  }

  .search-clear {
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    width: 24px;
    height: 24px;
    border: none;
    background: var(--vp-c-bg-soft);
    border-radius: 50%;
    cursor: pointer;
    color: var(--vp-c-text-2);
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
  }

  .search-clear:hover {
    background: var(--vp-c-brand);
    color: white;
  }

  /* 分类标签 */
  .category-tabs {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
    margin-bottom: 40px;
    padding: 0 20px;
  }

  .category-tab {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 10px 18px;
    border: 1px solid var(--vp-c-divider);
    border-radius: 25px;
    background: var(--vp-c-bg);
    color: var(--vp-c-text-2);
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .category-tab:hover {
    border-color: var(--vp-c-brand);
    color: var(--vp-c-brand);
  }

  .category-tab.active {
    background: var(--vp-c-brand);
    border-color: var(--vp-c-brand);
    color: white;
  }

  .tab-icon {
    font-size: 16px;
  }

  .tab-count {
    font-size: 12px;
    padding: 2px 8px;
    background: var(--vp-c-bg-soft);
    border-radius: 10px;
    color: var(--vp-c-text-3);
  }

  .category-tab.active .tab-count {
    background: rgba(255, 255, 255, 0.2);
    color: white;
  }

  /* 类目区块 */
  .category-section {
    margin-bottom: 48px;
  }

  .category-title {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 24px;
    font-weight: 600;
    margin: 0 0 20px 0;
    color: var(--vp-c-text-1);
  }

  .category-icon {
    font-size: 28px;
  }

  .category-count {
    font-size: 14px;
    font-weight: 400;
    padding: 4px 12px;
    background: var(--vp-c-bg-soft);
    border-radius: 20px;
    color: var(--vp-c-text-3);
  }

  /* 工具网格 */
  .tools-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 16px;
  }

  /* 空状态 */
  .empty-state {
    text-align: center;
    padding: 60px 20px;
    color: var(--vp-c-text-2);
  }

  .empty-icon {
    font-size: 64px;
    display: block;
    margin-bottom: 16px;
  }

  .empty-state p {
    font-size: 18px;
    margin-bottom: 20px;
  }

  .reset-btn {
    padding: 10px 24px;
    border: 1px solid var(--vp-c-brand);
    border-radius: 20px;
    background: transparent;
    color: var(--vp-c-brand);
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s;
  }

  .reset-btn:hover {
    background: var(--vp-c-brand);
    color: white;
  }

  /* 响应式 */
  @media (max-width: 768px) {
    .ai-tools-gallery {
      padding: 0 16px;
    }

    .search-input {
      padding: 14px 44px;
      font-size: 15px;
    }

    .category-tabs {
      gap: 8px;
      padding: 0;
    }

    .category-tab {
      padding: 8px 14px;
      font-size: 13px;
    }

    .tab-name {
      display: none;
    }

    .category-tab .tab-icon {
      font-size: 18px;
    }

    .tools-grid {
      grid-template-columns: 1fr;
      gap: 12px;
    }

    .category-title {
      font-size: 20px;
    }
  }
</style>
