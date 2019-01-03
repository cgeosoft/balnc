export type Profile = {
  id?: string
  name?: string
  createdAt?: string
  remoteHost?: string
  remoteUsername?: string
  remotePassword?: string
  remoteSync?: boolean
  packages?: { [key: string]: boolean }
  config?: any
}

export const DEMO_PROFILE = {
  id: 'demo',
  name: 'demo',
  remoteHost: 'https://db.cgeosoft.com',
  remoteUsername: 'demo',
  remotePassword: 'demo',
  remoteSync: false,
  packages: {
    'business': true,
    'projects': true,
    'boards': true,
    'presentations': true,
    'analytics': true,
    'reports': true
  }
}
