
export type Profile = {
  key: string
  name: string
  createdAt?: number
  plugins: { [key: string]: boolean }
  layout?: 'box' | 'fluid'
  errorReport?: boolean
  analytics?: boolean
  db?: {
    cache?: boolean
    remote?: {
      type?: 'local' | 'couch' | 'graphql'
      enabled?: boolean
      host?: string
      key?: string
      username?: string
      token?: string
    }
  }
  integrations?: {
    stripe?: {
      key: string
    }
  }
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
