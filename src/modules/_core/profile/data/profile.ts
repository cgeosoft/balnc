declare interface ProfileType {
    alias: string
    name?: string
    secret?: string
    user?: {
        fullname: string
        username: string
        password: string
    }
    remoteDB?: string
    data?: any
}

export type Profile = ProfileType
