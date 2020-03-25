
export type Profile = {
  key: string
  name: string
  created?: number
  layout?: 'box' | 'fluid'
  errorReport?: boolean
  analytics?: boolean
  cache?: boolean
  server?: ServerConfig
  db?: DbConfig
  modules: { [key: string]: PluginConfig & any}
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

export const DEMO_PROFILE: Profile = {
  key: 'default',
  name: 'default',
  modules: {
    business: { enabled: true },
    projects: { enabled: true },
    boards: { enabled: true },
    presentations: { enabled: true },
    documents: { enabled: true },
    analytics: { enabled: false },
    reports: { enabled: false }
  },
  layout: 'box',
  errorReport: false,
  analytics: false
}

export type PluginConfig = {
  enabled: boolean
}
