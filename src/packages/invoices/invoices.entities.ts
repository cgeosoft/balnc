import { InvoiceSchema } from './models/invoice'

export const InvoicesEntities = [{
  name: 'invoices',
  schema: InvoiceSchema,
  sync: true
}]
