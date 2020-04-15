import { Component, EventEmitter, Input, Output } from '@angular/core'
import { GiphyIntegrationConfig } from '@balnc/shared'

@Component({
  selector: 'app-integration-giphy',
  templateUrl: './giphy.component.html'
})
export class GiphyComponent {
  @Input() config: GiphyIntegrationConfig
  @Output() configChange = new EventEmitter<GiphyIntegrationConfig>()

}
