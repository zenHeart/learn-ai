<template>
  <div class="matrix-page-container">
    <!-- Header Controls Moved Outside -->
    <div class="matrix-page-header">
      <div class="header-left">
        <h2 class="matrix-page-title">
          <span class="icon-code">⟨ ⟩</span> {{ toolsCompareData.title }}
        </h2>
        <p class="matrix-page-subtitle">{{ toolsCompareData.subtitle }}</p>
      </div>
      <label class="toggle-switch">
        <input type="checkbox" v-model="isGrouped" />
        <span class="slider"></span>
        <span class="label-text">分类视图</span>
      </label>
    </div>

    <div class="premium-matrix-wrapper">
      <!-- Scrollable Table Area -->
      <div class="table-scroll-container">
        <table class="premium-matrix">
          <thead>
            <tr>
              <th class="corner-cell">
                <span class="corner-text">特性 / 工具</span>
              </th>
              <th v-for="tool in tools" :key="tool.id" class="tool-th">
                <div class="tool-header">
                  <a
                    v-if="tool.link"
                    :href="tool.link"
                    target="_blank"
                    class="tool-name"
                    :style="{ color: tool.color }"
                    >{{ tool.name }}</a
                  >
                  <span
                    v-else
                    class="tool-name"
                    :style="{ color: tool.color }"
                    >{{ tool.name }}</span
                  >
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <template
              v-for="(group, gIndex) in renderedGroups"
              :key="group.key"
            >
              <tr
                v-if="isGrouped && group.key !== 'default'"
                class="group-header-row"
              >
                <td :colspan="tools.length + 1" class="group-header-cell">
                  <div class="group-header-content">
                    <span class="group-icon">✧</span>
                    <span class="group-title">{{ group.name }}</span>
                  </div>
                </td>
              </tr>
              <tr
                v-for="(feat, idx) in group.features"
                :key="feat.key"
                class="feature-row"
              >
                <td class="feature-name" @mouseleave="activeTooltip = null">
                  <div class="feature-name-content">
                    <a
                      v-if="feat.link"
                      :href="feat.link"
                      target="_blank"
                      class="feat-title link-title"
                      :title="feat.name"
                      >{{ feat.name || feat.desc }}</a
                    >
                    <span v-else class="feat-title" :title="feat.name">{{
                      feat.name || feat.desc
                    }}</span>
                    <div
                      class="info-icon-wrapper"
                      @mouseenter="activeTooltip = feat.key"
                    >
                      <svg
                        class="info-icon"
                        viewBox="0 0 24 24"
                        width="14"
                        height="14"
                      >
                        <path
                          fill="currentColor"
                          d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8z"
                        />
                      </svg>
                      <!-- Tooltip Dropdown -->
                      <div
                        v-show="activeTooltip === feat.key"
                        class="feature-tooltip"
                      >
                        {{ feat.desc }}
                      </div>
                    </div>
                  </div>
                </td>
                <td
                  v-for="tool in tools"
                  :key="`${feat.key}-${tool.id}`"
                  class="feature-cell"
                >
                  <div
                    class="cell-content"
                    :class="getStatusClass(feat.key, tool.id)"
                  >
                    <svg
                      v-if="!getConf(feat.key, tool.id)?.text"
                      class="status-icon"
                      viewBox="0 0 24 24"
                      v-html="getIcon(feat.key, tool.id)"
                    ></svg>
                    <a
                      v-if="getLink(feat.key, tool.id)"
                      :href="getLink(feat.key, tool.id)"
                      target="_blank"
                      class="status-link"
                    >
                      <span class="status-text">{{
                        getText(feat.key, tool.id)
                      }}</span>
                    </a>
                    <span v-else class="status-text">{{
                      getText(feat.key, tool.id)
                    }}</span>
                  </div>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed } from "vue";
  import { ToolsCompare, SUPPORT_LEVEL } from "./toolsConfig";

  const props = defineProps({
    groupByLabel: { type: Boolean, default: false },
  });

  const isGrouped = ref(props.groupByLabel);
  const activeTooltip = ref<string | null>(null);

  const toggleTooltip = (key: string) => {
    activeTooltip.value = activeTooltip.value === key ? null : key;
  };
  const toolsCompareData = ToolsCompare;
  const tools = Object.entries(ToolsCompare.tools).map(([id, toolData]) => ({
    id,
    ...(toolData as any)._meta,
  }));

  const icons = {
    success:
      '<path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>',
    warning:
      '<path fill="currentColor" d="M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z"/>',
    error:
      '<path fill="currentColor" d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10s10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17L12 13.41L8.41 17L7 15.59L10.59 12L7 8.41L8.41 7L12 10.59L15.59 7L17 8.41L13.41 12L17 15.59z"/>',
  };

  type FeatureEntry = any;

  const renderedGroups = computed(() => {
    const fEntries = Object.entries(ToolsCompare.features);

    if (!isGrouped.value) {
      return [
        {
          key: "default",
          name: "",
          features: fEntries.map(([k, v]) => ({ key: k, ...v })),
        },
      ];
    }

    const gMap: Record<string, FeatureEntry[]> = {};
    fEntries.forEach(([k, v]) => {
      const labels = (v as any).label || ["other"];
      labels.forEach((l: string) => {
        if (!gMap[l]) gMap[l] = [];
        gMap[l].push({ key: k, ...v });
      });
    });

    return Object.keys(gMap).map((l) => ({
      key: l,
      name: (ToolsCompare.label as any)[l]?.desc || l,
      features: gMap[l],
    }));
  });

  function getConf(featKey: string, toolId: string) {
    return (ToolsCompare.tools as any)[toolId]?.[featKey];
  }

  function getLevel(featKey: string, toolId: string) {
    return getConf(featKey, toolId)?.level || SUPPORT_LEVEL.notSupport;
  }

  function getText(featKey: string, toolId: string) {
    const conf = getConf(featKey, toolId);
    return conf?.text || getLevel(featKey, toolId);
  }

  const getLink = (featKey: string, toolId: string) => {
    const rawData = ToolsCompare.tools as unknown as Record<string, any>;
    const cellValue = rawData[toolId][featKey];
    return cellValue?.link || null;
  };

  function getStatusClass(featKey: string, toolId: string) {
    const level = getLevel(featKey, toolId);
    if (level === SUPPORT_LEVEL.support) return "status-success";
    if (level === SUPPORT_LEVEL.partialSupport) return "status-warning";
    return "status-error";
  }

  function getIcon(featKey: string, toolId: string) {
    const level = getLevel(featKey, toolId);
    if (level === SUPPORT_LEVEL.support) return icons.success;
    if (level === SUPPORT_LEVEL.partialSupport) return icons.warning;
    return icons.error;
  }
</script>

<style scoped>
  /* Page Level Container */
  .matrix-page-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    gap: 16px;
    font-family: "Inter", ui-sans-serif, system-ui, sans-serif;
  }

  /* Extracted Header Area */
  .matrix-page-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding: 0 4px;
    flex-shrink: 0;
  }

  .header-left {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .matrix-page-title {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 800;
    color: #1e293b;
    display: flex;
    align-items: center;
    gap: 8px;
    letter-spacing: -0.5px;
  }

  html.dark .matrix-page-title {
    color: #f8fafc;
  }

  .icon-code {
    color: #6366f1;
    font-weight: 900;
    opacity: 0.9;
  }

  .matrix-page-subtitle {
    margin: 0;
    font-size: 0.85rem;
    color: #64748b;
    font-weight: 500;
  }

  html.dark .matrix-page-subtitle {
    color: #94a3b8;
  }

  /* Main Container - fully expanded */
  .premium-matrix-wrapper {
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 100%;
    background: #ffffff;
    border-radius: 8px; /* Tighter radius */
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    border: 1px solid rgba(0, 0, 0, 0.05);
    color: #1e293b;
    overflow: hidden;
    margin: 0;
  }

  html.dark .premium-matrix-wrapper {
    background: #1e1e20;
    border-color: rgba(255, 255, 255, 0.08);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
    color: #f8fafc;
  }

  /* --- Toggle Switch logic is kept, removed matrix-controls block since we replaced it with matrix-page-header --- */

  /* Custom Toggle Switch - smaller */
  .toggle-switch {
    display: flex;
    align-items: center;
    cursor: pointer;
    gap: 8px;
    margin-bottom: 4px; /* Align toggle slightly above the subtitle baseline */
  }

  .toggle-switch input {
    display: none;
  }

  .slider {
    position: relative;
    width: 32px;
    height: 18px;
    background: #e2e8f0;
    border-radius: 18px;
    transition: all 0.3s ease;
  }

  html.dark .slider {
    background: #334155;
  }

  .slider::before {
    content: "";
    position: absolute;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: white;
    top: 2px;
    left: 2px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  }

  .toggle-switch input:checked + .slider {
    background: #e0e7ff;
  }

  html.dark .toggle-switch input:checked + .slider {
    background: #4f46e5;
  }

  .toggle-switch input:checked + .slider::before {
    transform: translateX(14px);
    background: #6366f1;
  }

  html.dark .toggle-switch input:checked + .slider::before {
    background: white;
  }

  .label-text {
    font-size: 0.75rem;
    font-weight: 600;
    color: #64748b;
    user-select: none;
  }

  html.dark .label-text {
    color: #94a3b8;
  }

  /* Scrollable Table Area */
  .table-scroll-container {
    flex: 1 1 auto;
    overflow: auto;
    padding: 0; /* Fully flushed to edges */
    background: #fff;
    /* Custom Scrollbar for inner container */
    scrollbar-width: thin;
    scrollbar-color: #cbd5e1 transparent;
  }

  html.dark .table-scroll-container {
    background: transparent;
  }

  .table-scroll-container::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  .table-scroll-container::-webkit-scrollbar-track {
    background: transparent;
  }
  .table-scroll-container::-webkit-scrollbar-thumb {
    background-color: #cbd5e1;
    border-radius: 10px;
  }
  html.dark .table-scroll-container::-webkit-scrollbar-thumb {
    background-color: #475569;
  }

  .premium-matrix {
    width: 100%;
    min-width: 800px;
    border-collapse: separate;
    border-spacing: 0;
  }

  /* Table Headers */
  .tool-th {
    position: sticky;
    top: 0;
    background: rgba(255, 255, 255, 0.98);
    padding: 0;
    z-index: 10;
    border-bottom: 2px solid #f8fafc;
  }

  html.dark .tool-th {
    background: rgba(30, 30, 34, 0.98);
    border-bottom-color: rgba(255, 255, 255, 0.05);
  }

  .tool-header {
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    gap: 4px;
  }

  .tool-name {
    font-size: 0.95rem;
    font-weight: 800;
    letter-spacing: 0.2px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 140px;
    text-decoration: none; /* For links */
    transition: opacity 0.2s ease;
  }

  .tool-name:hover {
    opacity: 0.8;
  }

  .corner-cell {
    position: sticky;
    top: 0;
    left: 0;
    background: rgba(248, 250, 252, 0.98);
    z-index: 20;
    width: 130px;
    min-width: 130px;
    border-bottom: 2px solid #e2e8f0;
    padding-left: 16px;
    border-right: 1px solid #e2e8f0; /* Add boundary for sticky column */
  }
  html.dark .corner-cell {
    background: rgba(30, 30, 34, 0.98);
    border-bottom-color: rgba(255, 255, 255, 0.05);
    border-right-color: rgba(255, 255, 255, 0.05);
  }

  .corner-text {
    font-size: 0.8rem;
    font-weight: 700;
    color: #334155;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
  }

  html.dark .corner-text {
    color: #cbd5e1;
  }

  /* Group Headers - Tightly packed */
  .group-header-row td {
    padding: 10px 12px 6px 12px !important;
    border-bottom: none !important;
    background: #f8fafc;
  }

  html.dark .group-header-row td {
    background: rgba(255, 255, 255, 0.02);
  }

  .group-header-content {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .group-icon {
    color: #8b5cf6;
    font-size: 0.85rem;
  }

  .group-title {
    font-size: 0.75rem;
    font-weight: 700;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  html.dark .group-title {
    color: #94a3b8;
  }

  /* Feature Rows & Cells - Compact Padding */
  .feature-row td {
    padding: 6px 8px; /* Tightly packed */
    border-bottom: 1px solid #f1f5f9;
    vertical-align: middle;
  }

  html.dark .feature-row td {
    border-bottom-color: rgba(255, 255, 255, 0.03);
  }

  /* Remove border on last row */
  .premium-matrix tbody tr:last-child td {
    border-bottom: none;
  }

  .feature-name {
    position: sticky;
    left: 0;
    background: #ffffff;
    z-index: 5;
    text-align: left;
    padding-left: 14px !important;
    border-right: 1px solid #f1f5f9; /* Define the sticky border */
    max-width: 130px;
  }

  html.dark .feature-name {
    background: #1e1e20;
    border-right-color: rgba(255, 255, 255, 0.03);
  }

  .feature-name-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 6px;
    width: 100%;
  }

  .feat-title {
    font-weight: 600;
    color: #475569;
    font-size: 0.75rem;
    line-height: 1.2;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    flex: 1; /* take remaining space */
  }

  /* Specific styles when the feature title is a link */
  a.link-title {
    text-decoration: none;
    transition: opacity 0.2s ease;
    display: inline-block;
    max-width: max-content;
    flex: 0 1 auto;
  }

  a.link-title:hover {
    opacity: 0.8;
  }

  html.dark .feat-title {
    color: #cbd5e1;
  }

  /* Info Icon */
  .info-icon-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #94a3b8;
    transition: color 0.2s;
    padding: 2px;
    flex-shrink: 0;
  }

  .info-icon-wrapper:hover {
    color: #6366f1;
  }

  /* Tooltip Popup */
  .feature-tooltip {
    position: absolute;
    left: 100%; /* pop to the right */
    top: 50%;
    transform: translateY(-50%);
    margin-left: 10px;
    background: #1e293b;
    color: #f8fafc;
    padding: 8px 12px;
    border-radius: 6px;
    font-size: 0.7rem;
    font-weight: 500;
    width: max-content;
    max-width: 240px;
    white-space: normal;
    z-index: 100;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    line-height: 1.4;
    pointer-events: none; /* so it doesn't block clicks */
  }

  /* Triangle for tooltip */
  .feature-tooltip::before {
    content: "";
    position: absolute;
    top: 50%;
    right: 100%;
    transform: translateY(-50%);
    margin-right: -1px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent #1e293b transparent transparent;
  }
  html.dark .feature-name {
    background: #1e1e20;
    color: #e2e8f0;
  }

  .feature-cell {
    text-align: center;
  }

  /* Pill-shaped badging for statuses - smaller pills */
  .cell-content {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    padding: 4px 10px; /* Slimmer pills */
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 600;
    white-space: nowrap;
  }

  .feature-cell:hover .cell-content {
    transform: translateY(-1px);
  }

  .status-icon {
    width: 12px;
    height: 12px;
  }

  /* Status variants */
  .status-success {
    background: #ecfdf5;
    color: #059669;
  }
  html.dark .status-success {
    background: rgba(16, 185, 129, 0.15);
    color: #34d399;
  }

  .status-warning {
    background: #fffbeb;
    color: #d97706;
  }
  html.dark .status-warning {
    background: rgba(245, 158, 11, 0.15);
    color: #fbbf24;
  }

  .status-error {
    background: #fef2f2;
    color: #dc2626;
  }
  html.dark .status-error {
    background: rgba(239, 68, 68, 0.15);
    color: #f87171;
  }
</style>
