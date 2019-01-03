export type Profile = {
  id?: string
  name?: string
  createdAt?: string
  remoteHost?: string
  remoteUsername?: string
  remotePassword?: string
  remoteSync?: boolean
  bmodules?: { [key: string]: boolean }
  config?: any
}

export const DEMO_PROFILE = {
  id: 'demo',
  name: 'demo',
  remoteHost: 'https://db.cgeosoft.com',
  remoteUsername: 'demo',
  remotePassword: 'demo',
  remoteSync: false,
  bmodules: {
    business: true,
    projects: true,
    boards: true,
    presentations: true,
    analytics: true,
    reports: true
  }
}
