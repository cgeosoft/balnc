import { Component, Input } from '@angular/core'
import { Helpers } from '../../helpers'

@Component({
  selector: 'app-empty',
  templateUrl: './empty.component.html'
})
export class EmptyComponent {

  @Input() message = 'no items'
  @Input() submessage = null
  @Input() icon = 'expand'
  @Input('icon-spin') iconSpin = false

  get getIcon () {
    return Helpers.getIcon(this.icon)
  }
}
