import { Component, NgZone, OnDestroy, OnInit, ElementRef, ViewChild } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Subscription } from 'rxjs/Subscription'
import { RxCollection, RxDocumentBase } from 'rxdb'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { Observable } from 'rxjs/Observable'

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

import * as _ from 'lodash'
import * as moment from 'moment'
import { ReportService } from '@blnc/report/services/report.service'
import { RxReportDoc, Report } from '@blnc/report/data/report'
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-reports-report',
  templateUrl: 'report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit {

  report: Report;
  error: any;
  commons: any
  filters: any = {}
  pagination: any = {}
  reportData: any
  reportLoading = false
  maxPage: number
  pdfData: any

  constructor(
    private reportService: ReportService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
  ) {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
  }

  ngOnInit() {
    this.route.params.subscribe(async params => {
      await this.loadReport(params['id'])
      await this.execReport()
    })
  }

  async loadReport(id) {
    this.report = await this.reportService.one(id)
    this.resetFilters()
  }

  decideClosure(event, datepicker) {
    const path = event.path.map(p => p.localName)
    if (!path.includes('ngb-datepicker')) {
      datepicker.close()
    }
  }

  async execReport() {
    this.error = null
    this.reportLoading = true
    this.reportData = await this.reportService
      .execute(this.report, this.filters)
      .catch((err) => {
        this.reportLoading = false
        if (err.status === 0) {
          this.error = "SERVER_UNAVAILABLE"
        } else {
          this.error = err
        }
      })

    if (!this.reportData) {
      return
    }

    const pdf = await this.reportService.generatePdfMake(this.report, this.reportData)
      .catch((err) => {
        this.reportLoading = false
        this.error = err
      })
    if (!pdf) {
      return
    }

    const doc = pdfMake.createPdf(pdf);

    doc.getDataUrl((data) => {
      this.pdfData = this.sanitizer.bypassSecurityTrustResourceUrl(data)
    }, doc);

    this.reportLoading = false
  }

  resetFilters() {
    this.filters = this.report.filters
      .map(filter => {
        return {
          key: filter.field,
          value: filter.value
        }
      })
      .reduce((map, obj) => {
        map[obj.key] = obj.value
        return map
      }, {})
  }

}
