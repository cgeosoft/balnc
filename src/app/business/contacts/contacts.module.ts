import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@balnc/shared';
import { ContactsService } from '../_shared/services/contacts.service';
import { ContactComponent } from './contact/contact.component';
import { OverviewComponent } from './overview/overview.component';


@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([])
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
