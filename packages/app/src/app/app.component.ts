import { Component } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { NavigationEnd, Router } from '@angular/router'
import * as Sentry from '@sentry/browser'
import { Angulartics2 } from 'angulartics2'
import { Angulartics2Woopra } from 'angulartics2/woopra'
import { ConfigService } from './@core'

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`
})
export class AppComponent {
  constructor (
    private analytics: Angulartics2Woopra,
    private configService: ConfigService,
    private router: Router,
    private titleService: Title,
    private angulartics2: Angulartics2
  ) {

    this.angulartics2.settings.developerMode = !this.configService.profile?.analytics
    this.analytics.startTracking()
    Sentry.getCurrentHub().getClient().getOptions().enabled = this.configService.profile?.errorReport

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        let title = this.getTitle(this.router.routerState, this.router.routerState.root).join(' - ')
        this.titleService.setTitle(`Balnc${title ? ` - ${title}` : ''}`)
      }
    })
  }

  getTitle (state, parent) {
    let data = []
    if (parent && parent.snapshot.data && parent.snapshot.data.title) {
      data.push(parent.snapshot.data.title)
    }

    if (state && parent) {
      data.push(...this.getTitle(state, state.firstChild(parent)))
    }
    return data
  }

}
