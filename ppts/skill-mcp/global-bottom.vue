<template>
  <footer class="footer">
    <div class="footer-left">
      <span class="footer-title">MCP + Skill</span>
      <span class="footer-sep">·</span>
      <span class="footer-sub">AI Coding 三部曲 · 第三期</span>
    </div>
    <div class="footer-right">
      <span class="footer-page"><SlideCurrentNo /> / <SlidesTotal /></span>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  position: absolute;
  bottom: 8px;
  left: 16px;
  right: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 10px;
  color: rgba(100, 116, 139, 0.6);
  pointer-events: none;
  z-index: 0;
}

.footer-left {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.footer-title {
  font-weight: 600;
  color: rgba(59, 130, 246, 0.7);
}

.footer-sep {
  color: rgba(148, 163, 184, 0.5);
}

.footer-page {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-weight: 500;
}
</style>
