import { NgModule } from '@angular/core'
import { ContactsRepo } from './@shared/contacts.repo'

@NgModule({
  providers: [
    ContactsRepo
  ]
})
export class ContactsDataModule {
}
