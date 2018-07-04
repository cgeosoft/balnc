import { Component, OnDestroy, OnInit } from '@angular/core'

import { ConfigService } from '@balnc/common'

@Component({
  selector: 'core-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  menu: any
  profile: any
  config: any
  constructor(
    private configService: ConfigService,
  ) { }

  ngOnInit() {
    this.config = this.configService.config
    this.profile = this.configService.getProfile()
    this.menu = this.configService.getMainMenu(this.profile)
  }

  ngOnDestroy() {
  }
}
