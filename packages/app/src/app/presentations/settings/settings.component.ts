import { Component } from '@angular/core'
import { PresentationsService } from '../@shared/services/presentations.service'

@Component({
  selector: 'app-presentations-settings',
  templateUrl: './settings.component.html',
  host: { 'class': 'page' }

})
export class SettingsComponent {
  generating: boolean
  generated: number

  constructor (
    private presentationsService: PresentationsService
  ) { }

  async generateDemoData () {
    if (!confirm('Are you sure?')) return
    await this.presentationsService.generateDemoData()
    this.generated = Date.now()
  }
}
