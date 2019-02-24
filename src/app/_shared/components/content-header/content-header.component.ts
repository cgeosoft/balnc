import { Component, Input, OnInit } from '@angular/core';
import { HelperService } from '../../../_core';
import { TabsMenu } from '../../../_core/models/tabs-menu';

@Component({
  selector: 'common-content-header',
  templateUrl: './content-header.component.html'
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

  helperService = HelperService

  ngOnInit () {
    if (this.tabsMenu) {
      if (!this.tabsMenu.selected) {
        this.tabsMenu.selected = this.tabsMenu.tabs[0].id
      }
    }
  }
}
