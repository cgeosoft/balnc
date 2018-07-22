import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { CommonModule } from '@balnc/common'
import { InvoicesWrapperComponent } from '@balnc/business/invoice/components/_wrapper/invoices-wrapper.component'
import { InvoicesOverviewComponent } from '@balnc/business/invoice/components/overview/invoices-overview.component'
import { InvoicesReportComponent } from '@balnc/business/invoice/components/report/invoices-report.component'
import { InvoicesItemComponent } from '@balnc/business/invoice/components/item/invoices-item.component'
import { InvoiceService } from '@balnc/business/invoice/services/invoice.service';

const routes: Routes = [
  {
    path: 'invoice',
    component: InvoicesWrapperComponent,
    resolve: {
      InvoiceService
    },
    children: [
      { path: '', redirectTo: "overview" },
      { path: 'overview', component: InvoicesOverviewComponent },
      { path: 'report/:id', component: InvoicesReportComponent },
      { path: 'report', component: InvoicesReportComponent },
      { path: 'item/:id', component: InvoicesItemComponent },
    ]
  }]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    InvoicesWrapperComponent,
    InvoicesOverviewComponent,
    InvoicesItemComponent,
    InvoicesReportComponent,
  ],
  providers: [
    InvoiceService,
  ]
})
export class InvoiceModule { }
