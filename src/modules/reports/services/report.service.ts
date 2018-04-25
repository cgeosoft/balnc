import { Subject } from "rxjs/Subject"
import { RxCollection, RxReplicationState, RxDocumentBase } from "rxdb"
import { Observable, } from "rxjs/Observable"
import { Injectable, OnDestroy, OnInit } from "@angular/core"
import { ActivatedRouteSnapshot, Resolve } from "@angular/router"

import * as _ from 'lodash'
import * as moment from 'moment'
import * as flat from 'flat'
import { RxReportDocument, ReportSchema } from "@blnc/reports/data/report"
import { HttpClient } from "@angular/common/http"
import { ConfigService } from "@blnc/core/common/services/config.service";
import { DatabaseService } from "@blnc/core/common/services/database.service";
import { Entity } from "@blnc/core/common/models/entity";

const entities: Entity[] = [{
    name: 'report',
    schema: ReportSchema,
    sync: true,
}]


@Injectable()
export class ReportService implements Resolve<any> {

    config: any
    reports: RxCollection<RxReportDocument>

    constructor(
        private http: HttpClient,
        private configService: ConfigService,
        private dbService: DatabaseService,
    ) { }

    async resolve(route: ActivatedRouteSnapshot): Promise<boolean> {
        await this.setup()
        return true
    }

    async setup() {
        this.config = this.configService.getModuleConfig("@blnc/reports")
        await this.dbService.loadEntities(entities)
        this.reports = await this.dbService.get<RxReportDocument>("report")
    }

    async getReports(params: any = {}) {
        Object.assign(params, { query: {} })
        const tasks = await this.reports.find(params.query).exec()
        return tasks
    }

    async getReport(reportAlias: string): Promise<RxReportDocument> {
        return await this.reports.findOne(reportAlias).exec()
    }

    async execReport(alias, filters, pagination) {
        const params = {}
        if (!_.isEmpty(filters)) { params["f"] = filters }
        if (!_.isEmpty(pagination)) { params["p"] = pagination }
        console.log(params)
        // return await this.http.get(`${this.reportServer}/reports/${alias}`, {
        //     headers: {
        //         Authorization: "Basic " + btoa(this.reportServerAuth.username + ":" + this.reportServerAuth.password)
        //     },
        //     params: flat.flatten(params),
        // }).toPromise().then((result: any[]) => {
        //     return result
        // })
    }
}
