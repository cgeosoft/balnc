import { Component, OnInit } from '@angular/core'
import { ConfigService } from '@balnc/core'

@Component({
  selector: 'common-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(
    public configService: ConfigService
  ) { }

  ngOnInit() {
    // empty
  }

}
