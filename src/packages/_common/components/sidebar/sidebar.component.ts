import { ConfigService } from '../../services/config.service'
import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'common-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor (
    public configService: ConfigService
  ) { }

  ngOnInit () {
  }

}
