import { Profile } from "@blnc/core/profile/data/profile";

declare interface ProfileConfigType {
    selectedProfile?: string
    profiles?: Profile[]
}

export type ProfileConfig = ProfileConfigType
