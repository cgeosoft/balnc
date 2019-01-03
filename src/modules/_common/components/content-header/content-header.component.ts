import { Component, Input, OnInit } from '@angular/core'
import { HelperService } from '../../services/helper.service'
import { TabsMenu } from '../../models/tabs-menu'

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

  @Input() tabsMenu: TabsMenu
  @Input() fullWidth = false
  @Input() route = null

  constructor (
    public helperService: HelperService
  ) {}

  ngOnInit () {
    if (this.tabsMenu) {
      if (!this.tabsMenu.selected) {
        this.tabsMenu.selected = this.tabsMenu.tabs[0].id
      }
    }
  }
}
