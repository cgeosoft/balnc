declare interface ProfileType {
    alias?: string
    name: string
    secret?: string
    createdAt?: string
    database?: DatabaseConfigType
    modules?: any
    params?: any
}

declare interface DatabaseConfigType {
    prefix?: string
    host?: string
    username?: string
    password?: string
}

export type DatabaseConfig = DatabaseConfigType
export type Profile = ProfileType
