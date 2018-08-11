import { Component, Input, OnInit } from '@angular/core'
import { HelperService } from '../../services/helper.service'

@Component({
  selector: 'common-empty',
  templateUrl: './empty.component.html',
  styleUrls: ['./empty.component.scss']
})
export class EmptyComponent implements OnInit {

  @Input() message = 'no items'
  @Input() submessage = null
  @Input() icon = 'expand'

  _icon: string[]

  ngOnInit () {
    this._icon = HelperService.getIcon(this.icon)
  }

}
