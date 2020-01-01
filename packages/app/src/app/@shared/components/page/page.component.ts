import { Component, Input } from '@angular/core'
import { ConfigService } from '@balnc/core'

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['page.component.scss']
})
export class PageComponent {
  @Input() breadcrumb: boolean = false
  @Input() menu = null
  @Input() search = null

  constructor(
    private config: ConfigService
  ) { }

  get layout() {
    return this.config.profile.layout
  }
}
