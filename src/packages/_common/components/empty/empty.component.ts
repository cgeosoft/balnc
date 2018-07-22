import { Component, Input, OnInit } from '@angular/core'
import { HelperService } from '../../services/helper.service'

@Component({
  selector: 'common-empty',
  templateUrl: './empty.component.html',
  styleUrls: ['./empty.component.scss']
})
export class EmptyComponent implements OnInit {

  @Input() message = 'Nothing where found'
  @Input() submessage = null
  @Input() icon = 'folder-open-o'
  @Input() size = 'normal'

  _icon: string[]

  constructor () { }

  ngOnInit () {
    this._icon = HelperService.getIcon(this.icon)
  }

}
