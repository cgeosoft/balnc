import { Component, OnInit } from '@angular/core';
import { ConfigService, Plugin, Profile } from '@balnc/core';

@Component({
  selector: 'settings-plugins',
  templateUrl: './plugins.component.html'
})
export class PluginsComponent implements OnInit {

  plugins: Plugin[]
  profile: Profile

  constructor (
    private configService: ConfigService
  ) { }

  ngOnInit () {
    this.profile = this.configService.getProfile()
    this.plugins = this.configService.plugins
  }
  setPluginStatus (pluginId: string,status: boolean) {
    this.profile.plugins[pluginId] = status
    this.configService.saveProfile(this.profile)
  }
}
