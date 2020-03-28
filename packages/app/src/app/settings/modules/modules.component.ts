import { Component } from '@angular/core'
import { ConfigService } from '@balnc/core'
import { environment } from 'src/environments/environment'

@Component({
  selector: 'app-settings-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['modules.component.scss']

})
export class ModulesComponent {

  get workspace () {
    return this.configService.workspace
  }

  get core () {
    return environment.modules.filter(p => p.type === 'CORE')
  }

  get integrations () {
    return environment.modules.filter(p => p.type === 'INTERGRATION')
  }

  get active () {
    if (!this.workspace.modules) this.workspace.modules = {}
    return Object.keys(this.workspace.modules).reduce((l, k) => {
      l[k] = this.workspace.modules[k].enabled
      return l
    }, {})
  }

  constructor (
    private configService: ConfigService
  ) { }

  setup (key: string) {
    const module = environment.modules.find(x => x.key === key)
    if (!module.config) {
      this.workspace.modules[key] = {
        enabled: !this.workspace.modules[key]?.enabled
      }
      this.configService.save(this.workspace)
    }
  }
}
