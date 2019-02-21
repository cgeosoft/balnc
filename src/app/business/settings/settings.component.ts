import { Component } from '@angular/core';
import { ContactsService } from '../_shared/services/contacts.service';

@Component({
  selector: 'business-settings',
  templateUrl: './settings.component.html'
})
export class SettingsComponent {
  generating: boolean

  constructor (
    private contactsService: ContactsService
  ) { }

  async generate () {
    this.generating = true
    if (confirm('Are you sure?')) {
      await this.contactsService.generateDemoData()
    }
    this.generating = false
  }
}
