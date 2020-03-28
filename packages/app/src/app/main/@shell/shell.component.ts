import { Component } from '@angular/core'
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent } from '@angular/router'
import { ConfigService, UpdateService } from '@balnc/core'
import { ToastrService } from 'ngx-toastr'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-main-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class MainShellComponent {

  username: string

  networkStatus = navigator.onLine
  databaseStatus = false
  isOnline = false

  pageLoading = false
  routeLabel = null

  plugins: Plugin[] = []

  menu: any[] = []
  update$: Subscription

  constructor (
    private config: ConfigService,
    private router: Router,
    private toastr: ToastrService,
    private update: UpdateService
  ) {
    this.router.events.subscribe((event: RouterEvent) => {
      this._navigationInterceptor(event)
    })
    this.update$ = this.update.status$.subscribe((status) => {
      if (status) {
        this.update$.unsubscribe()
        const toastrOptions = {
          disableTimeOut: true
        }
        this.toastr.info(
          'There is a new version of balnc. Please refresh to update.', 'Update', toastrOptions)
      }
    })
  }

  get layout () {
    switch (this.config.workspace.layout) {
      case 'box': return 'container'
      case 'fluid': return 'container-fluid'
      default: return 'container'
    }
  }

  private _navigationInterceptor (event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.pageLoading = true
      this.routeLabel = event.url
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
