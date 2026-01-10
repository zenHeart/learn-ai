import DefaultTheme from 'vitepress/theme'
import LearningPath from './components/LearningPath.vue'
import './custom.css'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('LearningPath', LearningPath)
  }
}

