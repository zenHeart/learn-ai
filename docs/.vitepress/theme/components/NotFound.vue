<template>
  <div class="nf">
    <p class="nf-code">404</p>
    <h1 class="nf-title">{{ t.title }}</h1>
    <p class="nf-quote">{{ t.quote }}</p>
    <div class="nf-actions">
      <a class="nf-home" :href="withBase(homeHref)">{{ t.home }}</a>
      <span class="nf-hint">{{ t.hint }}</span>
    </div>
  </div>
</template>

<script setup>
  import { computed } from "vue";
  import { useData, withBase } from "vitepress";

  const { lang } = useData();
  const isZh = computed(() => (lang.value || "").toLowerCase().startsWith("zh"));

  const t = computed(() =>
    isZh.value
      ? {
          title: "页面走丢了",
          quote: "这里什么都没有。检查一下链接，或返回首页继续探索。",
          home: "返回首页",
          hint: "提示：按 / 或 ⌘K 直接搜索文档",
        }
      : {
          title: "Page not found",
          quote:
            "There's nothing here. Check the URL, or head back home to keep exploring.",
          home: "Take me home",
          hint: "Tip: press / or ⌘K to search the docs",
        },
  );

  const homeHref = computed(() => (isZh.value ? "/zh/" : "/"));
</script>

<style scoped>
  .nf {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    min-height: calc(100vh - var(--vp-nav-height));
    padding: 24px;
  }

  /* Gradient 404, reusing the hero wordmark gradient (vars.css tokens). */
  .nf-code {
    margin: 0;
    font-size: clamp(5rem, 22vw, 11rem);
    font-weight: 800;
    line-height: 1;
    letter-spacing: -0.04em;
    background: linear-gradient(
      120deg,
      var(--la-accent-from) 30%,
      var(--la-accent-to)
    );
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .nf-title {
    margin: 12px 0 0;
    font-size: 1.6rem;
    font-weight: 700;
    color: var(--vp-c-text-1);
    border: none;
  }

  .nf-quote {
    margin: 12px 0 0;
    max-width: 32rem;
    color: var(--vp-c-text-2);
    line-height: 1.6;
  }

  .nf-actions {
    margin-top: 28px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
  }

  .nf-home {
    display: inline-block;
    padding: 10px 22px;
    border-radius: 22px;
    font-weight: 600;
    color: var(--vp-button-brand-text);
    background: var(--vp-button-brand-bg);
    transition: background-color 0.25s ease;
  }

  .nf-home:hover {
    background: var(--vp-button-brand-hover-bg);
  }

  .nf-hint {
    font-size: 0.85rem;
    color: var(--vp-c-text-3);
  }
</style>
