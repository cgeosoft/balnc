import { ContactsService } from './contacts.service'
import { WrapperComponent } from './components/_wrapper/wrapper.component'
import { OverviewComponent } from './components/overview/overview.component'
import { ContactComponent } from './components/contact/contact.component'

export const ContactsRoutes = [{
  path: 'contacts',
  resolve: {
    srv: ContactsService
  },
  component: WrapperComponent,
  children: [
    { path: 'overview', component: OverviewComponent },
    { path: 'contact/:id', component: ContactComponent },
    { path: '', redirectTo: 'overview', pathMatch: 'full' }
  ]
}]
