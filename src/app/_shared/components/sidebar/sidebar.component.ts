import { Component } from '@angular/core';
import { ConfigService } from '@balnc/core';

@Component({
  selector: 'common-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {

  constructor (
    public configService: ConfigService
  ) { }

  get closed () {
    return this.configService.sidebarClosed
  }

}
