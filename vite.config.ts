import process from 'node:process'
import { fileURLToPath } from 'node:url'
import Uni from '@dcloudio/vite-plugin-uni'

import Components from '@uni-helper/vite-plugin-uni-components'
import { WotResolver } from '@uni-helper/vite-plugin-uni-components/resolvers'
import UniManifest from '@uni-helper/vite-plugin-uni-manifest'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig, loadEnv } from 'vite'
import ViteRestart from 'vite-plugin-restart'

const ENV_DIR = fileURLToPath(new URL('./env', import.meta.url))

// https://vitejs.dev/config/
export default ({ command, mode }) => {
  /**
   * mode: 区分生产环境还是开发环境
   * dev:h5            serve development
   * dev:mp-weixin     build development (注意: command 为 build)
   * build:mp-weixin   build production
   */
  console.log('command, mode -> ', command, mode)

  const { UNI_PLATFORM } = process.env
  console.log('平台 -> ', UNI_PLATFORM)

  const ENV = loadEnv(mode, ENV_DIR)
  console.log('环境变量 -> ', ENV)

  return defineConfig({
    envDir: ENV_DIR,
    plugins: [
      Components({
        dts: 'src/types/components.d.ts',
        dirs: ['src/components', 'src/layouts'],
        resolvers: [WotResolver()],
      }),
      AutoImport({
        imports: ['vue', 'uni-app'],
        dts: 'src/types/auto-imports.d.ts',
        dirs: ['src/hooks', 'src/apis/**/*'],
        eslintrc: { enabled: true },
        vueTemplate: true,
      }),
      UniManifest(),
      Uni(),
      ViteRestart({
        restart: ['vite.config.ts'],
      }),
    ],
    define: {
      __UNI_PLATFORM__: JSON.stringify(UNI_PLATFORM),
    },
    resolve: {
      alias: {
        '~': fileURLToPath(new URL('./', import.meta.url)),
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    css: {
      preprocessorOptions: {},
    },
    build: {
      sourcemap: ENV.VITE_SHOW_SOURCEMAP === 'true', // 方便非 H5 端调试
      target: 'es6',
      minify: mode === 'development' ? false : 'terser',
      terserOptions: {
        compress: {
          drop_console: JSON.parse(ENV.VITE_DELETE_CONSOLE || 'false'),
          drop_debugger: true,
        },
      },
    },
    server: {
      host: '0.0.0.0',
      hmr: true,
      port: 6616,
      cors: true,
      /**
       * 仅 H5 端生效，其他端不生效（其他端走 build, 不走 devServer)
       * 需要根据情况修改 interceptors/request.ts 中处理 URL 的部分代码
       */
      proxy: {
        '/api': {
          target: ENV.VITE_SERVER_BASEURL,
          secure: false,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  })
}
