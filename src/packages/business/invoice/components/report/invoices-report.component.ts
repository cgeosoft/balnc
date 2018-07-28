import { Component, NgZone, OnDestroy, OnInit } from '@angular/core'


import { Invoice } from '@balnc/business/invoice/data/invoice'

@Component({
  selector: 'app-invoices-report',
  templateUrl: './invoices-report.component.html',
  styleUrls: ['./invoices-report.component.scss']
})
export class InvoicesReportComponent implements OnInit, OnDestroy {

  invoices: Invoice[]
  sub

  constructor(
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
