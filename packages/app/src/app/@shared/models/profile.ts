import { RemoteConfig } from '../../@core/rxdb/models/config'

export type Profile = {
  key?: string
  name?: string
  createdAt?: number
  remote: RemoteConfig
  plugins: { [key: string]: boolean }
  layout?: 'container' | 'container-fluid'
}

export const DEMO_PROFILE: Profile = {
  key: 'demo',
  name: 'Demo',
  remote: {
    enabled: false,
    username: 'John'
  },
  plugins: {
    business: true,
    projects: true,
    boards: true,
    presentations: true
  },
  layout: 'container'
}
