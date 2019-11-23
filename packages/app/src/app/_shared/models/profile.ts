import { RemoteConfig } from '../../_core/rxdb/models/config'

export type Profile = {
  key?: string
  name?: string
  createdAt?: number
  remote: RemoteConfig
  plugins: { [key: string]: boolean }
  config?: any
}

export const DEMO_PROFILE: Profile = {
  key: 'demo',
  name: 'Demo',
  remote: {
    enabled: false,
    name: 'John'
  },
  plugins: {
    business: true,
    projects: true,
    boards: true,
    presentations: true
  }
}
