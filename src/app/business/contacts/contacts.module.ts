import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@balnc/shared';

import { WrapperComponent } from './components/_wrapper/wrapper.component';
import { ContactComponent } from './components/contact/contact.component';
import { OverviewComponent } from './components/overview/overview.component';
import { ContactsRoutes } from './contacts.routes';
import { ContactsService } from './contacts.service';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(ContactsRoutes)
  ],
  declarations: [
    WrapperComponent,
    OverviewComponent,
    ContactComponent
  ],
  providers: [
    ContactsService
  ]
})
export class ContactsModule { }
