import { Component, Input, OnInit } from '@angular/core'
import { ConfigService, RxDBService } from '@balnc/core'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import { Integration } from '../@shared/integration.model'
import { IntegrationConfig } from './../../../@shared/models/workspace'

@Component({
  selector: 'app-configure-integration',
  templateUrl: './configure-integration.component.html'
})
export class ConfigureIntegrationComponent implements OnInit {

  @Input() integration: Integration
  config: IntegrationConfig

  get modal () {
    return this.activeModal
  }

  constructor (
    private activeModal: NgbActiveModal,
    private configService: ConfigService,
    private dbService: RxDBService
  ) { }

  ngOnInit () {
    this.config = { ...this.configService.integrations[this.integration.key] }
  }

  async save () {
    await this.dbService.updateIntergration(this.integration.key, this.config)
    this.activeModal.close()
  }

}
