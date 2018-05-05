import { Subject } from "rxjs/Subject"
import { RxCollection, RxReplicationState, RxDocumentBase } from "rxdb"
import { Observable, } from "rxjs/Observable"
import { Injectable, OnDestroy, OnInit } from "@angular/core"
import { ActivatedRouteSnapshot, Resolve } from "@angular/router"

import * as faker from "faker"
import * as moment from 'moment'
import * as _ from 'lodash'

import { RxContactDocument, ContactSchema } from "../data/contact"

import { Entity } from "@balnc/common/models/entity";
import { DatabaseService } from "@balnc/common/services/database.service";

const entities: Entity[] = [{
    name: 'contact',
    schema: ContactSchema,
    sync: true,
}]

@Injectable()
export class ContactsService implements Resolve<any> {

    contacts: RxCollection<RxContactDocument>

    constructor(
        private dbService: DatabaseService,
    ) { }

    async resolve(route: ActivatedRouteSnapshot): Promise<boolean> {
        await this.setup()
        return true
    }

    async setup() {
        await this.dbService.loadEntities(entities)
        this.contacts = await this.dbService.get<RxContactDocument>("contact")
    }

    async getContacts(params?: any) {
        const contacts = await this.contacts
            .find(params)
            .limit(50)
            .exec()

        return contacts
    }

    async getContact(contactId): Promise<RxContactDocument> {
        return await this.contacts.findOne(contactId).exec()
    }

    async addContact(contact: RxContactDocument) {
        const result = await this.contacts
            .newDocument(contact)
            .save()
        return result
    }

    async generateMock() {
        for (let i = 0; i < 10000; i++) {
            const project = await this.contacts.insert({
                name: `${faker.name.firstName()} ${faker.name.lastName()}`,
                address: `${faker.address.streetAddress(true)} ${faker.address.zipCode()}, ${faker.address.country()}`,
                email: `${faker.internet.exampleEmail()}`,
                phone: `${faker.phone.phoneNumber()}`,
                details: {},
                subContacts: []
            })
        }
    }

    async clearMock() {

    }
}
