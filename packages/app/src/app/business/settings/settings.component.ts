import { Component } from '@angular/core'
import { AgreementsService } from '../_shared/repos/agreements.repo'
import { ContactsRepo } from '../_shared/repos/contacts.repo'

@Component({
  selector: 'app-business-settings',
  templateUrl: './settings.component.html',
  host: { 'class': 'page' }

})
export class SettingsComponent {
  generating: boolean
  generated: number

  constructor(
    private contactsService: ContactsRepo,
    private agreementsService: AgreementsService
  ) { }

  async generateDemoData() {
    if (!confirm('Are you sure?')) return
    await this.contactsService.generateDemoData()
    await this.agreementsService.generateDemoData()
    this.generated = Date.now()
  }
}
