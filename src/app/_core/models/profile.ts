export type Profile = {
  id?: string
  name?: string
  createdAt?: number
  remoteHost?: string
  remoteUsername?: string
  remotePassword?: string
  remoteSync?: boolean
  plugins?: { [key: string]: boolean }
  config?: any
}

export const DEMO_PROFILE = {
  id: 'demo',
  name: 'demo',
  remoteHost: 'https://db.cgeosoft.com',
  remoteUsername: 'demo',
  remotePassword: 'demo',
  remoteSync: false,
  plugins: {
    business: true,
    projects: true,
    boards: true,
    presentations: true,
    analytics: true,
    reports: true
  }
}
