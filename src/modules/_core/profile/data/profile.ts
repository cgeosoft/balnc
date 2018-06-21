import { UrlSerializer } from "@angular/router";

declare interface ProfileType {
    alias?: string
    name?: string
    key?: string
    createdAt?: string
    remote?: DatabaseConfigType
    modules?: any
    params?: any
}

declare interface DatabaseConfigType {
    prefix?: string
    host?: string
}

export type DatabaseConfig = DatabaseConfigType
export type Profile = ProfileType
