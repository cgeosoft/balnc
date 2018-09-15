import { Component, NgZone, OnDestroy, OnInit } from '@angular/core'

import { Invoice } from '../../models/invoice'

@Component({
  selector: 'invoices-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class InvoicesReportComponent implements OnInit, OnDestroy {

  invoices: Invoice[]
  sub

  constructor (
    private zone: NgZone
  ) { }

  ngOnInit () {
    this._show()
  }

  ngOnDestroy () {
    if (this.sub) {
      this.sub.unsubscribe()
    }
  }

  private async _show () {
    // const db = await this.db.get<RxInvoiceDocument>("invoice")
    // const invoices$ = db.find().$
    // this.sub = invoices$
    //   .subscribe(invoices => {
    //     this.zone.run(() => {
    //       this.invoices = invoices
    //     })
    //   })
  }
}
