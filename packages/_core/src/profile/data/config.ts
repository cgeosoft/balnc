import { Profile } from "profile/data/profile";

declare interface ProfileConfigType {
    selectedProfile?: string
    profiles?: Profile[]
}

export type ProfileConfig = ProfileConfigType
