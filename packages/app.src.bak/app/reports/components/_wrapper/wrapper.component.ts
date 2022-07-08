import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Report } from '../../models/report'
import { ReportsService } from '../../reports.service'

@Component({
  selector: 'app-reports-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss']
})
export class WrapperComponent implements OnInit {

  idReportAdmin: boolean
  reports: Report[]

  constructor (
    private reportService: ReportsService,
    private router: Router
  ) { }

  async ngOnInit () {
    await this.loadReports()
  }

  async loadReports () {
    // this.idReportAdmin = await this.reportService.idReportAdmin()
    this.reports = await this.reportService.all()
  }

  manage () {
    // empty
  }
}
