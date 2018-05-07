import { Component, OnInit, ElementRef, NgZone, Renderer, ViewChild } from '@angular/core'
import { RxCollection } from 'rxdb'
import { BehaviorSubject } from 'rxjs/Rx'
import { Router, RouterEvent, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, Route } from '@angular/router'

import * as _ from 'lodash'

import { HelperService } from '@balnc/common/services/helper.service'
import { ConfigService } from '@balnc/common/services/config.service';
import { ProfileService } from '@balnc/core/profile/services/profile.service';
import { Profile } from '@balnc/core/profile/data/profile';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {

  profile: Profile;
  @ViewChild('pageLoader')

  pageLoader: ElementRef

  constructor(
    private router: Router,
    private ngZone: NgZone,
    private configService: ConfigService,
    private profileService: ProfileService,
    private renderer: Renderer
  ) {
    router.events.subscribe((event: RouterEvent) => {
      this._navigationInterceptor(event)
    })
  }

  menu: any[] = []

  async ngOnInit() {
    this.profile = this.profileService.getCurrent()
    this.menu = this.configService.getMainMenu(this.profile)
  }

  private _navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.ngZone.runOutsideAngular(() => {
        this.renderer.setElementClass(this.pageLoader.nativeElement, 'active', true)
      })
    }
    if (event instanceof NavigationEnd) {
      this._hideSpinner()
    }
    if (event instanceof NavigationCancel) {
      this._hideSpinner()
    }
    if (event instanceof NavigationError) {
      this._hideSpinner()
    }
  }

  private _hideSpinner(): void {
    this.ngZone.runOutsideAngular(() => {
      this.renderer.setElementClass(this.pageLoader.nativeElement, 'active', false)
    })
  }
}
