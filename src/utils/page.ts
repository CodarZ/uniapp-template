/** 关于 page 的方法 */
import { pages, subPackages, tabBar } from '@/pages.json'

/** 获取当前页面栈最后一页，也其实就是当前页 */
export function getCurrentPage() {
  const allPages = getCurrentPages()
  return allPages[allPages.length - 1]
}

/** 判断当前页，是否是 tabbar 页面 */
export function isTabbar() {
  if (!tabBar) return false

  const currentPath = getCurrentPage().route
  return !!tabBar.list.find((e) => e.pagePath === currentPath)
}

/** 解码 url */
export function ensureDecodeURIComponent(url: string) {
  let temp = url
  try {
    while (temp.startsWith('%')) {
      const decoded = decodeURIComponent(temp)
      if (decoded === temp) break // 防止死循环
      temp = decoded
    }
  } catch (error) {
    console.error('解码失败:', error)
  }
  return temp
}
/** 解析 url 得到 path 和 query */
export function getUrlObj(url: string) {
  const [path, queryStr] = url.split('?')

  if (!queryStr) {
    return { path, query: {} }
  }

  const query: Record<string, string> = {}

  queryStr.split('&').forEach((item) => {
    const [key, value = ''] = item.split('=')
    if (key) {
      try {
        query[key] = ensureDecodeURIComponent(value)
      } catch {
        console.error('参数解码失败:', key, value)
        query[key] = value // 失败时保留原值
      }
    }
  })

  return { path, query }
}

/**
 * 包括主包和分包的所有页面
 * @param key 关键字
 * @returns 筛选后的页面
 */
export function getAllPages(key = '') {
  const mainPages = pages
    // @ts-ignore
    .filter((page) => !key || Boolean(page[key]))
    .map((page) => ({
      ...page,
      path: `/${page.path}`, // 确保路径以 `/` 开头
    }))

  // 这里处理分包
  const subPages: any[] = []
  subPackages.forEach((subPageObj) => {
    const { root, pages: subPageList = [] } = subPageObj

    subPageList
      .filter((page) => !key || Boolean(page[key]))
      .forEach((page: { path: string } & Record<string, any>) => {
        subPages.push({
          ...page,
          path: `/${root}/${page.path}`,
        })
      })
  })

  return [...mainPages, ...subPages]
}

/** 获取需要登录的页面, 包括主包和分包 */
export const getNeedLoginPages = (): string[] => getAllPages('needLogin').map((page) => page.path)
export const needLoginPages: string[] = getAllPages('needLogin').map((page) => page.path)
