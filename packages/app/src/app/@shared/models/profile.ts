import { RemoteConfig } from '../../@core/rxdb/models/config'

export type Profile = {
  key?: string
  name?: string
  createdAt?: number
  remote: RemoteConfig
  plugins: { [key: string]: boolean }
  layout?: 'box' | 'fluid'
}

export const DEMO_PROFILE: Profile = {
  key: 'default',
  name: 'default',
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
