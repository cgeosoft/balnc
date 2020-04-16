export interface Workspace {
  key: string
  name: string
  created: number
  version: number
  config: {
    errors?: boolean
    analytics?: boolean
    cache?: boolean
  }
}

export interface User {
  username: string
  email?: string
  avatar?: string
  owner?: boolean
  config?: {
    theme: 'light' | 'dark'
    layout?: 'box' | 'fluid'
    menu?: {
      size?: 'normal' | 'compact'
      items?: string[]
    }
  }
}

export interface IntegrationConfig {
  enabled: boolean
}

export interface GiphyIntegrationConfig extends IntegrationConfig {
  apiKey: string
}

export interface ServerIntegrationConfig extends IntegrationConfig {
  host: string
  dbEnable?: boolean
  dbName?: string
  dbHost?: string
}

export const DEFAULT_USER: User = {
  username: 'john',
  owner: false,
  config: {
    theme: 'light',
    layout: 'box',
    menu: {
      size: 'compact',
      items: null
    }
  }
}
export const WORKSPACE_VERSION = 2

export const DEFAULT_WORKSPACE: Partial<Workspace> = {
  version: WORKSPACE_VERSION,
  created: Date.now(),
  config: {
    errors: false,
    analytics: false,
    cache: false
  }
}
