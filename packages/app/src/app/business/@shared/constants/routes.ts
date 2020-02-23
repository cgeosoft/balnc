import { ShellComponent } from '../../@shell/shell.component'
import { SearchComponent } from '../../search/search.component'
import { SettingsComponent } from '../../settings/settings.component'

export const BUSINESS_ROUTES = [{
  path: '',
  data: {
    title: 'Business'
  },
  component: ShellComponent,
  children: [
    {
      path: 'search',
      component: SearchComponent
    },
    {
      path: 'settings',
      data: {
        title: 'Settings'
      },
      component: SettingsComponent
    },
    {
      path: 'contacts',
      data: {
        title: 'Contacts'
      },
      loadChildren: () => import('../../contacts/contacts.module').then(m => m.ContactsModule)
    }, {
      path: 'transactions',
      loadChildren: () => import('../../transactions/transactions.module').then(m => m.TransactionsModule),
      data: {
        title: 'Transactions'
      }
    }, {
      path: 'accounts',
      loadChildren: () => import('../../accounts/accounts.module').then(m => m.AccountsModule),
      data: {
        title: 'Accounts'
      }
    }, {
      path: 'agreements',
      loadChildren: () => import('../../agreements/agreements.module').then(m => m.AgreementsModule),
      data: {
        title: 'Agreements'
      }
    }, {
      path: 'orders',
      loadChildren: () => import('../../orders/orders.module').then(m => m.OrdersModule),
      data: {
        title: 'Orders'
      }
    }, {
      path: 'invoices',
      loadChildren: () => import('../../invoices/invoices.module').then(m => m.InvoicesModule),
      data: {
        title: 'Invoices'
      }
    }, {
      path: 'storage',
      loadChildren: () => import('../../storage/storage.module').then(m => m.StorageModule),
      data: {
        title: 'Storage'
      }
    },
    { path: '', redirectTo: 'contacts', pathMatch: 'full' }
  ]
}]
