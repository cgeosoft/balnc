import { Injectable } from '@angular/core'
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { RxCollection } from 'rxdb';
import { RxProfileDocument, ProfileSchema } from '@blnc/core/profile/data/profile';
import { DatabaseService } from '@blnc/core/database/services/database.service';
import { ConfigService } from '@blnc/core/config/config.service';
import { Entity } from '@blnc/core/database/models/entity';

const entities: Entity[] = [{
    name: 'profile',
    schema: ProfileSchema,
    sync: false,
    single: true
}]

@Injectable()
export class ProfileService implements Resolve<any> {

    profileDB: RxCollection<RxProfileDocument>

    constructor(
        private dbService: DatabaseService,
        private configService: ConfigService,
    ) {
        console.log("ProfileService constructor")
        this.setup()
    }

    resolve(route: ActivatedRouteSnapshot): Promise<any> | boolean {
        console.log("ProfileService resolve")
        return this.setup()
    }

    async setup() {
        console.log("ProfileService setup")
        await this.dbService.setup(entities)
        this.profileDB = await this.dbService.get<RxProfileDocument>("profile")
        console.log("loaded", this.profileDB)
    }

    addProfile(alias: string, name: string) {
        const profile = this.profileDB.newDocument({
            alias: alias,
            name: name,
        })
        return profile.save()
    }

    async getProfile() {
        return await this.profileDB.find().exec();
    }

    async selectProfile(alias: string) {
        const profiles = await this.getProfile()

        const profile = profiles.find(x => {
            return x.alias === alias
        })

        // this.configService.profile$.next(profile)

        if (this.selectProfile) {
            localStorage.setItem("profile", alias)
            this.dbService.setNamespace(alias)
        }
    }
}
