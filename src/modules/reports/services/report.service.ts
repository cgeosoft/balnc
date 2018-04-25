import { Subject } from "rxjs/Subject";
import { RxCollection, RxReplicationState, RxDocumentBase } from "rxdb"
import { Observable, } from "rxjs/Observable";
import { Injectable, OnDestroy, OnInit } from "@angular/core"
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";

import * as _ from 'lodash'
import * as moment from 'moment'
import * as flat from 'flat'
import { Report } from "@blnc/reports/data/report";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class ReportService implements Resolve<any> {

    reportServer = "http://localhost:3001"
    reportServerAuth = {
        username: "admin",
        password: "admin",
    }
    commons: any;
    reports: Report[];

    constructor(
        private http: HttpClient
    ) { }

    async resolve(route: ActivatedRouteSnapshot): Promise<boolean> {
        // this.reports = await this.http.get(`${this.reportServer}/reports`, {
        //     headers: {
        //         Authorization: "Basic " + btoa(this.reportServerAuth.username + ":" + this.reportServerAuth.password)
        //     }
        // }).toPromise().then((r: Report[]) => r)
        return true
    }

    getReports() {
        return this.reports
    }

    getReport(reportAlias: string): Report {
        return this.reports.find((report) => {
            return report.alias === reportAlias
        })
    }

    async execReport(alias, filters, pagination) {
        const params = {}
        if (!_.isEmpty(filters)) { params["f"] = filters }
        if (!_.isEmpty(pagination)) { params["p"] = pagination }
        console.log(params)
        return await this.http.get(`${this.reportServer}/reports/${alias}`, {
            headers: {
                Authorization: "Basic " + btoa(this.reportServerAuth.username + ":" + this.reportServerAuth.password)
            },
            params: flat.flatten(params),
        }).toPromise().then((result: any[]) => {
            return result
        })
    }
}
