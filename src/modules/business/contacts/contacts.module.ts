import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { ContactsService } from '@blnc/business/contacts/services/contacts.service';
import { ContactsRoutes } from '@blnc/business/contacts/routes/contacts.routes';
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
