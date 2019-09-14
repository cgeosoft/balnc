import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-reports-overview',
  templateUrl: 'overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  config: any

  constructor (
  ) {
    // empty
  }

  ngOnInit () {
    this.config = {}
  }
}
