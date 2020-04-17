import { Component, EventEmitter, Input, Output } from '@angular/core'
import { ServerIntegration } from '@balnc/core'

@Component({
  selector: 'app-integration-server',
  templateUrl: './server.component.html'
})
export class ServerComponent {

  @Input() config: ServerIntegration
  @Output() configChange = new EventEmitter<ServerIntegration>()

  get shareable () {
    if (!this.config.enabled) return
    const config = {
      h: this.config.host,
      d: this.config.dbName
    }
    return `${window.location.protocol}//${window.location.host}/import?d=${btoa(JSON.stringify(config))}`
  }

  copy (event) {
    event.target.select()
    document.execCommand('copy')
  }
}
