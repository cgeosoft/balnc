import { Component, OnInit } from '@angular/core'
import { ConfigService } from '@balnc/core'
import { Profile } from '@balnc/shared'
import environment from '../../../environments/environment'

@Component({
  selector: 'app-settings-plugins',
  templateUrl: './plugins.component.html',
  styleUrls: ['plugins.component.scss']

})
export class PluginsComponent implements OnInit {

  profile: Profile

  get plugins () {
    return environment.plugins.filter(p => !p.disabled)
  }

  constructor (
    private configService: ConfigService
  ) { }

  ngOnInit () {
    this.profile = this.configService.profile
  }

  switch (key: string) {
    this.profile.plugins[key] = !this.profile.plugins[key]
    this.configService.save(this.profile)
  }
}
