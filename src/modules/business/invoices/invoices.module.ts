import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { CommonModule } from '@blnc/core/common/common.module';

import { InvoicesWrapperComponent } from '@blnc/business/invoices/components/_wrapper/invoices-wrapper.component';
import { InvoicesOverviewComponent } from '@blnc/business/invoices/components/overview/invoices-overview.component';
import { InvoicesReportComponent } from '@blnc/business/invoices/components/report/invoices-report.component';
import { InvoicesItemComponent } from '@blnc/business/invoices/components/item/invoices-item.component';

const routes: Routes = [
  {
    path: '',
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
    CommonModule,
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
