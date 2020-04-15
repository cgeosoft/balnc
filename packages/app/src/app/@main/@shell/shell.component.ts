import { Component } from '@angular/core'
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent } from '@angular/router'
import { ConfigService, RxDBService, UpdateService } from '@balnc/core'
import { ServerIntegrationConfig } from '@balnc/shared'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { ToastrService } from 'ngx-toastr'
import { Subscription } from 'rxjs'
import { LoginComponent } from '../../@main/login/login.component'
import { ProfileComponent } from '../../@main/profile/profile.component'

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

  get layout () {
    switch (this.configService.user?.config?.layout) {
      case 'box': return 'container'
      case 'fluid': return 'container-fluid'
      default: return 'container'
    }
  }

  constructor (
    private router: Router,
    private configService: ConfigService,
    private toastr: ToastrService,
    private update: UpdateService,
    private dbService: RxDBService,
    private modal: NgbModal
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

    setTimeout(() => {
      this.dbService.workspace$.subscribe(async (workspace) => {
        this.configService.users = workspace['c'].users
        if (!this.configService.user) {
          this.modal.open(ProfileComponent)
        }

        this.configService.integrations = workspace['c'].integrations
        const server = this.configService.integrations?.server as ServerIntegrationConfig
        if (server?.enabled) {
          if (server?.dbEnable) {
            const needAuth = await this.dbService.needAuthentication()
            if (needAuth) {
              const login = this.modal.open(LoginComponent)
              const { username, password } = await login.result
              await this.dbService.authenticate(username, password)
            }
            this.dbService.enableRemoteDB()
          } else {
            this.dbService.disableRemoteDB()
          }
        }
      })
    }, 100)
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
