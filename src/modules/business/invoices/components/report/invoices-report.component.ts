import { Component, NgZone, OnDestroy, OnInit } from '@angular/core'

import { Database } from '../../data/db.service'
import { RxInvoiceDocument } from '../../data/models/invoice'

@Component({
  selector: 'app-invoices-report',
  templateUrl: './invoices-report.component.html',
  styleUrls: ['./invoices-report.component.scss']
})
export class InvoicesReportComponent implements OnInit, OnDestroy {

  invoices: RxInvoiceDocument[] | RxInvoiceDocument
  sub

  constructor(
    private db: Database,
    private zone: NgZone,
  ) { }

  ngOnInit() {
    this._show()
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe()
    }
  }

  private async _show() {
    const db = await this.db.get()
    const invoices$ = db.invoice
      .find()
      // .sort({ dateCreated: 1 })
      .$
    this.sub = invoices$.subscribe(invoices => {
      this.invoices = invoices
      this.zone.run(() => { })
    })
  }
}
