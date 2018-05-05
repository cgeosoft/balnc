import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { InvoicesWrapperComponent } from '@balnc/business/invoices/components/_wrapper/invoices-wrapper.component';
import { InvoicesOverviewComponent } from '@balnc/business/invoices/components/overview/invoices-overview.component';
import { InvoicesReportComponent } from '@balnc/business/invoices/components/report/invoices-report.component';
import { InvoicesItemComponent } from '@balnc/business/invoices/components/item/invoices-item.component';

const routes: Routes = [
  {
    path: 'invoices',
    component: InvoicesWrapperComponent,
    children: [
      { path: 'overview', component: InvoicesOverviewComponent },
      { path: 'report/:id', component: InvoicesReportComponent },
      { path: 'report', component: InvoicesReportComponent },
      { path: 'item/:id', component: InvoicesItemComponent },
      { path: '', redirectTo: "overview" },
    ]
  }]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  declarations: [
    InvoicesWrapperComponent,
    InvoicesOverviewComponent,
    InvoicesItemComponent,
    InvoicesReportComponent,
  ],
  providers: []
})
export class InvoicesModule { }
