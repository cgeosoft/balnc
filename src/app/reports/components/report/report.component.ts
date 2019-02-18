import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import * as pdfMake from 'pdfmake/build/pdfmake'
import * as pdfFonts from 'pdfmake/build/vfs_fonts'

import { ReportService } from '../../report.service'
import { Report } from '../../models/report'
import { DomSanitizer } from '@angular/platform-browser'

@Component({
  selector: 'app-reports-report',
  templateUrl: 'report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  timeExec: number
  query: any
  report: Report
  err: any
  commons: any
  filters: any = {}
  pagination: any = {}
  reportData: any
  loading = false
  maxPage: number
  pdfData: any = null

  constructor (
    private reportService: ReportService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {
    pdfMake.vfs = pdfFonts.pdfMake.vfs
  }

  ngOnInit () {
    this.route.params.subscribe(async params => {
      await this.loadReport(params['id'])
      // await this.execReport()
    })
  }

  async loadReport (id) {
    this.report = await this.reportService.one(id)
    this.resetFilters()
  }

  decideClosure (event, datepicker) {
    const path = event.path.map(p => p.localName)
    if (!path.includes('ngb-datepicker')) {
      datepicker.close()
    }
  }

  async execReport () {
    const _time = (new Date()).getTime()
    this.err = null
    this.pdfData = null
    this.reportData = null
    this.loading = true
    this.query = await this.reportService.generateQuery(this.report, this.filters)
    this.reportData = await this.reportService.execute(this.query)
      .catch((err) => {
        if (err.status === 0) {
          this.err = 'SERVER_UNAVAILABLE'
        } else {
          this.err = err
        }
      })

    if (!this.reportData) {
      this.loading = false
      return
    }

    if (this.reportData.rows.length > 1000) {
      this.err = 'TOO_MANY_DATA'
      this.loading = false
      return
    }

    const pdf = await this.reportService.generatePdfMake(this.report, this.reportData)
      .catch((err) => {
        this.err = err
      })

    if (!pdf) {
      this.loading = false
      return
    }

    const doc = pdfMake.createPdf(pdf)

    doc.getDataUrl((data) => {
      this.pdfData = this.sanitizer.bypassSecurityTrustResourceUrl(data)
      this.timeExec = ((new Date()).getTime() - _time) / 1000
    }, doc)

    this.loading = false
  }

  resetFilters () {
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
