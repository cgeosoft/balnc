import { Component, Input, OnInit } from '@angular/core'
import { environment } from 'environments/environment'

@Component({
  selector: 'common-debug',
  templateUrl: './debug.component.html'
})
export class DebugComponent implements OnInit {

  @Input() data
  @Input() isError

  show

  ngOnInit () {
    this.show = !environment.production
  }

}
