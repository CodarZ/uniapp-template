/// <reference types='@dcloudio/types' />
export {}

declare module 'vue' {
  type Hooks = App.AppInstance & Page.PageInstance
  interface ComponentCustomOptions extends Hooks {}
}
