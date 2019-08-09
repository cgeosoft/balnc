import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@balnc/shared';
import { ContactCreateComponent } from './contact-create/contact-create.component';
import { ContactComponent } from './contact/contact.component';
import { ContactsComponent } from './contacts/contacts.component';

@NgModule({
  declarations: [
    ContactsComponent,
    ContactComponent,
    ContactCreateComponent,
  ],
  entryComponents:[
    ContactCreateComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: '', component: ContactsComponent },
      { path: ':id', component: ContactComponent }
    ])
  ]
})
export class ContactsModule { }
