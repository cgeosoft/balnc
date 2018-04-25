import { Profile } from "@blnc/core/profile/data/profile";

declare interface ProfileConfigType {
    selected?: string
    profiles?: Profile[]
}

export type ProfileConfig = ProfileConfigType
