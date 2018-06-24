import { UrlSerializer } from "@angular/router";

export interface Profile {
    alias?: string
    name?: string
    key?: string
    createdAt?: string
    remote?: DatabaseConfig
    modules?: any
    params?: any
}

export interface DatabaseConfig {
    prefix?: string
    host?: string
    username?: string
    password?: string
}
