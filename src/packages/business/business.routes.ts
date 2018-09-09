import { ContactsRoutes } from './contacts'
import { InvoicesRoutes } from './invoices'
import { OrdersRoutes } from './orders'

export const BusinessRoutes = [{
  path: 'business',
  children: [
    ...ContactsRoutes,
    ...InvoicesRoutes,
    ...OrdersRoutes,
    {
      path: '',
      pathMatch: 'full',
      redirectTo: '/contacts'
    }]
}]
