declare interface IProfile {
  alias?: string
  name?: string
  key?: string
  createdAt?: string
  remotePrefix?: string
  remoteHost?: string
  remoteUsername?: string
  remotePassword?: string
  remoteSync?: boolean
  packages?: any
  params?: any
}

export type Profile = IProfile
