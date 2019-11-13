import { Component, Input, OnInit } from '@angular/core'
import { HeaderMenu } from '../../models/tabs-menu'

@Component({
  selector: 'app-content-header',
  templateUrl: './content-header.component.html',
  styleUrls: ['./content-header.component.scss']
})
export class ContentHeaderComponent implements OnInit {

  @Input() title: string
  @Input() subtitle: string = null
  @Input() icon: string[] = ['fas', 'cube']
  @Input() details: any[] = []
  @Input() settingsMenu: any[] = []

  @Input() menu: HeaderMenu
  @Input() fullWidth = false
  @Input() route = null

  ngOnInit () {
    if (this.menu) {
      if (!this.menu.selected) {
        this.menu.selected = this.menu.items[0].id
      }
    }
  }
}
