import { LoaderComponent } from './../../common/components/loader/loader.component';
import { Injectable } from '@angular/core'

import * as _ from 'lodash'

import { Profile } from '@blnc/core/profile/data/profile';
import { ProfileConfig } from '@blnc/core/profile/data/config';

@Injectable()
export class ProfileService {

    lsName = "profiles-config"
    config: ProfileConfig

    setup() {
        const configRaw = localStorage.getItem(this.lsName)
        if (!configRaw) {
            this.init()
        } else {
            this.config = JSON.parse(configRaw)
        }
    }

    save() {
        localStorage.setItem(this.lsName, JSON.stringify(this.config))
    }

    init() {
        this.config = {
            selected: null,
            profiles: []
        }
    }

    clear() {
        this.init()
        this.save()
        this.setup()
    }

    select(name: string) {
        const profile = this.config.profiles.find(x => {
            return x.name === name
        })

        if (!profile) {
            throw new Error("Profile not found")
        }
        this.config.selected = profile.name
        this.save()
    }

    add(profile: Profile) {
        profile.alias = this.slugify(profile.name)
        this.config.profiles.push(profile)
        this.save()
    }

    get(): Profile {
        const profile = this.config.profiles.find(x => {
            return x.name === this.config.selected
        })
        return profile
    }

    private slugify(text) {
        return text.toString().toLowerCase()
            .replace(/\s+/g, '-')           // Replace spaces with -
            .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
            .replace(/\-\-+/g, '-')         // Replace multiple - with single -
            .replace(/^-+/, '')             // Trim - from start of text
            .replace(/-+$/, '');            // Trim - from end of text
    }
}
