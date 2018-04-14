import { Subject } from "rxjs/Subject";
import { RxCollection, RxReplicationState, RxDocumentBase } from "rxdb"
import { Observable, } from "rxjs/Observable";
import { Injectable, OnDestroy, OnInit } from "@angular/core"
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";

import * as moment from 'moment'
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
        await this.loadCommons()
        await this.loadReports()
        return true
    }

    async loadCommons() {
        this.commons = await this.http.get(`${this.reportServer}/commons`, {
            headers: {
                Authorization: "Basic " + btoa(this.reportServerAuth.username + ":" + this.reportServerAuth.password)
            }
        }).toPromise().then((result: Report[]) => {
            return result
        })
    }


    async loadReports() {
        this.reports = await this.http.get(`${this.reportServer}/reports`, {
            headers: {
                Authorization: "Basic " + btoa(this.reportServerAuth.username + ":" + this.reportServerAuth.password)
            }
        }).toPromise().then((reports: Report[]) => {

            reports = reports.map(report => {
                report.filters = report.filters.map(filter => {
                    if (typeof filter.values === "string") {
                        filter.values = this.commons[filter.values]
                    }
                    return filter
                })
                return report
            })

            return reports
        })
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
        return await this.http.post(`${this.reportServer}/report/${alias}`, {
            filters: filters,
            pagination: pagination,
        }, {
                headers: {
                    Authorization: "Basic " + btoa(this.reportServerAuth.username + ":" + this.reportServerAuth.password)
                }
            }).toPromise().then((result: any[]) => {
                return result
            })

    }
}
