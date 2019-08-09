import AgreementSchema from './schemas/agreement.json';
import CEventSchema from './schemas/cevent.json';
import ContactSchema from './schemas/contact.json';
import InvoiceSchema from './schemas/invoice.json';
import OrderSchema from './schemas/order.json';

export const ContactsEntities = [{
  name: 'contacts',
  schema: ContactSchema,
  sync: true
},{
  name: 'cevents',
  schema: CEventSchema,
  sync: true
}]

export const InvoicesEntities = [{
  name: 'invoices',
  schema: InvoiceSchema,
  sync: true
}]

export const OrdersEntities = [{
  name: 'orders',
  schema: OrderSchema,
  sync: true
}]

export const AgreementsEntities = [{
  name: 'agreements',
  schema: AgreementSchema,
  sync: true
}]
