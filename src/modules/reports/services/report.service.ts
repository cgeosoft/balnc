import { HttpClient } from "@angular/common/http";
import { Injectable, Injector, wtfStartTimeRange } from "@angular/core";
import { ReportSchema, RxReportDocument, Report } from "@blnc/reports/data/report";
import * as _ from 'lodash';
import { RxCollection } from "rxdb";
import { BaseService } from "@blnc/core/common/services/base.service";
import { ReportConfig } from "@blnc/reports/data/module-config";
import { Subject } from "rxjs/Subject";

@Injectable()
export class ReportService extends BaseService {

    _config: ReportConfig
    user: any

    isAuthenticated: Subject<boolean> = new Subject<boolean>();

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
                    filter.defaultValue = -1
                    break
                case "date":
                    filter.defaultValue = (new Date()).toISOString().split('T')[0]
                    break
            }
            return filter
        });
        return report
    }

    async execute(report: Report, filters) {
        const url = `${this._config.server.host}/execute`
        const headers = this.generateHeaders()
        const result = await this.http.post(url, {
            query: report.query
        }, headers).toPromise()
        return result
    }

    async generatePdfMake(data: any) {
        return {
            content: [{
                style: 'tableExample',
                table: {
                    body: [
                        ['Column 1', 'Column 2', 'Column 3'],
                        ['One value goes here', 'Another one here', 'OK?']
                    ]
                }
            }],
            styles: {
                tableExample: {
                    margin: [0, 5, 0, 15]
                },
            },
        }
    }

    private generateHeaders() {
        return {
            headers: {
                Authorization: "Basic " + btoa(this.user.username + ":" + this.user.password)
            }
        }
    }
}
