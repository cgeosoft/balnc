import { Component, Input, OnInit } from '@angular/core'
import { TabsMenu } from '../../models/tabs-menu'

@Component({
  selector: 'app-content-header',
  templateUrl: './content-header.component.html',
  styleUrls: ['./content-header.component.scss']
})
export class ContentHeaderComponent implements OnInit {

  @Input() title: string
  @Input() subtitle: string = null
  @Input() icon: string[]
  @Input() details: any[] = []
  @Input() settingsMenu: any[] = []

  @Input() tabsMenu: TabsMenu
  @Input() fullWidth = false
  @Input() route = null

  ngOnInit() {
    if (this.tabsMenu) {
      if (!this.tabsMenu.selected) {
        this.tabsMenu.selected = this.tabsMenu.tabs[0].id
      }
    }
  }
}
