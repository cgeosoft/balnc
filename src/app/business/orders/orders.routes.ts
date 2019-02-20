import { OverviewComponent } from './overview/overview.component'
import { ViewComponent } from './view/view.component'
import { OrdersService } from '../_shared/services/orders.service'

export const OrdersRoutes = [
  {
    path: 'orders',
    resolve: {
      srv: OrdersService
    },
    children: [
      { path: 'overview', component: OverviewComponent },
      { path: 'order/:id', component: ViewComponent },
      { path: '', redirectTo: 'overview', pathMatch: 'full' }
    ]
  }]
