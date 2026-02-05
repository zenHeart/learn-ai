import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import LearningPath from './components/LearningPath.vue'
import AIToolsGallery from './components/AIToolsGallery.vue'
import AIToolsLayout from './layouts/ai-tools.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {})
  },
  enhanceApp({ app }) {
    app.component('LearningPath', LearningPath)
    app.component('AIToolsGallery', AIToolsGallery)
    // 注册自定义布局
    app.component('ai-tools', AIToolsLayout)
  }
}
