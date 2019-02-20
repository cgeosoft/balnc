import { ContactsService } from '../_shared/services/contacts.service'
import { OverviewComponent } from './overview/overview.component'
import { ContactComponent } from './contact/contact.component'

export const ContactsRoutes = [{
  path: 'contacts',
  resolve: {
    srv: ContactsService
  },
  children: [
    { path: 'overview', component: OverviewComponent },
    { path: 'contact/:id', component: ContactComponent },
    { path: '', redirectTo: 'overview', pathMatch: 'full' }
  ]
}]
