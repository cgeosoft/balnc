import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { ContactsService } from '@balnc/business/contacts/services/contacts.service';
import { ContactsRoutes } from '@balnc/business/contacts/routes/contacts.routes';
import { ContactItemComponent, ContactsOverviewComponent } from '@balnc/business/contacts/components'
import { CommonModule } from '@balnc/common';

@NgModule({
  imports: [
    CommonModule,
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
