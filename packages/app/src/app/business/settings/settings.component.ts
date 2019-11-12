import { Component } from '@angular/core'
import { DemoService } from '../_shared/services/demo.service'

@Component({
  selector: 'app-business-settings',
  templateUrl: './settings.component.html',
  host: { 'class': 'page' }

})
export class SettingsComponent {
  generating: boolean
  generated: number

  constructor(
    private demoService: DemoService
  ) { }

  async generateDemoData() {
    if (!confirm('Are you sure?')) return
    await this.demoService.generate()
    this.generated = Date.now()
  }
}
