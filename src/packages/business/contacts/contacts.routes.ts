import { OverviewComponent } from './components/overview/overview.component'
import { WrapperComponent } from './components/_wrapper/wrapper.component'
import { PersonViewComponent } from './components/person-view/person-view.component'
import { CompanyViewComponent } from './components/company-view/company-view.component'
import { ContactsService } from './contacts.service';

export const ContactsRoutes = [{
  path: 'contacts',
  resolve: {
    srv: ContactsService
  },
  component: WrapperComponent,
  children: [
    { path: 'overview', component: OverviewComponent },
    { path: 'person/:id', component: PersonViewComponent },
    { path: 'company/:id', component: CompanyViewComponent },
    { path: '', redirectTo: 'overview', pathMatch: 'full' }
  ]
}]
