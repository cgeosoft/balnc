import { Component, NgZone, OnDestroy, OnInit, ElementRef, ViewChild } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Subscription } from 'rxjs/Subscription'
import { RxCollection, RxDocumentBase } from 'rxdb'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { Observable } from 'rxjs/Observable'

import * as _ from 'lodash'
import * as moment from 'moment'
import { ReportService } from '@blnc/reports/services/report.service'
import { Report } from '@blnc/reports/data/report'

@Component({
  selector: 'app-reports-report',
  templateUrl: 'report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit {

  commons: any
  report: Report
  filters: any
  pagination: any = {}
  reportData: any
  reportLoading = false

  constructor(
    private reportService: ReportService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.loadReport(params['alias'])
      this.execReport()
    })
  }

  loadReport(alias) {
    this.report = this.reportService.getReport(alias)
    this.filters = this.report.filters
      .map(filter => {
        return {
          key: filter.field,
          value: filter.defaultValue
        }
      })
      .reduce((map, obj) => {
        map[obj.key] = obj.value
        return map
      }, {})
  }

  decideClosure(event, datepicker) {
    const path = event.path.map(p => p.localName)
    if (!path.includes('ngb-datepicker')) {
      datepicker.close()
    }
  }

  async execReport() {
    this.reportLoading = true
    this.reportData = await this.reportService.execReport(this.report.alias, this.filters, this.pagination)
    this.pagination = { ...this.reportData.pagination }
    this.reportLoading = false
  }

  setSort(field) {
    if (this.pagination.sortBy === field) {
      this.pagination.sortDir = (this.pagination.sortDir === "asc") ? "desc" : "asc"
    } else {
      this.pagination.sortBy = field
      this.pagination.sortDir = "asc"
    }
    this.execReport()
  }

}
