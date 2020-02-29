
export type Profile = {
  key: string
  name: string
  createdAt?: number
  plugins: { [key: string]: boolean }
  layout?: 'box' | 'fluid',
  analytics?: boolean,
  db?: {
    cache?: boolean
    remote?: boolean
    host?: string
    key?: string
    type?: 'couch' | 'graphql'
    username?: string
    token?: string
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
    analytics: true,
    reports: true
  },
  layout: 'box',
  analytics: false
}
