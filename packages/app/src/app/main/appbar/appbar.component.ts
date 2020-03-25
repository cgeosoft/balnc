import { Component } from '@angular/core'
import { ConfigService } from '@balnc/core'
import { Module } from '@balnc/shared'

@Component({
  selector: 'app-appbar',
  templateUrl: 'appbar.component.html',
  styleUrls: ['appbar.component.scss']
})
export class AppbarComponent {
  username: string

  networkStatus = navigator.onLine
  databaseStatus = false
  isOnline = false

  pageLoading = false

  plugins: Module[] = []

  menu: any[] = []

  constructor (
    private configService: ConfigService
  ) { }

  get modules () {
    return this.configService.modules
  }

  get isClosed () {
    return this.configService.isSidebarClosed
  }

  toggleMenu () {
    this.configService.isSidebarClosed = !this.configService.isSidebarClosed
  }
}
