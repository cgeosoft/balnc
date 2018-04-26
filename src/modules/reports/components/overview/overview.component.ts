import { ConfigService } from './../../../core/common/services/config.service';
import { Component, NgZone, OnDestroy, OnInit, ElementRef, ViewChild } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Subscription } from 'rxjs/Subscription'
import { RxCollection, RxDocumentBase } from 'rxdb'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { Observable } from 'rxjs/Observable'

import * as _ from 'lodash'
import * as moment from 'moment'
import { ReportService } from '@blnc/reports/services/report.service';

@Component({
  selector: 'app-reports-overview',
  templateUrl: 'overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {

  config: any

  constructor(
    private reportService: ReportService,
  ) { }

  ngOnInit() {
    this.config = {}//this.reportService._config
  }
}
