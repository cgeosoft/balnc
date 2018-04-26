import { HttpClient } from "@angular/common/http";
import { Injectable, Injector } from "@angular/core";
import { ReportSchema, RxReportDocument } from "@blnc/reports/data/report";
import * as _ from 'lodash';
import { RxCollection } from "rxdb";
import { BaseService } from "@blnc/core/common/services/base.service";

@Injectable()
export class ReportService extends BaseService {

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
        return super.all("reports", params)
    }

    async one(id: string): Promise<RxReportDocument> {
        return super.one("reports", id)
    }

    async execute(alias, filters, pagination) {
    }
}
