import { Component } from '@angular/core'
import { ConfigService } from '@balnc/core'
import { INTEGRATIONS } from './@shared/integration.model'

@Component({
  selector: 'app-settings-integrations',
  templateUrl: './integrations.component.html',
  styleUrls: ['integrations.component.scss']

})
export class IntegrationsComponent {

  get workspace () {
    return this.configService.workspace
  }

  integrations = INTEGRATIONS

  get active () {
    if (!this.workspace.integrations) this.workspace.integrations = {}
    return Object.keys(this.workspace.integrations).reduce((l, k) => {
      l[k] = this.workspace.integrations[k].enabled
      return l
    }, {})
  }

  constructor (
    private configService: ConfigService
  ) { }

  setup (key: string) {
    const module = INTEGRATIONS.find(x => x.key === key)
    if (!module.config) {
      this.workspace.integrations[key] = {
        enabled: !this.workspace.integrations[key]?.enabled
      }
      this.configService.save(this.workspace)
    }
  }
}
