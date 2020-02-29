
export type Profile = {
  key: string
  name: string
  createdAt?: number
  cache?: boolean
  remote?: {
    enabled?: boolean
    host?: string
    key?: string
    type?: 'couch' | 'graphql'
    username?: string
    token?: string
  }
  plugins: { [key: string]: boolean }
  layout?: 'box' | 'fluid',
  analytics?: boolean
}

export const DEMO_PROFILE: Profile = {
  key: 'default',
  name: 'default',
  cache: true,
  plugins: {
    business: true,
    projects: true,
    boards: true,
    presentations: true,
    documents: true,
    analytics: true,
    reports: true
  },
  layout: 'box',
  analytics: false
}
