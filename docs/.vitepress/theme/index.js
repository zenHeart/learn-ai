import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import LearningPath from './components/LearningPath.vue'
import CatalogList from './components/CatalogList.vue'
import AIToolsGallery from './components/AIToolsGallery.vue'
import AIToolsLayout from './layouts/ai-tools.vue'
import ProductHubLayout from './layouts/product-hub.vue'
import NotFound from './components/NotFound.vue'
import SymptomRouter from './components/SymptomRouter.vue'
import LadderStepper from './components/LadderStepper.vue'
import ThemeEnhance from './components/ThemeEnhance.vue'
import './styles/index.css'

export default {
  extends: DefaultTheme,
  Layout() {
    // The default theme renders its own 404 via the `not-found` slot, so we
    // inject our branded, i18n-aware NotFound there (the theme-level NotFound
    // export is only used by fully custom themes). `layout-bottom` mounts the
    // single client enhancement layer (back-to-top + mermaid zoom).
    return h(DefaultTheme.Layout, null, {
      'not-found': () => h(NotFound),
      'layout-bottom': () => h(ThemeEnhance)
    })
  },
  enhanceApp({ app }) {
    app.component('LearningPath', LearningPath)
    app.component('CatalogList', CatalogList)
    app.component('AIToolsGallery', AIToolsGallery)
    app.component('SymptomRouter', SymptomRouter)
    app.component('LadderStepper', LadderStepper)
    // 注册自定义布局
    app.component('ai-tools', AIToolsLayout)
    app.component('product-hub', ProductHubLayout)
  }
}
