import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { SharedModule } from '@balnc/shared'
import { ContactCreateComponent } from './contact-create/contact-create.component'
import { ContactComponent } from './contact/contact.component'
import { ContactsComponent } from './contacts/contacts.component'

@NgModule({
  declarations: [
    ContactsComponent,
    ContactComponent,
    ContactCreateComponent
  ],
  entryComponents: [
    ContactCreateComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        data: {
          breadcrumb: false
        },
        component: ContactsComponent
      },
      {
        path: ':id',
        data: {
          breadcrumb: {
            label: '#Contact'
          }
        },
        component: ContactComponent
      }
    ])
  ]
})
export class ContactsModule { }
