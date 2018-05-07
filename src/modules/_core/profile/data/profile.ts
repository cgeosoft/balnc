import { UrlSerializer } from "@angular/router";

declare interface ProfileType {
    alias: string
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
    user?: string
    pass?: string
}

export type DatabaseConfig = DatabaseConfigType
export type Profile = ProfileType
