import { Component } from '@angular/core'
import { ConfigService } from '@balnc/core'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { INTEGRATIONS } from './@shared/integration.model'
import { ConfigureIntegrationComponent } from './configure-integration/configure-integration.component'

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
    private configService: ConfigService,
    private modal: NgbModal
  ) { }

  configure (key: string) {
    const integration = INTEGRATIONS.find(x => x.key === key)
    const config = this.modal.open(ConfigureIntegrationComponent)
    config.componentInstance.integration = integration
    config.result.then((config) => {
      this.workspace.integrations[key] = config
      this.configService.save(this.workspace)
    }).catch(() => {})
  }
}
