import { ReportService } from './../../services/report.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, NgZone } from '@angular/core'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { Observable } from 'rxjs/Observable'
import { RxCollection, RxDocumentBase } from 'rxdb'
import { RxReportDoc } from '@blnc/report/data/report';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reports-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {

  isAuthenticated = false
  reports: RxReportDoc[]

  constructor() { }

  async ngOnInit() {
  }
}
