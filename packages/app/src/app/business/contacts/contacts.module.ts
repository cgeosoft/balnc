import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { SharedModule } from '@balnc/shared'
import { ContactCreateComponent } from './contact-create/contact-create.component'
import { ContactManageComponent } from './contact-manage/contact-manage.component'
import { ContactTimelineComponent } from './contact-timeline/contact-timeline.component'
import { ContactComponent } from './contact/contact.component'
import { ContactsComponent } from './contacts/contacts.component'

@NgModule({
  declarations: [
    ContactsComponent,
    ContactComponent,
    ContactCreateComponent,
    ContactManageComponent,
    ContactTimelineComponent
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
        component: ContactComponent,
        children: [
          {
            path: 'timeline',
            data: {
              breadcrumb: {
                label: 'Timeline'
              }
            },
            component: ContactTimelineComponent
          },
          {
            path: 'manage',
            data: {
              breadcrumb: {
                label: 'Manage'
              }
            },
            component: ContactManageComponent
          },
          { path: '', redirectTo: 'timeline', pathMatch: 'full' }
        ]
      }
    ])
  ]
})
export class ContactsModule { }
