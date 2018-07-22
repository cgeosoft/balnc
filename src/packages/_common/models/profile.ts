import {RemoteConfig} from './remote-config'

export interface Profile {
    alias?: string
    name?: string
    key?: string
    createdAt?: string
    remote?: RemoteConfig
    modules?: any
    params?: any
}
