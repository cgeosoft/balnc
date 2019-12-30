import { Component } from '@angular/core'
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent } from '@angular/router'
import { ConfigService } from '@balnc/core'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-main-shell',
  templateUrl: './@shell.component.html',
  styleUrls: ['./@shell.component.scss']
})
export class MainShellComponent {

  username: string

  networkStatus = navigator.onLine
  databaseStatus = false
  isOnline = false

  pageLoading = false

  plugins: Plugin[] = []

  menu: any[] = []

  constructor (
    private config: ConfigService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.router.events.subscribe((event: RouterEvent) => {
      this._navigationInterceptor(event)
    })
  }

  get layout () {
    return this.config.profile.layout
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
