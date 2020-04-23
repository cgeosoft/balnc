import { HttpClient } from '@angular/common/http'
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { ServerIntegration } from '@balnc/core'
import environment from '../../../../environments/environment'

@Component({
  selector: 'app-integration-server',
  templateUrl: './server.component.html'
})
export class ServerComponent implements OnInit {

  @Input() config: ServerIntegration
  @Output() configChange = new EventEmitter<ServerIntegration>()

  copied = false
  databases = []

  get shareable () {
    if (!this.config.host) return null
    const config = {
      h: this.config.host,
      d: this.config.dbName
    }
    return `${window.location.protocol}//${window.location.host}/import?d=${btoa(JSON.stringify(config))}`
  }

  get servers () {
    return environment.servers
  }

  constructor (
    private http: HttpClient
  ) { }

  ngOnInit () {
    if (this.config.host) {
      this.hostChanged()
    }
  }

  hostChanged () {
    if (this.config.host.endsWith('/')) {
      this.config.host = this.config.host.slice(0, -1)
    }
    this.http
      .get(`${this.config.host}/db/_all_dbs`)
      .subscribe((dbs: string[]) => {
        this.databases = dbs.filter(db => !db.startsWith('_'))
      })
  }

  copy (event) {
    event.target.select()
    document.execCommand('copy')
    this.copied = true
  }
}
