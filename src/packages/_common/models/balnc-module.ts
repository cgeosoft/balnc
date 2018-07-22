export interface BalncModule {
  id: string
  title: string
  description: string
  menu?: BalncModuleMenu[]
  config?: BalncModuleConfig
}

export interface BalncModuleMenu {
  id: string
  label: string
  icon: any
  path: string
}

export interface BalncModuleConfig {
  enabled: string
  menu: any[]
  settings: any
}
