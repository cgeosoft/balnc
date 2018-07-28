import { Component, Input, OnInit } from '@angular/core'
import { HelperService } from '../../services/helper.service'

@Component({
  selector: 'common-content-header',
  templateUrl: './content-header.component.html',
  styleUrls: ['./content-header.component.scss']
})
export class ContentHeaderComponent implements OnInit {

  @Input() icon = 'cubes'
  @Input() title = 'Page'
  @Input() subtitle = null
  @Input() details: any[] = []
  @Input() settingsMenu: any[] = []

  // tabsMenu = {
  //   active: "1",
  //   tabs: [{
  //     id: "1",
  //     label: "1",
  //     icon: "1",
  //   }],
  //   select: (tabId) => {
  //     this.tabsMenu.active = tabId
  //   }
  // }

  @Input() tabsMenu: any = {}

  @Input() fullWidth = false
  @Input() route = null

  _icon: string[]

  constructor () { }

  ngOnInit () {
    this._icon = HelperService.getIcon(this.icon)

    if (this.tabsMenu.tabs) {
      this.tabsMenu.tabs.forEach(tab => {
        tab.icon = HelperService.getIcon(tab.icon)
      })
    }
  }
}
