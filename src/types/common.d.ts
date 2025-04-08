/** 实际情况下的请求类型 */
type _RequestCustomOptions = UniApp.RequestOptions & {
  /**
   * 适配 openapi 的参数处理
   * 对应于 query, 在项目中, 需要直接处理为拼接在 url 后面
   * GET 请求类型，是放在 data 中，自动处理的。
   */
  params?: Record<string, unknown>
  /** 适配 openapi 的 header 参数处理 */
  headers?: Record<string, unknown>
}
