import { Component, OnDestroy, OnInit } from '@angular/core'
import { ConfigService } from '@balnc/common'
import { ProfileService } from '../profile/services/profile.service'

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
    private profileService: ProfileService,
  ) { }

  ngOnInit() {
    this.config = this.configService.config
    this.profile = this.profileService.getCurrent()
    this.menu = this.configService.getMainMenu(this.profile)
  }

  ngOnDestroy() {
  }
}
