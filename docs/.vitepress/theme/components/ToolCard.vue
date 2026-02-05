<template>
  <a
    :href="tool.url"
    target="_blank"
    rel="noopener noreferrer"
    class="tool-card"
  >
    <div class="tool-icon">{{ tool.icon || "🔧" }}</div>
    <div class="tool-info">
      <h3 class="tool-name">{{ tool.name }}</h3>
      <p class="tool-desc">{{ tool.desc }}</p>
    </div>
    <span class="tool-arrow">→</span>
  </a>
</template>

<script setup>
  defineProps({
    tool: {
      type: Object,
      required: true,
    },
  });
</script>

<style scoped>
  .tool-card {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 16px 20px;
    background: var(--vp-c-bg-soft);
    border: 1px solid var(--vp-c-divider);
    border-radius: 12px;
    text-decoration: none;
    color: inherit;
    transition: all 0.3s ease;
  }

  .tool-card:hover {
    border-color: var(--vp-c-brand);
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  }

  .dark .tool-card:hover {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  }

  .tool-icon {
    font-size: 28px;
    flex-shrink: 0;
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--vp-c-bg);
    border-radius: 10px;
  }

  .tool-info {
    flex: 1;
    min-width: 0;
  }

  .tool-name {
    margin: 0 0 4px 0;
    font-size: 16px;
    font-weight: 600;
    color: var(--vp-c-text-1);
  }

  .tool-desc {
    margin: 0;
    font-size: 14px;
    color: var(--vp-c-text-2);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .tool-arrow {
    font-size: 18px;
    color: var(--vp-c-text-3);
    opacity: 0;
    transform: translateX(-8px);
    transition: all 0.3s ease;
  }

  .tool-card:hover .tool-arrow {
    opacity: 1;
    transform: translateX(0);
    color: var(--vp-c-brand);
  }

  @media (max-width: 768px) {
    .tool-card {
      padding: 14px 16px;
      gap: 12px;
    }

    .tool-icon {
      width: 40px;
      height: 40px;
      font-size: 24px;
    }

    .tool-name {
      font-size: 15px;
    }

    .tool-desc {
      font-size: 13px;
    }

    .tool-arrow {
      display: none;
    }
  }
</style>
