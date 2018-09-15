import { Component } from '@angular/core'
import { ConfigService } from '@balnc/common'

@Component({
  selector: 'core-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.scss']
})
export class BoxComponent {

  constructor (public configService: ConfigService) { }

}
