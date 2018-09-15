import { InvoicesWrapperComponent } from './components/_wrapper/invoices-wrapper.component'
import { InvoicesOverviewComponent } from './components/overview/invoices-overview.component'
import { InvoicesReportComponent } from './components/report/report.component'
import { InvoicesItemComponent } from './components/view/invoices-item.component'

export const InvoicesRoutes = [
  {
    path: 'invoice',
    component: InvoicesWrapperComponent,
    children: [
      { path: 'overview', component: InvoicesOverviewComponent },
      { path: 'report/:id', component: InvoicesReportComponent },
      { path: 'report', component: InvoicesReportComponent },
      { path: 'item/:id', component: InvoicesItemComponent },
      { path: '', redirectTo: 'overview', pathMatch: 'full' }
    ]
  }]
