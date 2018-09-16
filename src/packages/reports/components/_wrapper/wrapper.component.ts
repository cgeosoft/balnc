import { Router } from '@angular/router'
import { Component, OnInit, NgZone } from '@angular/core'

import { ReportService } from '../../report.service'
import { Report } from '../../models/report'

@Component({
  selector: 'app-reports-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss']
})
export class WrapperComponent implements OnInit {

  idReportAdmin: boolean
  reports: Report[]

  constructor (
    private reportService: ReportService,
    private router: Router
  ) { }

  async ngOnInit () {
    this.loadReports()
  }

  async loadReports () {
    // this.idReportAdmin = await this.reportService.idReportAdmin()
    this.reports = await this.reportService.all()
  }

  manage () {
    // empty
  }
}
