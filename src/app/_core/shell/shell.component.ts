import { Component, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfigService } from '../services/config.service';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {

  profileName: string
  username: string

  networkStatus = navigator.onLine
  databaseStatus = false
  isOnline = false

  pageLoading = false

  plugins: Plugin[] = []

  menu: any[] = []

  constructor (
    private configService: ConfigService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.router.events.subscribe((event: RouterEvent) => {
      this._navigationInterceptor(event)
    })
  }

  get enabledPlugins () {
    return this.configService.enabledPlugins
  }

  get isClosed () {
    return this.configService.isSidebarClosed
  }

  get version () {
    return this.configService.version
  }

  get profile () {
    return this.configService.getProfile()
  }

  async ngOnInit () {

    if (!this.configService.profiles.length) {
      await this.router.navigate(['/setup'])
      return
    }

    if (this.profile) {
      this.profileName = this.profile.name
      this.username = this.configService.profile.remoteUsername
    }

    // observableFromEvent(window, 'online')
    //   .subscribe(e => {
    //     this.networkStatus = true
    //     this.setStatus()
    //   })

    // observableFromEvent(window, 'offline')
    //   .subscribe(e => {
    //     this.networkStatus = false
    //     this.setStatus()
    //   })

    this.setStatus()
  }

  setStatus () {
    this.isOnline = this.networkStatus && this.databaseStatus
  }

  toggleMenu () {
    this.configService.isSidebarClosed = !this.configService.isSidebarClosed
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
