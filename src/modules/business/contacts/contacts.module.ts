import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { ContactItemComponent, ContactsOverviewComponent } from './components'

import { CommonModule } from '@blnc/core/common/common.module';
import { ContactsService } from '@blnc/business/contacts/services/contacts.service';
import { ContactsRoutes } from '@blnc/business/contacts/routes/contacts.routes';

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
