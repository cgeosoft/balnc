import { RemoteConfig } from './remote-config'

declare interface IProfile {
  alias?: string
  name?: string
  key?: string
  createdAt?: string
  remote?: RemoteConfig
  modules?: any
  params?: any
}

export type Profile = IProfile
