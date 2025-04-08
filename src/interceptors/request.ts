import { getToken } from '@/utils/auth'
// #ifndef H5
import { MiniProgramBaseENV } from '@/utils/env'
import { platform } from '@/utils/platform'
import qs from 'qs'
// #endif

/**
 * 适配 openapi-ts-request 的 request 方法
 * 把 params 变为 query
 * headers 加入到 header 里
 */
const _requestInterceptor = {
  invoke(options: _RequestCustomOptions) {
    /**
     * ---------------- 处理 URL -------------------
     * H5 开发环境代理  在 vite.config.ts 中配置
     * H5 生产环境 匹配前缀，替换为 env 中的确切地址
     *
     * 小程序 匹配前缀，替换为 env 中的确切地址
     *
     *  一些自定义前缀，需要同步于 openapi-ts-request.config.ts 中的 apiPrefix
     */

    if (!options.url.startsWith('http')) {
      // 非 http 开头需拼接地址
      if (options.url.startsWith('/api')) {
        // #ifdef H5
        if (import.meta.env.PROD) {
          const noPrefixURL = options.url.replace(/^\/api/, '')
          options.url += `${import.meta.env.VITE_SERVER_BASEURL}${noPrefixURL}`
        } else {
          console.log('H5 开发环境 走 vite 代理')
        }
        // #endif

        // #ifndef H5
        const noPrefixURL = options.url.replace(/^\/api/, '')
        options.url = `${MiniProgramBaseENV.SERVER_URL}${noPrefixURL}`
        // #endif
      }
    }

    if (options.params) {
      const queryStr = qs.stringify(options.params)
      if (options.url.includes('?')) {
        options.url += `&${queryStr}`
      } else {
        options.url += `?${queryStr}`
      }

      delete options.params
    }

    // ---------------- 处理 header ----------------
    if (options.headers) {
      options.header = Object.assign(
        {
          platform,
        },
        options.header,
        options.headers,
      )

      delete options.headers
    }

    // 认证信息
    const token = getToken()
    if (token) {
      options.header.authorization = `${token}`
    }

    console.log('----处理后----', options)
  },
}

export const requestInterceptor = {
  install() {
    uni.addInterceptor('request', _requestInterceptor)
  },
}
