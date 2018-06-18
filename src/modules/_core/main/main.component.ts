import { Component, OnInit, ElementRef, NgZone, Renderer2, ViewChild } from '@angular/core'
import { Router, RouterEvent, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router'
import { ConfigService } from '@balnc/common/services/config.service'
import { ProfileService } from '@balnc/core/profile/services/profile.service'
import { Profile } from '@balnc/core/profile/data/profile'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {

  profile: Profile
  @ViewChild('pageLoader')

  pageLoader: ElementRef
  smClosed: boolean

  constructor(
    private router: Router,
    private ngZone: NgZone,
    private configService: ConfigService,
    private profileService: ProfileService,
    private renderer: Renderer2,
    private toastr: ToastrService,
  ) {
    router.events.subscribe((event: RouterEvent) => {
      this._navigationInterceptor(event)
    })
  }

  menu: any[] = []

  ngOnInit() {
    this.profile = this.profileService.getCurrent()
    this.menu = this.configService.getMainMenu(this.profile)

    this.smClosed = localStorage.getItem("smClosed") === "true"
  }

  toggleSidemenu() {
    this.smClosed = !this.smClosed
    localStorage.setItem("smClosed", `${this.smClosed}`)
  }

  private _navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.ngZone.runOutsideAngular(() => {
        this.renderer.addClass(this.pageLoader.nativeElement, 'active')
      })
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
    this.ngZone.runOutsideAngular(() => {
      this.renderer.removeClass(this.pageLoader.nativeElement, 'active')
    })
  }
}
