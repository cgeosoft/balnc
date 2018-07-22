import { Component, Input, OnInit, ElementRef, NgZone, Renderer2, ViewChild } from '@angular/core'
import { fromEvent as observableFromEvent, Observable } from 'rxjs'
import { Router, RouterEvent, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router'
import { ToastrService } from 'ngx-toastr'

import { ConfigService, Profile } from '@balnc/common'

@Component({
  selector: 'core-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {

  profile: Profile
  smClosed: boolean

  profileName: string
  username: string
  version: string

  networkStatus = navigator.onLine
  databaseStatus = false
  isOnline = false

  pageLoading = false

  constructor(
    private router: Router,
    private ngZone: NgZone,
    private configService: ConfigService,
    private renderer: Renderer2,
    private toastr: ToastrService,
  ) {
    router.events.subscribe((event: RouterEvent) => {
      this._navigationInterceptor(event)
    })
  }

  menu: any[] = []

  ngOnInit() {

    this.version = this.configService.version

    this.profile = this.configService.getProfile()

    if (this.profile) {
      this.menu = this.configService.getMainMenu()
    }

    this.smClosed = localStorage.getItem("smClosed") === "true"

    if (this.profile) {
      this.profileName = this.profile.name
      this.username = this.configService.username
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
    this.smClosed = !this.smClosed
    localStorage.setItem("smClosed", `${this.smClosed}`)
  }

  private _navigationInterceptor(event: RouterEvent): void {
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
      this.toastr.error('Could not load module. Check your internet connection', 'Load Failed');
    }
  }

  private _hideSpinner(): void {
    this.pageLoading = false
  }
}
