import { ReportService } from './../../services/report.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, NgZone } from '@angular/core'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { Observable } from 'rxjs/Observable'
import { RxCollection, RxDocumentBase } from 'rxdb'
import { Report } from '@blnc/reports/data/report';

@Component({
  selector: 'app-reports-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  reports: Report[]

  constructor(
    private modal: NgbModal,
    private http: HttpClient,
    private reportService: ReportService,
  ) { }

  async ngOnInit() {
    this.loadReports()
  }

  async loadReports() {
    this.reports = await this.reportService.getReports()
  }

}
