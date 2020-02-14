
export type Profile = {
  key: string
  name: string
  createdAt?: number
  data: {
    persist: boolean
  }
  remote: {
    enabled: boolean
    key?: string
    name?: string
    server?: string
    db?: string
    username?: string
    token?: string
    owner?: string
    members?: string[]
  }
  plugins: { [key: string]: boolean }
  layout?: 'box' | 'fluid'
}

export const DEMO_PROFILE: Profile = {
  key: 'default',
  name: 'default',
  data: {
    persist: false
  },
  remote: {
    enabled: false,
    username: 'John'
  },
  plugins: {
    business: true,
    projects: true,
    boards: true,
    presentations: true,
    documents: true,
    analytics: true,
    reports: true
  },
  layout: 'box'
}
