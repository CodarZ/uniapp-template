/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent<object, object, any>
  export default component
}

interface ImportMetaEnv {
  /** 网站标题，应用名称 */
  readonly VITE_APP_TITLE: string
  /** 后台接口地址 */
  readonly VITE_SERVER_BASEURL: string
  /** 上传图片地址 */
  readonly VITE_UPLOAD_BASEURL: string

  /** uniapp AppId */
  readonly VITE_UNI_APPID: string
  /** 微信 AppId */
  readonly VITE_WX_APPID: string

  /** 是否清除 console */
  readonly VITE_DELETE_CONSOLE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
