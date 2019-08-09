import { RemoteConfig } from "../../_core/rxdb/config";

export type Profile = {
  key?: string
  name?: string
  createdAt?: number
  remote: RemoteConfig
  plugins: { [key: string]: boolean }
  config?: any
}

export const DEMO_PROFILE = {
  key: 'demo',
  name: 'Demo Profile',
  remote: {
    enabled: false,
    host: 'https://db.cgeosoft.com',
    username: 'demo',
    password: 'demo',
  },
  plugins: {
    business: true,
    projects: true,
    boards: true,
    presentations: true,
    analytics: true,
    reports: true
  }
}
