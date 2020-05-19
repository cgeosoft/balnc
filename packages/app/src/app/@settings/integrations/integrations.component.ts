import { Component, OnInit } from '@angular/core'
import { ConfigService } from '@balnc/core'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { INTEGRATIONS } from '../../@shared/consts/integrations'
import { ConfigureIntegrationComponent } from './configure-integration/configure-integration.component'

@Component({
  selector: 'app-settings-integrations',
  templateUrl: './integrations.component.html',
  styleUrls: ['integrations.component.scss']

})
export class IntegrationsComponent implements OnInit {

  integrations = INTEGRATIONS

  get active () {
    if (!this.configService.integrations) return {}
    return Object.keys(this.configService.integrations).reduce((l, k) => {
      l[k] = this.configService.integrations[k].enabled
      return l
    }, {})
  }

  constructor (
    private configService: ConfigService,
    private modal: NgbModal
  ) { }

  ngOnInit () {
    setTimeout(() => {
      this.configure('orbitdb')
    }, 1000);
  }

  configure (key: string) {
    const integration = INTEGRATIONS.find(x => x.key === key)
    if (integration.disabled) return
    const config = this.modal.open(ConfigureIntegrationComponent)
    config.componentInstance.integration = integration
  }
}
