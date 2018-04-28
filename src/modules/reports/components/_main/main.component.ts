import { ReportService } from './../../services/report.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, NgZone } from '@angular/core'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { Observable } from 'rxjs/Observable'
import { RxCollection, RxDocumentBase } from 'rxdb'
import { RxReportDocument } from '@blnc/reports/data/report';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reports-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  isAuthenticated = false
  reports: RxReportDocument[]

  constructor(
    private modal: NgbModal,
    private http: HttpClient,
    private reportService: ReportService,
    private router: Router,
    private zone: NgZone,
  ) { }

  async ngOnInit() {
    this.loadReports()

    this.reportService.isAuthenticated.subscribe(x => {
      this.zone.run(() => {
        this.isAuthenticated = x
      })
    })

    if (this.reportService._config.server.requireUser && !this.isAuthenticated) {
      this.router.navigate(["reports/auth"])
      return
    }
  }

  async loadReports() {
    this.reports = await this.reportService.all()
  }

}
