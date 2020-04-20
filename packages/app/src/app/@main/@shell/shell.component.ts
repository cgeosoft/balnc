import { Component } from '@angular/core'
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent } from '@angular/router'
import { ConfigService, Integration, IntegrationsRepo, RxDBService, ServerIntegration, UpdateService, User, UsersRepo } from '@balnc/core'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { ToastrService } from 'ngx-toastr'
import { Subscription } from 'rxjs'
import { LoginComponent } from '../../@main/login/login.component'
import { Helpers } from '../../@shared/helpers'
import { UserFormComponent } from '../user-form/user-form.component'

@Component({
  selector: 'app-main-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class MainShellComponent {

  async setUsers (users: User[]) {
    const promises = users.map(async (user) => {
      const res = {
        id: user._id,
        avatar: null
      }
      const attachment = await this.usersRepo.getAttachment(user._id, 'avatar')
      if (attachment) {
        const blob = await attachment.getData()
        res.avatar = await Helpers.getImage(blob, attachment.type)
      }
      return res
    })
    const avatars = await Promise.all(promises)
    this.configService.userAvatars = avatars.reduce((l, i) => {
      l[i.id] = i.avatar
      return l
    }, {})
    this.configService.users = users
  }

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
    private usersRepo: UsersRepo,
    private integrationsRepo: IntegrationsRepo,
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

    this.usersRepo.allm$().subscribe(async (users: User[]) => {
      await this.setUsers(users)
      if (!this.configService.user) {
        this.modal.open(UserFormComponent, { size: 'sm', centered: true })
      }
    })

    this.integrationsRepo.allm$().subscribe(async (integrations: Integration[]) => {
      integrations.sort((a, b) => a._date - b._date)
      this.configService.integrations = integrations.reduce((l, i) => {
        l[i._group] = i
        return l
      }, {})
      await this.configureServer()
    })
  }

  private async configureServer () {
    const server = this.configService.integrations?.server as ServerIntegration
    if (!server?.enabled) {
      this.dbService.disableRemoteDB()
      return
    }

    const needAuth = await this.dbService.needAuthentication()
    if (!needAuth) {
      this.dbService.enableRemoteDB()
      return
    }

    const login = this.modal.open(LoginComponent, { size: 'sm', centered: true })
    const { username, password } = await login.result

    await this.dbService
      .authenticate(username, password)
      .then(() => {
        this.toastr.success('Login to remote database. Data will sync...')
        this.dbService.enableRemoteDB()
      })
      .catch(() => {
        return this.integrationsRepo.update(server._id, { dbEnable: false })
      })
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
