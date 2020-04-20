import { Component, HostBinding, OnInit } from '@angular/core'
import { ConfigService, UsersRepo } from '@balnc/core'
import { COLORS, IntegrationView } from '@balnc/shared'
import { MENU } from '../../@shared/models/menu'

@Component({
  selector: 'app-appbar',
  templateUrl: 'appbar.component.html',
  styleUrls: ['appbar.component.scss']
})
export class AppbarComponent implements OnInit {

  @HostBinding('class.compact') get compact() {
    return this.configService.user?.config?.menu?.size
      ? this.configService.user?.config?.menu?.size === 'compact'
      : true
  }

  username: string

  networkStatus = navigator.onLine
  databaseStatus = false
  isOnline = false

  pageLoading = false

  plugins: IntegrationView[] = []

  colors = COLORS

  get menu() {
    return [...MENU]
      .filter(m => this.user?.config?.menu?.items[m.label])
      .map((x, i) => {
        x.iconColor = this.colors[Object.keys(this.colors)[i]]['300']
        return x
      })
  }

  get isClosed() {
    return this.configService.isSidebarClosed
  }

  get user() {
    return this.configService.user
  }

  constructor(
    private usersRepo: UsersRepo,
    private configService: ConfigService
  ) { }

  ngOnInit() { }

  toggleMenu() {
    this.configService.isSidebarClosed = !this.configService.isSidebarClosed
  }
}
