import { Component, Input, isDevMode, OnInit } from '@angular/core';

@Component({
  selector: 'app-debug-panel',
  templateUrl: "./debug-panel.component.html"
})
export class DebugPanelComponent implements OnInit {

  @Input() data

  show

  constructor() { }

  ngOnInit() {
    this.show = isDevMode()
  }

}
