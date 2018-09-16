import { Component } from '@angular/core'

import { ConfigService } from '../../services/config.service'

@Component({
  selector: 'common-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.scss']
})
export class BoxComponent {

  constructor (
    public configService: ConfigService
    ) { }

}
