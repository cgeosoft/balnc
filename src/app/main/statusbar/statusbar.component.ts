import { Component } from '@angular/core'
import { ConfigService } from '@balnc/core'

@Component({
  selector: 'app-statusbar',
  templateUrl: './statusbar.component.html',
  styleUrls: ['statusbar.component.scss']
})
export class StatusbarComponent {

  constructor (
    private configService: ConfigService
  ) { }

  get version () {
    return this.configService.version
  }

  get profile () {
    return this.configService.profile
  }
}
