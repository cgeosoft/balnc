
export type Profile = {
  key: string
  name: string
  created?: number
  plugins: { [key: string]: boolean }
  layout?: 'box' | 'fluid'
  errorReport?: boolean
  analytics?: boolean
  cache?: boolean
  server?: ServerConfig
  db?: DbConfig
  integrations?: {
    stripe?: {
      key: string
    }
  }
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
  plugins: {
    business: true,
    projects: true,
    boards: true,
    presentations: true,
    documents: true,
    analytics: false,
    reports: false
  },
  layout: 'box',
  errorReport: false,
  analytics: false
}
