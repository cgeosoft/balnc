import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

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

    const iconNS = this.icon.split(":")
    if (iconNS.length > 1) {
      switch (iconNS[1]) {
        case "regular":
          this.icon = "far fa-" + iconNS[0]
          break;
        default:
          this.icon = "fa fa-" + iconNS[0]
          break;
      }
    } else {
      this.icon = "fa fa-" + this.icon
    }

    this.icon += " fa-fw"

    console.log(this.icon)
  }

}
