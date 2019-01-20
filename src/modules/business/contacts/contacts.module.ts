import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { CommonModule } from '@balnc/common'
import { OverviewComponent } from './components/overview/overview.component'
import { ContactComponent } from './components/contact/contact.component'
import { WrapperComponent } from './components/_wrapper/wrapper.component'

import { ContactsService } from './contacts.service'
import { ContactsRoutes } from './contacts.routes'

@NgModule({
  imports: [
    CommonModule,
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
