import { ReportService } from './../../services/report.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, NgZone } from '@angular/core'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { Observable } from 'rxjs'
import { RxCollection, RxDocumentBase } from 'rxdb'
import { Report } from '@balnc/report/data/report';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reports-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss'],
})
export class WrapperComponent implements OnInit {

  idReportAdmin: boolean;
  reports: Report[]

  constructor(
    private reportService: ReportService,
    private router: Router,
  ) { }

  async ngOnInit() {
    this.loadReports()
  }

  async loadReports() {
    this.idReportAdmin = await this.reportService.idReportAdmin()
    this.reports = await this.reportService.all()
  }

  manage() { }
}
