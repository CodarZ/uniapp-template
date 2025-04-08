import { createSSRApp } from 'vue'
import App from './App.vue'
import { navigateInterceptor, requestInterceptor } from './interceptors'
import pinia from './pinia'
import '@/styles/index.scss'

export function createApp() {
  const app = createSSRApp(App)

  app.use(pinia)
  app.use(navigateInterceptor)
  app.use(requestInterceptor)

  return {
    app,
  }
}
