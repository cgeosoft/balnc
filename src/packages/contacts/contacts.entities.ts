import { PersonSchema } from './models/person'
import { CompanySchema } from './models/company'
import { ContactEventSchema } from './models/contact-event'

export const ContactsEntities = [{
  name: 'persons',
  schema: PersonSchema,
  sync: true
}, {
  name: 'companies',
  schema: CompanySchema,
  sync: true
}, {
  name: 'contactEvents',
  schema: ContactEventSchema,
  sync: true
}]
