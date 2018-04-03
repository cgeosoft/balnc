declare interface ProfileType {
    name: string
    server?: {
        host: string
        user: string
        pass: string
    }
}

export type Profile = ProfileType
