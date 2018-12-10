import PersonSchema from './person.json'
import CompanySchema from './company.json'
import ContactEventSchema from './contact-event.json'
import ContactSchema from './contact.json'

export const ContactsEntities = [{
//   name: 'persons',
//   schema: PersonSchema,
//   sync: true
// }, {
//   name: 'companies',
//   schema: CompanySchema,
//   sync: true
// }, {
//   name: 'contact_events',
//   schema: ContactEventSchema,
//   sync: true
// }, {
  name: 'contacts',
  schema: ContactSchema,
  sync: true
}]
