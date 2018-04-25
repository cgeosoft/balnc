import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { HelperService } from '@blnc/core/common/services/helper.service';

@Component({
  selector: 'app-content-header',
  templateUrl: "./content-header.component.html",
  styleUrls: ['./content-header.component.scss']
})
export class ContentHeaderComponent implements OnInit {

  @Input() icon = "cubes"
  @Input() title = "Page"
  @Input() subtitle = null
  @Input() details: any[] = []
  @Input() settingsMenu: any[] = []
  @Input() tabsMenu: any[] = []

  constructor() { }

  ngOnInit() {
    this.icon = HelperService.getIconClass(this.icon, true)
  }
}
