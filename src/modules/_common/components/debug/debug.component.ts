import { Component, Input, isDevMode, OnInit } from '@angular/core';

@Component({
  selector: 'app-debug',
  templateUrl: "./debug.component.html"
})
export class DebugComponent implements OnInit {

  @Input() data
  @Input() isError

  show

  constructor() { }

  ngOnInit() {
    this.show = isDevMode()
  }

}
