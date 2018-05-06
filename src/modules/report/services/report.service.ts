import { ProfileService } from './../../_core/profile/services/profile.service';
import { HttpClient } from "@angular/common/http"
import { Injectable, Injector, wtfStartTimeRange } from "@angular/core"
import { TemplateParseResult } from "@angular/compiler";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { RxCollection } from "rxdb"
import { Subject } from "rxjs/Subject"

import * as _ from 'lodash'
import * as moment from 'moment'

import { ReportSchema, RxReportDoc, Report } from "@balnc/report/data/report"
import { BaseService } from "@balnc/common/services/base.service"
import { ReportSettings } from "@balnc/report/data/module-settings"

@Injectable()
export class ReportService extends BaseService {

    reportAdminRole = "report-admin"
    settings: ReportSettings

    isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

    constructor(
        private injector: Injector,
        private http: HttpClient,
        private profileService: ProfileService,
    ) {
        super(injector)
        this._module = "@balnc/report"
        this._entities = [{
            name: 'report',
            schema: ReportSchema,
            sync: true,
        }]
    }

    async all(params: any = {}) {
        const data = await super.all<RxReportDoc>("report", params)
        const reports = data
            .filter(report => {
                return report.roles
            })
            .filter(report => {
                return report.roles.some(role => this.profileService.roles.indexOf(role) >= 0)
            })
            .sort((a, b) => {
                if (a.name < b.name) { return -1; }
                if (a.name > b.name) { return 1; }
                return 0;
            })
        return reports
    }

    async one(id: string) {
        const reportDoc = await super.one<RxReportDoc>("report", id)
        const report = _.cloneDeep(reportDoc) as Report

        report.filters.forEach(async filter => {
            switch (filter.type) {
                case "select":
                    filter.value = -1
                    filter.items = filter.items ? filter.items : await this.getCommonData(filter.query)
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
        const result = await this.execute(query)
        return result["rows"].map(r => {
            return {
                value: r[0],
                label: r[1],
            }
        })
    }

    async generateQuery(report: Report, filters) {
        let query = ""
        try {
            const r = await super.one<RxReportDoc>("report", report.alias)
            const attachment = await r.getAttachment("query.sql")
            query = await attachment.getStringData()
        } catch (err) {
            return Promise.reject(err)
        }

        return this.formatQuery(query, filters)
    }

    async execute(query) {
        const url = `${this.settings.host}/execute`
        const headers = this.generateHeaders()
        const result = await this.http.post(url, {
            query: query
        }, headers).toPromise()
        return result
    }

    async generatePdfMake(report: Report, data: any) {
        const fields = _.cloneDeep(report.fields)
        const pdf = _.cloneDeep(report.pdf)
        const d = _.cloneDeep(data)

        if (!pdf) {
            return Promise.reject("No pdf schema were found")
        }

        const indexes = []
        const header = []

        Object.keys(fields)
            .forEach((field) => {
                const i = d.columns.findIndex(column => {
                    return column.name === field
                })
                if (i !== -1) {
                    indexes.push(i)
                    header.push(fields[field])
                    // pdf.content[0].table.widths.push("100")
                }
            })

        pdf.content[0].table.body.push(header)

        d.rows.forEach(row => {
            const r = []
            indexes.forEach(j => {
                r.push(row[j])
            })
            pdf.content[0].table.body.push(r)
        })
        return pdf
    }

    idReportAdmin() {
        return this.profileService.roles.indexOf(this.reportAdminRole) >= 0
    }

    private generateHeaders() {
        return {
            headers: {
                Authorization: "Basic " + btoa("key:" + this.settings.key)
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
