import { Component, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent } from '@angular/router';
import { BModule, ConfigService, Profile } from '@balnc/core';
import { ToastrService } from 'ngx-toastr';
import { fromEvent as observableFromEvent } from 'rxjs';

@Component({
  selector: 'common-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  profile: Profile

  profileName: string
  username: string
  version: string

  networkStatus = navigator.onLine
  databaseStatus = false
  isOnline = false

  pageLoading = false

  bmodules: BModule[] = []

  constructor(
    public configService: ConfigService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.router.events.subscribe((event: RouterEvent) => {
      this._navigationInterceptor(event)
    })
  }

  menu: any[] = []

  ngOnInit() {

    if (!this.configService.profiles.length) {
      this.router.navigate(['/setup'])
      return
    }

    this.version = this.configService.version

    this.profile = this.configService.getProfile()

    if (this.profile) {
      this.profileName = this.profile.name
      this.username = this.configService.profile.remoteUsername
    }

    observableFromEvent(window, 'online')
      .subscribe(e => {
        this.networkStatus = true
        this.setStatus()
      })

    observableFromEvent(window, 'offline')
      .subscribe(e => {
        this.networkStatus = false
        this.setStatus()
      })

    this.setStatus()
  }

  setStatus() {
    this.isOnline = this.networkStatus && this.databaseStatus
  }

  toggleSidemenu() {
    this.configService.sidebarClosed = !this.configService.sidebarClosed
  }

  private _navigationInterceptor(event: RouterEvent): void {
<<<<<<< HEAD:src/modules/_common/components/main/main.component.ts
    // console.log(event)
=======
>>>>>>> 691769442f885075ef7b2d4ff225f98d4258e0cd:src/app/_shared/components/main/main.component.ts
    if (event instanceof NavigationStart) {
      this.pageLoading = true
    }
    if (event instanceof NavigationEnd) {
      this._hideSpinner()
    }
    if (event instanceof NavigationCancel) {
      this._hideSpinner()
    }
    if (event instanceof NavigationError) {
      this._hideSpinner()
      this.toastr.error('Could not load module. Check your internet connection', 'Load Failed')
    }
  }

  private _hideSpinner(): void {
    this.pageLoading = false
  }
}
