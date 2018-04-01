import { Component, OnInit, ElementRef, NgZone, Renderer, ViewChild } from '@angular/core'
import { RxCollection } from 'rxdb'
import { ConfigService } from '@blnc/core/config/config.service'
import { BehaviorSubject } from 'rxjs/Rx'
import { Router, RouterEvent, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router'

import * as _ from 'lodash'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {

  profile$: BehaviorSubject<any>

  @ViewChild('spinnerElement')


  // Instead of holding a boolean value for whether the spinner
  // should show or not, we store a reference to the spinner element,
  // see template snippet below this script
  spinnerElement: ElementRef

  constructor(
    private configService: ConfigService,
    private router: Router,
    private ngZone: NgZone,
    private renderer: Renderer
  ) {
    router.events.subscribe((event: RouterEvent) => {
      this._navigationInterceptor(event)
    })
  }

  menu: any[] = []

  ngOnInit() {

    this.profile$ = this.configService.profile$

    this.menu = _.chain(ConfigService.modules)
      .filter(m => (m.isActive && m.hasMenu))
      .value()
  }

  // Shows and hides the loading spinner during RouterEvent changes
  private _navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      // We wanna run this function outside of Angular's zone to
      // bypass change detection
      this.ngZone.runOutsideAngular(() => {
        this.renderer.setElementClass(this.spinnerElement.nativeElement, 'active', true)
      })
    }
    if (event instanceof NavigationEnd) {
      this._hideSpinner()
    }
    // Set loading state to false in both of the below events to
    // hide the spinner in case a request fails
    if (event instanceof NavigationCancel) {
      this._hideSpinner()
    }
    if (event instanceof NavigationError) {
      this._hideSpinner()
    }
  }

  private _hideSpinner(): void {
    // We wanna run this function outside of Angular's zone to
    // bypass change detection,
    this.ngZone.runOutsideAngular(() => {
      // For simplicity we are going to turn opacity on / off
      // you could add/remove a class for more advanced styling
      // and enter/leave animation of the spinner
      this.renderer.setElementClass(this.spinnerElement.nativeElement, 'active', false)
    })
  }
}
