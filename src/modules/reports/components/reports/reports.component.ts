import { ReportService } from './../../services/report.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, NgZone } from '@angular/core'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { Observable } from 'rxjs/Observable'
import { RxCollection, RxDocumentBase } from 'rxdb'
import { RxReportDoc } from '@blnc/reports/data/report';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reports-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent implements OnInit {

  loginRequired = false
  isAuthenticated = false
  reports: RxReportDoc[]

  constructor(
    private reportService: ReportService,
    private router: Router,
  ) { }

  async ngOnInit() {
    this.loginRequired = this.reportService._config.server.requireUser
    this.loadReports()
  }

  async loadReports() {
    this.reports = await this.reportService.all()
  }

  logout() {
    this.reportService.logout()
    this.router.navigate(["/reports/login"])
  }
}
