<script setup>
  import { ref, watch, onMounted, onUnmounted, nextTick } from "vue";
  import { marked } from "marked";

  const props = defineProps({
    id: {
      type: String,
      required: true,
    },
  });

  const exampleData = ref({
    content: "Loading...",
    dirName: "",
  });

  const showTooltip = ref(false);
  const containerRef = ref(null);
  const tooltipRef = ref(null);
  const tooltipStyle = ref({});

  const updateTooltipPosition = async () => {
    if (!showTooltip.value || !containerRef.value) return;

    await nextTick();
    if (!tooltipRef.value) return;

    // Reset style for accurate natural measurement
    tooltipStyle.value = {
      visibility: "hidden",
      bottom: "calc(100% + 8px)",
      top: "auto",
      transform: "translateX(-50%)",
      maxHeight: "none",
    };

    // Give browser a frame to layout new styles before measuring
    requestAnimationFrame(() => {
      if (!tooltipRef.value || !containerRef.value || !showTooltip.value)
        return;

      const tooltipRect = tooltipRef.value.getBoundingClientRect();
      const badgeRect = containerRef.value.getBoundingClientRect();

      // Calculate the physical scale factor applied by Slidev
      const scale =
        tooltipRef.value.offsetWidth > 0
          ? tooltipRect.width / tooltipRef.value.offsetWidth
          : 1;

      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const padding = 20; // 20px padding from physical screen edge

      let newStyle = {
        visibility: "visible",
      };

      // --- Y-axis adjustment and dynamic max-height ---
      const spaceAbove = badgeRect.top;
      const spaceBelow = viewportHeight - badgeRect.bottom;
      const marginPhysical = 8 * scale; // 8px CSS margin in physical pixels

      // Determine whether it should go up or down
      let isTop = true;
      const totalNeededHeight = tooltipRect.height + marginPhysical + padding;

      // If it doesn't fit above, and there's more space below, put it below
      if (totalNeededHeight > spaceAbove && spaceBelow > spaceAbove) {
        isTop = false;
      } else if (spaceAbove < padding + marginPhysical) {
        isTop = false; // Strictly enforce dropping if very close to top
      }

      const paddingCss = padding / scale;
      const marginCss = 8;

      if (isTop) {
        newStyle.bottom = "calc(100% + 8px)";
        newStyle.top = "auto";
        newStyle.maxHeight = `${Math.max(100, spaceAbove / scale - marginCss - paddingCss)}px`;
      } else {
        newStyle.top = "calc(100% + 8px)";
        newStyle.bottom = "auto";
        newStyle.maxHeight = `${Math.max(100, spaceBelow / scale - marginCss - paddingCss)}px`;
      }

      // --- X-axis adjustment ---
      const naturalLeft =
        badgeRect.left + badgeRect.width / 2 - tooltipRect.width / 2;
      const naturalRight = naturalLeft + tooltipRect.width;

      let offsetX = 0; // physical pixels
      if (naturalLeft < padding) {
        offsetX = padding - naturalLeft;
      } else if (naturalRight > viewportWidth - padding) {
        offsetX = viewportWidth - padding - naturalRight;
      }

      newStyle.transform = `translateX(calc(-50% + ${offsetX / scale}px))`;
      tooltipStyle.value = newStyle;
    });
  };

  watch(showTooltip, (newVal) => {
    if (newVal) {
      updateTooltipPosition();
    }
  });

  watch(
    () => exampleData.value.content,
    () => {
      if (showTooltip.value) updateTooltipPosition();
    },
  );

  // Use Vite's import.meta.glob to dynamically load README.md files
  const readmeModules = import.meta.glob("../examples/*/README.md", {
    query: "?raw",
    import: "default",
  });

  const loadReadme = async () => {
    // Find the module that matches the id exactly as a prefix, e.g. "2.1." matching "2.1.tokenizer"
    const modulePath = Object.keys(readmeModules).find((path) =>
      path.includes(`/${props.id}.`),
    );

    if (modulePath) {
      try {
        // Extract the directory name from the path, e.g. "../examples/2.1.tokenizer/README.md" -> "2.1.tokenizer"
        const match = modulePath.match(/\/examples\/([^/]+)\//);
        if (match) {
          exampleData.value.dirName = match[1];
        }

        // Lazy load the content
        const rawContent = await readmeModules[modulePath]();

        // Remove the # Title line from the markdown to save space
        const contentWithoutTitle = rawContent
          .trim()
          .replace(/^#\s+.*$/m, "")
          .trim();

        // Render markdown to HTML
        exampleData.value.content = marked.parse(contentWithoutTitle);
      } catch (e) {
        exampleData.value.content = `<p>Error loading example ${props.id}</p>`;
        console.error(e);
      }
    } else {
      exampleData.value.content = `<p>Example ${props.id} not found.</p>`;
    }
  };

  const closeTooltip = (e) => {
    if (
      showTooltip.value &&
      containerRef.value &&
      !containerRef.value.contains(e.target)
    ) {
      showTooltip.value = false;
    }
  };

  onMounted(() => {
    loadReadme();
    document.addEventListener("click", closeTooltip);
  });

  onUnmounted(() => {
    document.removeEventListener("click", closeTooltip);
  });

  watch(
    () => props.id,
    () => {
      loadReadme();
    },
  );

  const getCursorLink = () => {
    if (!exampleData.value.dirName) return "#";
    return `cursor://file/Users/zenheart/code/github/learn-ai/ppts/vibe-coding/examples/${exampleData.value.dirName}`;
  };
</script>

<template>
  <span
    class="vibe-example-container relative inline-flex items-center align-middle mx-1 z-10"
    ref="containerRef"
  >
    <span
      class="vibe-badge cursor-pointer text-[13px] font-medium text-indigo-600 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-900/30 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 px-2 py-0.5 rounded-md border border-indigo-200 dark:border-indigo-800/60 transition-colors whitespace-nowrap"
      @click="showTooltip = !showTooltip"
    >
      Demo {{ exampleData.dirName || id }}
    </span>

    <div
      v-show="showTooltip"
      ref="tooltipRef"
      :style="tooltipStyle"
      class="vibe-tooltip absolute left-1/2 w-96 flex flex-col bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 p-4 rounded-lg shadow-2xl border border-slate-200 dark:border-slate-700 z-[100] text-left text-sm whitespace-normal"
      @click.stop
    >
      <div
        v-if="exampleData.dirName"
        class="actions flex gap-2 mb-3 pb-3 border-b border-slate-200 dark:border-slate-700 flex-shrink-0"
      >
        <a
          :href="getCursorLink()"
          class="text-[11px] bg-slate-800 text-white border border-slate-700 px-3 py-1.5 rounded inline-flex items-center gap-1.5 hover:bg-slate-700 dark:bg-slate-200 dark:text-slate-800 dark:border-slate-300 dark:hover:bg-slate-300 transition truncate w-full justify-center"
        >
          <img src="/cursor.svg" class="w-3.5 h-3.5 flex-shrink-0" />
          <span class="truncate font-medium"
            >在 Cursor 中打开 {{ exampleData.dirName }}</span
          >
        </a>
      </div>

      <div
        class="markdown-render prose prose-sm dark:prose-invert max-w-none overflow-y-auto flex-1 min-h-0 pr-2 text-slate-700 dark:text-slate-300"
        v-html="exampleData.content"
      ></div>

      <div
        class="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-3 h-3 bg-white dark:bg-slate-800 border-r border-b border-slate-200 dark:border-slate-700 hidden"
      ></div>
    </div>
  </span>
</template>

<style scoped>
  .vibe-example-container:hover {
    z-index: 50;
  }
  .vibe-tooltip {
    /* Prevent z-index issues and add better positioning */
    box-shadow:
      0 10px 25px -5px rgba(0, 0, 0, 0.1),
      0 10px 10px -5px rgba(0, 0, 0, 0.04);
    /* Make sure tooltip is above surrounding text */
    z-index: 100;
  }

  /* Custom scrollbar for strictly internal scroll */
  .markdown-render::-webkit-scrollbar {
    width: 4px;
  }
  .markdown-render::-webkit-scrollbar-track {
    background: transparent;
  }
  .markdown-render::-webkit-scrollbar-thumb {
    background-color: #cbd5e1;
    border-radius: 4px;
  }
  .dark .markdown-render::-webkit-scrollbar-thumb {
    background-color: #475569;
  }

  /* Fix markdown rendering styles in Slidev */
  .markdown-render :deep(h2) {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    font-size: 1.1em;
    border-bottom: 1px solid #e2e8f0;
    padding-bottom: 0.2rem;
  }
  .dark .markdown-render :deep(h2) {
    border-bottom-color: #334155;
  }
  .markdown-render :deep(p) {
    margin-top: 0.25rem;
    margin-bottom: 0.5rem;
    line-height: 1.4;
  }
  .markdown-render :deep(ul) {
    margin-top: 0.25rem;
    margin-bottom: 0.5rem;
    padding-left: 1.2rem;
  }
  .markdown-render :deep(li) {
    margin-bottom: 0.1rem;
  }
  .markdown-render :deep(pre) {
    padding: 0.5rem;
    margin: 0.5rem 0;
    border-radius: 0.25rem;
    background-color: #f1f5f9;
  }
  .dark .markdown-render :deep(pre) {
    background-color: #0f172a;
  }
</style>
