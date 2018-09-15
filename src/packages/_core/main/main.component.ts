import { Component, OnInit } from '@angular/core'
import { fromEvent as observableFromEvent } from 'rxjs'
import { Router, RouterEvent, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router'
import { ToastrService } from 'ngx-toastr'

import { ConfigService, Profile, HelperService, Package } from '@balnc/common'

@Component({
  selector: 'core-main',
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

  packages: Package[]

  constructor (
    public configService: ConfigService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.router.events.subscribe((event: RouterEvent) => {
      this._navigationInterceptor(event)
    })
  }

  menu: any[] = []

  ngOnInit () {

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

    this.loadMenu()
  }

  loadMenu () {
    this.packages = this.configService.packages
      .filter(m => {
        return this.profile.packages &&
          this.profile.packages[m.id]
      })
      .map(p => {
        const v = { ...p }
        v.menu = v.menu.map(m => {
          m.icon = HelperService.getIcon(m.icon)
          return m
        })
        return v
      })
  }

  setStatus () {
    this.isOnline = this.networkStatus && this.databaseStatus
  }

  toggleSidemenu () {
    this.configService.sidebarClosed = !this.configService.sidebarClosed
  }

  private _navigationInterceptor (event: RouterEvent): void {
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

  private _hideSpinner (): void {
    this.pageLoading = false
  }
}
