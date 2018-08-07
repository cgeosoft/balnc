import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { CommonModule } from '@balnc/common'
import { OverviewComponent } from './components/overview/overview.component'
import { PersonViewComponent } from './components/person-view/person-view.component'
import { CompanyViewComponent } from './components/company-view/company-view.component'
import { WrapperComponent } from './components/_wrapper/wrapper.component'

import { ContactsService } from './contacts.service'

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    WrapperComponent,
    OverviewComponent,
    PersonViewComponent,
    CompanyViewComponent
  ],
  providers: [
    ContactsService
  ]
})
export class ContactsModule { }
