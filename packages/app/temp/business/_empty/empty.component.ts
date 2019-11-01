import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { ConfigService } from '@balnc/core'
import { StateService } from '../_shared/services/state.service'

@Component({
  selector: 'app-business-empty',
  template: '<app-empty icon="building" message="Business" submessage="Open a contact or create a new one"></app-empty>'
})
export class EmptyComponent {

  constructor(
    private router: Router,
    private stateService: StateService,
    private configService: ConfigService
  ) { }

  async ngAfterViewInit() {
    if (this.stateService.opened.length) {
      await this.router.navigate(this.stateService.opened[this.configService.selected][0].route)
    }
  }
}
