import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'

// 模块统一导出
export * from './modules/user'

const pinia = createPinia()
pinia.use(
  createPersistedState({
    storage: {
      getItem: uni.getStorageSync,
      setItem: uni.setStorageSync,
    },
  }),
)

export default pinia
