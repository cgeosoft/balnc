import { Component } from '@angular/core'
import { DemoService } from '../@shared/services/demo.service'

@Component({
  selector: 'app-projects-settings',
  templateUrl: 'settings.component.html'

})
export class SettingsComponent {

  generating: boolean
  generated: number

  constructor (
    private projectsService: DemoService
  ) { }

  async generateDemoData () {
    if (!confirm('Are you sure?')) return
    this.generating = true
    await this.projectsService.generate()
    this.generated = Date.now()
    this.generating = false
  }
}
