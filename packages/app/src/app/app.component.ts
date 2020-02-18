import { Component } from '@angular/core'
import { Angulartics2Woopra } from 'angulartics2/woopra'
import { ConfigService } from './@core'

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`
})
export class AppComponent {
  constructor (
    analytics: Angulartics2Woopra,
    configService: ConfigService
  ) {
    if (configService.profile && configService.profile.analytics) {
      analytics.startTracking()
    }
  }
}
