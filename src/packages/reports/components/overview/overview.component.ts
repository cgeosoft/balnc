import { Component, OnInit } from '@angular/core'
import { ReportService } from '@balnc/reports/services/report.service'

@Component({
  selector: 'app-reports-overview',
  templateUrl: 'overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  config: any

  constructor (
  ) { }

  ngOnInit () {
    this.config = {}
  }
}
