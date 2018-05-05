import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { ContactsService } from '@balnc/business/contacts/services/contacts.service';
import { ContactsRoutes } from '@balnc/business/contacts/routes/contacts.routes';
import { ContactItemComponent, ContactsOverviewComponent } from './components'

@NgModule({
  imports: [
    RouterModule.forChild(ContactsRoutes),
  ],
  declarations: [
    ContactsOverviewComponent,
    ContactItemComponent,
  ],
  providers: [
    ContactsService
  ]
})
export class ContactsModule { }
