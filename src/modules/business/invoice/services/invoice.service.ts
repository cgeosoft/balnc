import { Injectable, Injector } from "@angular/core"
import { Subject } from "rxjs"

import * as _ from 'lodash'
import * as moment from 'moment'

import { InvoiceSchema, RxInvoiceDoc, Invoice } from "@balnc/business/invoice/data/invoice"
import { BaseService } from "@balnc/common/services/base.service"

@Injectable()
export class InvoiceService extends BaseService {

    constructor(
        private injector: Injector,
    ) {
        super(injector)
        this._module = "@balnc/business"
        this._entities = [{
            name: 'invoice',
            schema: InvoiceSchema,
            sync: true,
        }]
    }

    async all(params: any = {}) {
        const data = await super._all<RxInvoiceDoc>("invoice", params)
        const invoices = data
        return invoices
    }

    async one(id: string) {
        const invoiceDoc = await super._one<RxInvoiceDoc>("invoice", id)
        const invoice = _.cloneDeep(invoiceDoc) as Invoice
        return invoice
    }
}
