import { Component, Input, OnInit } from '@angular/core';
import { Profile } from '@balnc/core/profile/data/profile';
import { ProfileService } from '@balnc/core/profile/services/profile.service';
import { ConfigService } from '@balnc/common/services/config.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';

@Component({
  selector: 'app-status-bar',
  templateUrl: "./status-bar.component.html",
  styleUrls: ['./status-bar.component.scss']
})
export class StatusBarComponent implements OnInit {

  profile: Profile
  profileName: string
  username: string
  version: string

  networkStatus = navigator.onLine
  databaseStatus = false
  isOnline = false

  constructor(
    private configService: ConfigService,
    private profileService: ProfileService,
  ) { }

  ngOnInit() {

    this.profile = this.profileService.getCurrent()
    this.profileName = this.profile.name
    this.username = this.profileService.username

    Observable.fromEvent(window, 'online')
      .subscribe(e => {
        this.networkStatus = true
        this.setStatus()
      })

    Observable.fromEvent(window, 'offline')
      .subscribe(e => {
        this.networkStatus = false
        this.setStatus()
      })

    this.setStatus()
  }

  setStatus() {
    this.isOnline = this.networkStatus && this.databaseStatus
  }

}