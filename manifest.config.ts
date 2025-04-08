import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { defineManifestConfig } from '@uni-helper/vite-plugin-uni-manifest'
import { loadEnv } from 'vite'

const ENV_DIR = fileURLToPath(new URL('./env', import.meta.url))
const ENV = loadEnv(process.env.NODE_ENV!, ENV_DIR)

export default defineManifestConfig({
  name: ENV.VITE_APP_TITLE,
  appid: ENV.VITE_UNI_APPID,
  description: '',
  versionName: '0.0.1',
  versionCode: '100',
  transformPx: false,
  locale: 'zh-CN',
  h5: {
    router: {
      base: ENV.VITE_APP_PUBLIC_BASE,
      mode: 'history',
    },
  },

  /* 小程序特有相关 */
  'mp-weixin': {
    appid: ENV.VITE_WX_APPID,
    setting: {
      urlCheck: false,
    },
    usingComponents: true,
    // __usePrivacyCheck__: true,
  },
  'mp-alipay': {
    usingComponents: true,
    styleIsolation: 'shared',
  },
})
