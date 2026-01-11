<template>
  <div class="zen-path-container">
    <div class="zen-header" v-if="title || subtitle">
      <h2 v-if="title" v-html="title"></h2>
      <p v-if="subtitle">{{ subtitle }}</p>
    </div>

    <div class="path-spine"></div>

    <div
      v-for="(step, index) in steps"
      :key="index"
      class="path-step"
      :class="{ 'step-left': index % 2 === 0, 'step-right': index % 2 === 1 }"
      :style="{ animationDelay: `${index * 0.2}s` }"
    >
      <div
        class="step-card"
        :class="{ 'step-card-future': step.status === 'future' }"
      >
        <span class="step-phase">{{ step.phase }}</span>
        <h3 class="step-title">{{ step.title }}</h3>
        <p class="step-desc">{{ step.description }}</p>
        <div v-if="step.links && step.links.length" class="step-links">
          <a
            v-for="(link, linkIndex) in step.links"
            :key="linkIndex"
            :href="link.url"
            :target="link.external ? '_blank' : undefined"
            :rel="link.external ? 'noopener noreferrer' : undefined"
          >
            {{ link.text }}
          </a>
        </div>
      </div>
      <div
        class="step-node"
        :class="{
          active: step.status === 'active' || step.status === undefined,
          future: step.status === 'future'
        }"
      ></div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: ''
  },
  subtitle: {
    type: String,
    default: ''
  },
  steps: {
    type: Array,
    required: true,
    validator: (steps) => {
      return steps.every(step => 
        step.phase && 
        step.title && 
        step.description &&
        (!step.links || Array.isArray(step.links))
      )
    }
  }
})
</script>

<style scoped>
/*
  ZEN LEARNING PATH THEME
  Designed to match pathV2.html aesthetic while supporting both light and dark themes
  Integrates with VitePress theme variables as fallbacks
*/

/* CONTAINER with CSS variables defined here (not :root due to Vue scoped styles) */
.zen-path-container {
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  padding: 20px 0;

  /* Accent color - consistent across themes */
  --zen-accent: #2ea44f;
  --zen-accent-glow: rgba(46, 164, 79, 0.2);

  /* Light theme (default) - Clean, minimal GitHub-style */
  --zen-bg-body: #ffffff;
  --zen-bg-card: #f6f8fa;
  --zen-border-muted: #d0d7de;
  --zen-text-primary: #24292f;
  --zen-text-secondary: #57606a;
  --zen-path-line: #d0d7de;
}

/* Dark theme - Matches pathV2.html dark aesthetic */
:global(.dark) .zen-path-container {
  --zen-bg-body: #0d1117;     /* GitHub Dark Dimmed */
  --zen-bg-card: #161b22;
  --zen-border-muted: #30363d;
  --zen-text-primary: #c9d1d9;
  --zen-text-secondary: #8b949e;
  --zen-path-line: #21262d;
}

/* HEADER */
.zen-header {
  text-align: center;
  margin-bottom: 60px;
  position: relative;
  z-index: 1;  /* Ensure header is above spine */
}

.zen-header h2 {
  font-size: 2rem;
  margin-bottom: 10px;
  font-weight: 300;
  color: var(--vp-c-text-1, var(--zen-text-primary));
}

.zen-header h2 :deep(span) {
  color: var(--zen-accent);
  font-weight: 600;
}

.zen-header p {
  color: var(--vp-c-text-2, var(--zen-text-secondary));
  margin: 0;
}

/* TIMELINE SPINE - Starts at first step node, ends at last step node */
.path-spine {
  position: absolute;
  left: 50%;
  top: 200px;  /* Start after header + first step margin, at first node position */
  bottom: 80px;  /* End before last step, at last node position */
  width: 2px;
  background: var(--zen-path-line);
  transform: translateX(-50%);
  z-index: 0;
  pointer-events: none;
}

/* PATH STEPS - Timeline cards with alternating layout */
.path-step {
  position: relative;
  margin-bottom: 60px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  animation: fadeIn 0.8s forwards;
  z-index: 1;  /* Above timeline spine (z-index: 0) */
}

/* Alternate sides for desktop - matches pathV2.html nth-child pattern */
/* Index 0, 2, 4... (1st, 3rd, 5th items) = left side */
.path-step.step-left {
  flex-direction: row-reverse;
}

/* Index 1, 3, 5... (2nd, 4th, 6th items) = right side */
.path-step.step-right {
  flex-direction: row;
}

/* The Content Card - Main step container */
.step-card {
  width: 40%;
  background: var(--vp-c-bg-soft, var(--zen-bg-card));
  border: 1px solid var(--vp-c-divider, var(--zen-border-muted));
  padding: 24px;
  border-radius: 8px;
  position: relative;
  transition: all 0.3s ease;
  z-index: 2;
  /* Ensure content stays within card bounds */
  overflow: hidden;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

/* Hover effect - accent glow */
.step-card:hover {
  border-color: var(--zen-accent);
  box-shadow: 0 4px 20px var(--zen-accent-glow);
  transform: translateY(-2px);
}

/* Future/planned steps - dashed border, reduced opacity */
.step-card-future {
  border-style: dashed;
  opacity: 0.7;
}

/* Typography inside cards - Matches pathV2.html hierarchy */
.step-phase {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: var(--zen-accent);
  margin-bottom: 8px;
  display: block;
  font-weight: 700;
  word-wrap: break-word;
}

.step-title {
  margin: 0 0 10px 0;
  font-size: 1.2rem;
  color: var(--vp-c-text-1, var(--zen-text-primary));
  font-weight: 600;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.step-desc {
  font-size: 0.9rem;
  color: var(--vp-c-text-2, var(--zen-text-secondary));
  margin: 0;
  line-height: 1.6;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

/* Links - Subtle underline with hover transition */
.step-links {
  margin-top: 15px;
  font-size: 0.85rem;
  display: flex;
  flex-wrap: wrap;
  gap: 10px 15px;  /* vertical and horizontal gap */
}

.step-links a {
  color: var(--vp-c-text-2, var(--zen-text-secondary));
  text-decoration: none;
  border-bottom: 1px dashed var(--vp-c-divider, var(--zen-border-muted));
  transition: color 0.2s, border-color 0.2s;
  word-break: break-word;
  white-space: normal;
}

.step-links a:hover {
  color: var(--zen-accent);
  border-bottom-color: var(--zen-accent);
}

/* CENTER NODE - Matches pathV2.html design */
.step-node {
  width: 16px;
  height: 16px;
  background: var(--vp-c-bg, var(--zen-bg-body));
  border: 2px solid var(--zen-accent);
  border-radius: 50%;
  z-index: 3;  /* Above timeline and cards to be clearly visible */
  margin: 0 40px;
  position: relative;
  transition: background 0.3s, box-shadow 0.3s;
  flex-shrink: 0;
}

/* Node visual states - Active vs Future milestones */
.step-node.active {
  background: var(--zen-accent);
  box-shadow: 0 0 15px var(--zen-accent);
}

.step-node.future {
  border-color: var(--vp-c-text-3, var(--zen-text-secondary));
  background: var(--vp-c-bg, var(--zen-bg-body));
}

/* ANIMATION - Fade in from bottom */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* RESPONSIVE - Mobile layout: left-aligned with single column */
@media (max-width: 768px) {
  .zen-header {
    position: relative;
    z-index: 1;
  }

  .path-spine {
    left: 20px;
    top: 180px;  /* Start after header + first step, at first node position */
    bottom: 60px;
  }

  .path-step {
    flex-direction: row !important;
    justify-content: flex-start;
  }

  .step-node {
    margin: 0 20px 0 12px;
  }

  .step-card {
    width: calc(100% - 70px);
    /* Ensure proper overflow on mobile */
    max-width: calc(100% - 70px);
  }

  .zen-header {
    text-align: left;
    padding-left: 10px;
  }

  /* Ensure links wrap properly on mobile */
  .step-links {
    gap: 8px 12px;
  }
}
</style>

