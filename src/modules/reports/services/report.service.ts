import { HttpClient } from "@angular/common/http"
import { Injectable, Injector, wtfStartTimeRange } from "@angular/core"
import { ReportSchema, RxReportDocument, Report } from "@blnc/reports/data/report"
import * as _ from 'lodash'
import * as moment from 'moment'
import { RxCollection } from "rxdb"
import { BaseService } from "@blnc/core/common/services/base.service"
import { ReportConfig } from "@blnc/reports/data/module-config"
import { Subject } from "rxjs/Subject"

@Injectable()
export class ReportService extends BaseService {

    _config: ReportConfig
    user: any

    isAuthenticated: Subject<boolean> = new Subject<boolean>()

    constructor(
        private injector: Injector,
        private http: HttpClient,
    ) {
        super(injector)
        this._module = "@blnc/reports"
        this._entities = [{
            name: 'report',
            schema: ReportSchema,
            sync: true,
        }]
    }

    async all(params: any = {}) {
        const reports = await super.all<RxReportDocument>("report", params)
        return reports
    }

    async one(id: string) {
        const reportDoc = await super.one<RxReportDocument>("report", id)
        const report = { ...reportDoc } as Report
        report.filters = report.filters.map(filter => {
            switch (filter.type) {
                case "select":
                    filter.values = []
                    filter.value = -1
                    break
                case "date":
                    if (filter.default === null) {
                        filter.value = moment().format('YYYY-MM-DD')
                    } else {
                        filter.value = moment().add(filter.default.value, filter.default.type).format('YYYY-MM-DD')
                    }
                    break
            }
            return filter
        })
        return report
    }

    async execute(report: Report, filters) {
        const url = `${this._config.server.host}/execute`
        const headers = this.generateHeaders()
        const result = await this.http.post(url, {
            query: this.formatQuery(report.query, filters)
        }, headers).toPromise()
        return result
    }

    async generatePdfMake(report: Report, data: any) {
        const pdf = report.pdf

        const indexes = []
        const header = []

        Object.keys(report.fields).forEach((field) => {
            const i = data.columns.findIndex(column => {
                return column.name === field
            })
            if (i !== -1) {
                indexes.push(i)
                header.push(report.fields[field])
                pdf.content[0].table.widths.push("100")
            }
        })

        pdf.content[0].table.body.push(header)

        data.rows.forEach(row => {
            const r = []
            indexes.forEach(j => {
                r.push(row[j])
            })
            pdf.content[0].table.body.push(r)
        })
        console.log(pdf)
        return pdf
    }

    private generateHeaders() {
        return {
            headers: {
                Authorization: "Basic " + btoa(this.user.username + ":" + this.user.password)
            }
        }
    }


    formatQuery(query, filters) {
        for (const k in filters) {
            if (filters.hasOwnProperty(k)) {
                let value = ""
                switch (typeof filters[k]) {
                    case "string":
                        value = `'${filters[k]}'`
                        break
                    case "boolean":
                        value = `${(filters[k] === true)}`
                        break
                    case "number":
                    case "undefined":
                        value = `${filters[k]}`
                        break
                }
                query = query.replace(new RegExp(`{{${k}}}`, 'g'), value)
            }
        }
        return query
    }

}
