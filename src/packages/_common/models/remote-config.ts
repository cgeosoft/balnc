declare interface IRemoteConfig {
  prefix?: string
  host?: string
  username?: string
  password?: string
  enableSync?: boolean
}

export type RemoteConfig = IRemoteConfig
