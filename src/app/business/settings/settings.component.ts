import { Component } from '@angular/core';
import { AgreementsService } from '../_shared/services/agreements.service';
import { ContactsService } from '../_shared/services/contacts.service';

@Component({
  selector: 'app-business-settings',
  templateUrl: './settings.component.html'
})
export class SettingsComponent {
  generating: boolean
  generated: number;

  constructor (
    private contactsService: ContactsService,
    private agreementsService: AgreementsService,
  ) { }

  async generateDemoData () {
    if (!confirm('Are you sure?')) return
    await this.contactsService.generateDemoData()
    await this.agreementsService.generateDemoData()
    this.generated = Date.now()
  }
}
