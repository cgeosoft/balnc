import { Component } from '@angular/core';
import { ConfigService } from '@balnc/core';

@Component({
  selector: 'common-statusbar',
  templateUrl: './statusbar.component.html'
})
export class StatusbarComponent {
  constructor (
    private configService: ConfigService
  ) { }
  get version () {
    return this.configService.version
  }
  get profile () {
    return this.configService.profile.name
  }
  get username () {
    return this.configService.profile.remoteUsername
  }
}
