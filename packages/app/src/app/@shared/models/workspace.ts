
export type Workspace = {
  key: string
  name: string
  created?: number
  layout?: 'box' | 'fluid'
  menuSize?: 'normal' | 'compact'
  menuHideItems?: string[]
  errorReport?: boolean
  analytics?: boolean
  cache?: boolean
  server?: ServerConfig
  db?: DbConfig
  integrations?: { [key: string]: IntegrationConfig & any }
}

export type ServerConfig = {
  type?: 'local' | 'remote'
  host?: string
}

export type DbConfig = {
  type?: 'couch' | 'graphql'
  host?: string
  key?: string
  username?: string
  token?: string
}

export const DEFAULT_WORKSPACE: Workspace = {
  key: 'default',
  name: 'default',
  integrations: {},
  layout: 'box',
  menuSize: 'normal',
  errorReport: false,
  analytics: false
}

export type IntegrationConfig = {
  enabled: boolean
}
