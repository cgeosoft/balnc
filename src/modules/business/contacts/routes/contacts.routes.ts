import { Routes } from "@angular/router";
import { ContactsOverviewComponent, ContactItemComponent } from "@blnc/business/contacts/components";
import { ContactsService } from "@blnc/business/contacts/services/contacts.service";

const routes: Routes = [{
  path: '',
  resolve: {
    db: ContactsService,
  },
  children: [
    { path: 'overview', component: ContactsOverviewComponent },
    { path: 'contact/:id', component: ContactItemComponent },
    { path: '', redirectTo: "overview" },
  ]
}]

export const ContactsRoutes = routes
