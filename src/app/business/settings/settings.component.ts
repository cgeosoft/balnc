import { Component } from '@angular/core';
import { ContactsService } from '../_shared/services/contacts.service';

@Component({
  selector: 'app-business-settings',
  templateUrl: './settings.component.html'
})
export class SettingsComponent {
  generating: boolean
  generated: number;

  constructor (
    private contactsService: ContactsService
  ) { }

  async generateDemoData () {
    if (!confirm('Are you sure?')) return
    await this.contactsService.generateDemoData()
    this.generated = Date.now()
  }
}
