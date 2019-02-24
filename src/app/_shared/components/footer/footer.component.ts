import { Component } from '@angular/core';
import { ConfigService } from '@balnc/core';

@Component({
  selector: 'common-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  constructor (
    private configService: ConfigService
  ) { }

  get version () {
    return this.configService.version
  }
}
