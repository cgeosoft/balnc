import { Component, Input, OnInit } from '@angular/core'
import { ConfigService } from '@balnc/core'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import { Integration } from '../@shared/integration.model'

@Component({
  selector: 'app-configure-integration',
  templateUrl: './configure-integration.component.html'
})
export class ConfigureIntegrationComponent implements OnInit {

  @Input() integration: Integration
  config: any
  schema: any

  get modal () {
    return this.activeModal
  }

  constructor (
    private activeModal: NgbActiveModal,
    private configService: ConfigService
  ) { }

  ngOnInit () {
    this.schema = this.integration.config
    this.config = { ...this.configService.workspace.integrations[this.integration.key] }
  }

  save () {
    this.activeModal.close(this.config)
  }

}
