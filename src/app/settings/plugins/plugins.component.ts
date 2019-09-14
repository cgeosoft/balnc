import { Component, OnInit } from '@angular/core'
import { ConfigService } from '@balnc/core'
import { Plugin, Profile } from '@balnc/shared'

@Component({
  selector: 'app-settings-plugins',
  templateUrl: './plugins.component.html',
  styleUrls: ['plugins.component.scss']
})
export class PluginsComponent implements OnInit {

  plugins: Plugin[]
  profile: Profile

  constructor (
    private configService: ConfigService
  ) { }

  ngOnInit () {
    this.profile = this.configService.profile
    this.plugins = this.configService.plugins
  }

  switchStatus (pluginId: string) {
    this.profile.plugins[pluginId] = !this.profile.plugins[pluginId]
    this.configService.saveProfile(this.profile)
  }
}
