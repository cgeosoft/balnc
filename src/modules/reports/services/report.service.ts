import { HttpClient } from "@angular/common/http"
import { Injectable, Injector, wtfStartTimeRange } from "@angular/core"
import { ReportSchema, RxReportDoc, Report } from "@blnc/reports/data/report"
import * as _ from 'lodash'
import * as moment from 'moment'
import { RxCollection } from "rxdb"
import { BaseService } from "@blnc/core/common/services/base.service"
import { ReportConfig } from "@blnc/reports/data/module-config"
import { Subject } from "rxjs/Subject"
import { TemplateParseResult } from "@angular/compiler";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

@Injectable()
export class ReportService extends BaseService {

    _config: ReportConfig
    user: any

    isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

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

    async setup() {
        await super.setup()
        this.loadUser()
    }

    async all(params: any = {}) {
        const data = await super.all<RxReportDoc>("report", params)
        const reports = data.sort((a, b) => {
            if (a.name < b.name) { return -1; }
            if (a.name > b.name) { return 1; }
            return 0;
        })
        return reports
    }

    async one(id: string) {
        const reportDoc = await super.one<RxReportDoc>("report", id)
        const report = { ...reportDoc } as Report

        report.filters.forEach(async filter => {
            switch (filter.type) {
                case "select":
                    filter.value = -1
                    filter.items = !filter.items && filter.query ? await this.getCommonData(filter.query) : []
                    filter.items.unshift({ label: "-- Select --", value: -1 })
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

    async getCommonData(query) {
        const url = `${this._config.server.host}/execute`
        const headers = this.generateHeaders()

        const result = await this.http.post(url, {
            query: query
        }, headers).toPromise()
        console.log(query, result)
        return result["rows"].map(r => {
            return {
                value: r[0],
                label: r[1],
            }
        })
    }

    loadUser() {
        const user = this.getStore("report-user")
        if (user) {
            this.user = user
            this.isAuthenticated.next(true)
        }
    }

    login(username: string, password: string) {
        this.user = {
            username: username,
            password: password,
        }
        this.setStore("report-user", this.user)
        this.isAuthenticated.next(true)
    }

    logout() {
        this.user = null
        this.clearStore("report-user")
        this.isAuthenticated.next(false)
    }

    async execute(report: Report, filters) {
        const url = `${this._config.server.host}/execute`
        const headers = this.generateHeaders()
        let query = ""
        try {
            const r = await super.one<RxReportDoc>("report", report.alias)
            const attachment = await r.getAttachment("query.sql")
            query = await attachment.getStringData()
        } catch (err) {
            return Promise.reject(err)
        }

        const result = await this.http.post(url, {
            query: this.formatQuery(query, filters)
        }, headers).toPromise()
        return result
    }

    async generatePdfMake(report: Report, data: any) {
        const pdf = report.pdf

        if (!pdf) {
            return Promise.reject("No pdf schema were found")
        }

        const indexes = []
        const header = []

        Object.keys(report.fields).forEach((field) => {
            const i = data.columns.findIndex(column => {
                return column.name === field
            })
            if (i !== -1) {
                indexes.push(i)
                header.push(report.fields[field])
                // pdf.content[0].table.widths.push("100")
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
