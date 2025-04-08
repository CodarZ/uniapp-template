// @ts-nocheck
import { _responseInterceptor } from '@/interceptors'
import Log from './log'

const DEFAULT_TIMEOUT = 1000 * 60 * 5 // 默认超时 5 分钟

/**
 * 请求方法, 适配 openapi-ts-request 的 request 方法
 */
export function request<T>(url: string, options: Omit<_RequestCustomOptions, 'url'> = {}) {
  return new Promise<T>((resolve, reject) => {
    uni.request({
      url,
      timeout: DEFAULT_TIMEOUT,
      // #ifndef MP-WEIXIN
      responseType: 'json',
      // #endif
      ...options,
      success: (res) => {
        /**
         * TODO res.data 数据的格式校验，这里默认 json
         * TODO res.data 长度（微信实时日志会显示错误）
         *  - 正常状态下, 服务器始终返回 res.statusCode 为 200
         *  - 而真正的接口状态存放在 res.data.code 中
         */
        const responseData = res.data as T // 开发者服务器返回的数据
        const title = responseData.msg || '系统异常'

        const flag = _responseInterceptor(res)
        if (flag) {
          Log.INFO(`【请求成功】`, responseData)
          resolve(responseData)
        } else {
          Log.ERROR(`【请求失败】 |  ${title}`, responseData)
          reject(new Error(title))
        }
      },
      fail: (err) => {
        // 只要开发者的服务器有响应，就不会走这里
        Log.ERROR(`【请求服务器无响应】 |  ${err.errno} ${err.errMsg}`)
        reject(new Error(err.errMsg || '请求服务器无响应'))
      },
      complete() {
        // uni.hideLoading();
      },
    })
  })
}

export default request
