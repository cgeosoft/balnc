import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@balnc/shared';

import { ContactComponent } from './contact/contact.component';
import { OverviewComponent } from './overview/overview.component';
import { ContactsRoutes } from './contacts.routes';
import { ContactsService } from '../_shared/services/contacts.service';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(ContactsRoutes)
  ],
  declarations: [
    OverviewComponent,
    ContactComponent
  ],
  providers: [
    ContactsService
  ]
})
export class ContactsModule { }
