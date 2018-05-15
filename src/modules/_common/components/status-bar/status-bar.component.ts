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

  profileName: string
  user: string
  version: string

  isOnline = navigator.onLine

  constructor(
    private configService: ConfigService,
    private profileService: ProfileService,
  ) { }

  ngOnInit() {
    const profile = this.profileService.getCurrent()
    this.profileName = profile.name
    this.user =  this.profileService.username
    this.version = this.configService.version

    Observable.fromEvent(window, 'online')
      .subscribe(e => {
        this.isOnline = true
      })

    Observable.fromEvent(window, 'offline')
      .subscribe(e => {
        this.isOnline = false
      })

  }

}
