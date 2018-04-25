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

  error: any;
  commons: any
  report: Report
  filters: any = {}
  pagination: any = {}
  reportData: any
  reportLoading = false
  maxPage: number

  constructor(
    private reportService: ReportService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.loadReport(params['alias'])
      this.execReport(true)
    })
  }

  loadReport(alias) {
    this.report = this.reportService.getReport(alias)
    this.resetFilters()
  }

  decideClosure(event, datepicker) {
    const path = event.path.map(p => p.localName)
    if (!path.includes('ngb-datepicker')) {
      datepicker.close()
    }
  }

  async execReport(restart = false) {
    this.reportLoading = true
    console.log(this.report.alias, this.filters, this.pagination)
    this.reportData = await this.reportService
      .execReport(this.report.alias, this.filters, this.pagination)
      .catch((err) => {
        this.reportLoading = false
        this.error = err
      })
    if (restart) {
      this.pagination = { ...this.reportData.pagination }
      this.calculateMaxPage()
    }
    this.reportLoading = false
  }

  setSort(field) {
    if (this.pagination.sortBy === field) {
      this.pagination.sortDir = (this.pagination.sortDir === "asc") ? "desc" : "asc"
    } else {
      this.pagination.sortBy = field
      this.pagination.sortDir = "asc"
    }
    this.calculateMaxPage()
    this.pagination.pageNo = (this.pagination.pageNo > this.maxPage) ? this.maxPage : this.pagination.pageNo;
    this.execReport()
  }

  setPageSize() {
    this.calculateMaxPage()
    this.pagination.pageNo = (this.pagination.pageNo > this.maxPage) ? this.maxPage : this.pagination.pageNo;
    this.execReport()
  }

  calculateMaxPage() {
    this.maxPage = Math.floor(this.reportData.data.totalCount / this.pagination.pageSize)
    this.maxPage += (this.reportData.data.totalCount % this.pagination.pageSize) ? 1 : 0
  }

  previousPage() {
    this.pagination.pageNo--
    this.pagination.pageNo = (this.pagination.pageNo < 0) ? 0 : this.pagination.pageNo;
    this.execReport()
  }
  nextPage() {
    this.pagination.pageNo++
    this.pagination.pageNo = (this.pagination.pageNo > this.maxPage) ? this.maxPage : this.pagination.pageNo;
    this.execReport()
  }

  resetFilters() {
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

}
