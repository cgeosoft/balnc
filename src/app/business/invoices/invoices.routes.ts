import { InvoicesOverviewComponent } from './overview/invoices-overview.component'
import { InvoicesItemComponent } from './view/invoices-item.component'

export const InvoicesRoutes = [
  {
    path: 'invoices',
    children: [
      { path: 'overview', component: InvoicesOverviewComponent },
      { path: 'invoice/:id', component: InvoicesItemComponent },
      { path: '', redirectTo: 'overview', pathMatch: 'full' }
    ]
  }]
