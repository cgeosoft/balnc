import { Component, Input, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

}
