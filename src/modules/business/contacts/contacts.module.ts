import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { DatabaseModule } from '@blnc/core/database/database.module'
import { Entity } from '@blnc/core/database/models/entity';

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
