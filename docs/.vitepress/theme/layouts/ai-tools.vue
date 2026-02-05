<template>
  <div class="ai-tools-layout">
    <!-- 页面头部 -->
    <header class="tools-header">
      <div class="header-content">
        <h1 class="header-title">
          <span class="title-icon">🧰</span>
          {{ frontmatter.title || "AI Tools Gallery" }}
        </h1>
        <p class="header-desc">
          {{ frontmatter.description || "发现最佳 AI 工具，提升你的工作效率" }}
        </p>
      </div>
    </header>

    <!-- 主内容区 -->
    <main class="tools-main">
      <AIToolsGallery :placeholder="frontmatter.searchPlaceholder" />
    </main>

    <!-- 页脚 -->
    <footer class="tools-footer">
      <p>
        💡 发现更多工具？欢迎
        <a
          href="https://github.com/zenheart/learn-ai"
          target="_blank"
          rel="noopener noreferrer"
        >
          提交 PR
        </a>
      </p>
    </footer>
  </div>
</template>

<script setup>
  import { useData } from "vitepress";
  import AIToolsGallery from "../components/AIToolsGallery.vue";

  const { frontmatter } = useData();
</script>

<style scoped>
  .ai-tools-layout {
    min-height: 100vh;
    background: var(--vp-c-bg);
  }

  /* 页面头部 */
  .tools-header {
    padding: 60px 24px 40px;
    text-align: center;
    background: linear-gradient(
      180deg,
      var(--vp-c-bg-soft) 0%,
      var(--vp-c-bg) 100%
    );
  }

  .header-content {
    max-width: 800px;
    margin: 0 auto;
  }

  .header-title {
    font-size: 2.5rem;
    font-weight: 700;
    margin: 0 0 16px 0;
    color: var(--vp-c-text-1);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
  }

  .title-icon {
    font-size: 2.8rem;
  }

  .header-desc {
    font-size: 1.1rem;
    color: var(--vp-c-text-2);
    margin: 0;
    max-width: 600px;
    margin: 0 auto;
  }

  /* 主内容区 */
  .tools-main {
    padding: 20px 0 60px;
  }

  /* 页脚 */
  .tools-footer {
    text-align: center;
    padding: 40px 24px;
    border-top: 1px solid var(--vp-c-divider);
    color: var(--vp-c-text-2);
    font-size: 14px;
  }

  .tools-footer a {
    color: var(--vp-c-brand);
    text-decoration: none;
  }

  .tools-footer a:hover {
    text-decoration: underline;
  }

  /* 响应式 */
  @media (max-width: 768px) {
    .tools-header {
      padding: 40px 16px 30px;
    }

    .header-title {
      font-size: 1.8rem;
    }

    .title-icon {
      font-size: 2rem;
    }

    .header-desc {
      font-size: 1rem;
    }

    .tools-main {
      padding: 16px 0 40px;
    }
  }
</style>
