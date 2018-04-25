import { Component, OnInit, ElementRef, NgZone, Renderer, ViewChild } from '@angular/core'
import { RxCollection } from 'rxdb'
import { BehaviorSubject } from 'rxjs/Rx'
import { Router, RouterEvent, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, Route } from '@angular/router'

import * as _ from 'lodash'

import { HelperService } from '@blnc/core/common/services/helper.service'
import { ConfigService } from '@blnc/core/common/services/config.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {

  @ViewChild('spinnerElement')

  spinnerElement: ElementRef

  constructor(
    private router: Router,
    private ngZone: NgZone,
    private configService: ConfigService,
    private renderer: Renderer
  ) {
    router.events.subscribe((event: RouterEvent) => {
      this._navigationInterceptor(event)
    })
  }

  menu: any[] = []

  async ngOnInit() {
    this.menu = this.configService.getMainMenu()
  }

  private _navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.ngZone.runOutsideAngular(() => {
        this.renderer.setElementClass(this.spinnerElement.nativeElement, 'active', true)
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
    }
  }

  private _hideSpinner(): void {
    this.ngZone.runOutsideAngular(() => {
      this.renderer.setElementClass(this.spinnerElement.nativeElement, 'active', false)
    })
  }
}
