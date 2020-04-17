import { Component, HostBinding } from '@angular/core'
import { ConfigService } from '@balnc/core'
import { Integration } from '@balnc/shared'
import { COLORS } from '../../@core/models/colors'
import { MENU } from '../../@core/models/menu'

@Component({
  selector: 'app-appbar',
  templateUrl: 'appbar.component.html',
  styleUrls: ['appbar.component.scss']
})
export class AppbarComponent {

  @HostBinding('class.compact') get compact () {
    return this.configService.user?.config?.menu?.size
      ? this.configService.user?.config?.menu?.size === 'compact'
      : true
  }

  username: string

  networkStatus = navigator.onLine
  databaseStatus = false
  isOnline = false

  pageLoading = false

  plugins: Integration[] = []

  colors = COLORS
  _menu: any[] = MENU

  get menu () {
    return this._menu.map((x) => {
      x.hide = (this.configService.user?.config?.menu?.items || []).indexOf(x.label) !== -1
      return x
    })
  }

  constructor (
    private configService: ConfigService
  ) {
    this._menu.forEach((x, i) => {
      x.color = this.colors[Object.keys(this.colors)[i]]['300']
    })
  }

  get isClosed () {
    return this.configService.isSidebarClosed
  }

  toggleMenu () {
    this.configService.isSidebarClosed = !this.configService.isSidebarClosed
  }
}
