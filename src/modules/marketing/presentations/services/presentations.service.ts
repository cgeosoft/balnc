import { Subject } from "rxjs/Subject";
import { RxCollection, RxReplicationState, RxDocumentBase } from "rxdb"
import { Observable, } from "rxjs/Observable";
import { Injectable } from "@angular/core"
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";

import * as moment from 'moment'

import { DatabaseService } from "@blnc/core/database/services/database.service"

import { Entity } from "@blnc/core/database/models/entity";
import { PresentationSchema } from "@blnc/marketing/presentations/data/presentation";

const entities: Entity[] = [{
    name: 'presentation',
    schema: PresentationSchema,
    sync: false,
}]

@Injectable()
export class PresentationsService implements Resolve<any> {

    constructor(
        private dbService: DatabaseService,
    ) {
    }

    resolve(route: ActivatedRouteSnapshot): Promise<any> | boolean {
        return this.setup()
    }

    async setup() {
        await this.dbService.setup(entities)
    }


}
