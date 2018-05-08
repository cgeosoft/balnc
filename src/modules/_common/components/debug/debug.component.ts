import { Component, Input, OnInit } from '@angular/core';
import { ENV } from 'environments/environment.prod';

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
    this.show = !ENV.isProd
  }

}
