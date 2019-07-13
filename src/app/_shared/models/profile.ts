export type Profile = {
  id?: string
  name?: string
  createdAt?: number
  remote: {
    enabled: boolean
    host?: string
    username?: string
    password?: string
  }
  plugins: { [key: string]: boolean }
  config?: any
}

export const DEMO_PROFILE = {
  id: 'demo',
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
