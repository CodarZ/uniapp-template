// @ts-nocheck

import Log from '@/utils/log'

export function _responseInterceptor<T>(res: UniApp.RequestSuccessCallbackResult): boolean {
  let responseData: T | null = null

  try {
    if (typeof res.data === 'string') {
      responseData = JSON.parse(res.data) as T
    } else if (res.data && typeof res.data === 'object') {
      responseData = res.data as T
    } else {
      Log.ERROR('【请求失败】 |  返回数据, 无法被解析: ', responseData)
      throw new Error('无效的响应数据')
    }
  } catch {
    return false
  }

  if (res.statusCode === 200) {
    if (responseData.code === 200) {
      return true
    } else if (responseData.code === 401) {
      // 重新登录
      uni.showToast({
        title: responseData?.msg || '登录失效，请重新登录！',
        icon: 'none',
        duration: 4000,
        success() {
          uni.removeStorageSync('token')
          // uni.clearStorageSync();
          uni.reLaunch({
            url: '/pages/index/index',
          })
        },
      })
      return false
    } else {
      return false
    }
  } else {
    return false
  }
}
export function _uploadResponseInterceptor() {}
