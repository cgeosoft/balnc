import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';

import { InvoicesDBService } from '../../services/invoices-db.service';
import * as RxDBTypes from '../../typings/typings.d';

@Component({
  selector: 'app-invoices-report',
  templateUrl: './invoices-report.component.html',
  styleUrls: ['./invoices-report.component.scss']
})
export class InvoicesReportComponent implements OnInit, OnDestroy {

  invoices: RxDBTypes.RxInvoiceDocument[] | RxDBTypes.RxInvoiceDocument;
  sub;

  constructor(
    private invoicesDBService: InvoicesDBService,
    private zone: NgZone,
  ) { }

  ngOnInit() {
    this._show()
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  private async _show() {
    const db = await this.invoicesDBService.get();
    const invoices$ = db.invoice
      .find()
      // .sort({ dateCreated: 1 })
      .$;
    this.sub = invoices$.subscribe(invoices => {
      this.invoices = invoices;
      this.zone.run(() => { });
    });
  }
}
