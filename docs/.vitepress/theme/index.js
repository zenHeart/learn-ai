import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import LearningPath from './components/LearningPath.vue'
import AIToolsGallery from './components/AIToolsGallery.vue'
import AIToolsLayout from './layouts/ai-tools.vue'
import NotFound from './components/NotFound.vue'
import './styles/index.css'

export default {
  extends: DefaultTheme,
  Layout() {
    // The default theme renders its own 404 via the `not-found` slot, so we
    // inject our branded, i18n-aware NotFound there (the theme-level NotFound
    // export is only used by fully custom themes).
    return h(DefaultTheme.Layout, null, {
      'not-found': () => h(NotFound)
    })
  },
  enhanceApp({ app }) {
    app.component('LearningPath', LearningPath)
    app.component('AIToolsGallery', AIToolsGallery)
    // 注册自定义布局
    app.component('ai-tools', AIToolsLayout)
  }
}
