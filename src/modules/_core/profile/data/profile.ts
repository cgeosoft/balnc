declare interface ProfileType {
    alias?: string
    name: string
    secret?: string
    database?: DatabaseConfigType
    params?: any
}

declare interface DatabaseConfigType {
    host?: string
    username?: string
    password?: string
}

export type DatabaseConfig = DatabaseConfigType
export type Profile = ProfileType
