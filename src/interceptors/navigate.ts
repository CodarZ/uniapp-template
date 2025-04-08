import { isLogin } from '@/utils/auth'
/**
 * 路由拦截，通常也是登录拦截
 * 这里大部分都是可以进入的，设置黑名单拦截
 */
import { needLoginPages as _needLoginPages, getNeedLoginPages } from '@/utils/page'
/** 默认登录页面 */
const loginRoute = '/pages/login/default/index'

// 黑名单拦截登录
const navigateToInterceptor = {
  // 注意，这里的 url 是 '/' 开头的，如 '/pages/index/index'，跟 'pages.json' 里面的 path 不同
  invoke({ url }: { url: string }) {
    const path = url.split('?')[0]
    // 为了防止开发时出现 BUG，每次都获取一下。
    const needLoginPages = import.meta.env.DEV ? getNeedLoginPages() : _needLoginPages

    console.log(`[拦截器] 访问路径: ${path}, 是否需要登录: ${needLoginPages.includes(path)}`)
    if (needLoginPages.includes(path)) {
      if (isLogin()) return true

      const redirectRoute = `${loginRoute}?redirect=${encodeURIComponent(url)}`
      uni.navigateTo({ url: redirectRoute })
      return false
    }
    return true
  },
}

export const navigateInterceptor = {
  install() {
    uni.addInterceptor('navigateTo', navigateToInterceptor)
    uni.addInterceptor('reLaunch', navigateToInterceptor)
    uni.addInterceptor('redirectTo', navigateToInterceptor)
  },
}
