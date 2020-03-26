import { Component } from '@angular/core'
import { ConfigService } from '@balnc/core'
import { environment } from 'src/environments/environment'

@Component({
  selector: 'app-settings-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['modules.component.scss']

})
export class ModulesComponent {

  get profile () {
    return this.configService.profile
  }

  get core () {
    return environment.modules.filter(p => p.type === 'CORE')
  }

  get integrations () {
    return environment.modules.filter(p => p.type === 'INTERGRATION')
  }

  get active () {
    if (!this.profile.modules) this.profile.modules = {}
    return Object.keys(this.profile.modules).reduce((l, k) => {
      l[k] = this.profile.modules[k].enabled
      return l
    }, {})
  }

  constructor (
    private configService: ConfigService
  ) { }

  setup (key: string) {
    const module = environment.modules.find(x => x.key === key)
    if (!module.config) {
      this.profile.modules[key] = {
        enabled: !this.profile.modules[key]?.enabled
      }
      this.configService.save(this.profile)
    }
  }
}
