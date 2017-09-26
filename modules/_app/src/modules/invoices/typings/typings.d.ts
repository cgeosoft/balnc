import * as RxDB from 'rxdb';

export class RxInvoiceDocument extends RxDB.RxDocument {
    orders: Array<string>;
    dateCreated: string;
    dateUpdated: string;
    dateIssued?: string;
    status: ("pending" | "issued");
    file?: string;
    comment?: string;
}

declare class RxInvoiceCollection extends RxDB.RxCollection<RxInvoiceDocument> {
}

export class RxInvoicesDatabase extends RxDB.RxDatabase {
    invoice?: RxInvoiceCollection;
}

export default {
    RxInvoiceDocument,
    RxInvoiceCollection,
    RxInvoicesDatabase
};
