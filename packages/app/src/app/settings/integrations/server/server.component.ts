import { Component, EventEmitter, Input, Output } from '@angular/core'
import { ServerIntegrationConfig } from '@balnc/shared'

@Component({
  selector: 'app-integration-server',
  templateUrl: './server.component.html'
})
export class ServerComponent {
  @Input() config: ServerIntegrationConfig
  @Output() configChange = new EventEmitter<ServerIntegrationConfig>()
}
