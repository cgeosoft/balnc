import { Component, OnDestroy, OnInit } from '@angular/core'
import { ConfigService } from '@blnc/common/services/config.service';
import { ProfileService } from '@blnc/core/profile/services/profile.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  menu: any;
  profile: any;
  config: any;
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
