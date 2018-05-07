import { Routes } from "@angular/router";
import { ContactsOverviewComponent, ContactItemComponent } from "@balnc/business/contacts/components";
import { ContactsService } from "@balnc/business/contacts/services/contacts.service";

const routes: Routes = [{
  path: 'contacts',
  resolve: {
    db: ContactsService,
  },
  children: [
    { path: '', redirectTo: "overview" },
    { path: 'overview', component: ContactsOverviewComponent },
    { path: 'contact/:id', component: ContactItemComponent },
  ]
}]

export const ContactsRoutes = routes
