declare interface IBalncModule {
  id: string
  title: string
  description: string
  icon: any
  path: string
  config?: BalncModuleConfig
}

declare interface IBalncModuleConfig {
  enabled: string
  menu: any[]
  settings: any
}

export type BalncModule = IBalncModule
export type BalncModuleConfig = IBalncModuleConfig
