import { ShellComponent } from '../../@shell/shell.component'
import { SearchComponent } from '../../search/search.component'
import { SettingsComponent } from '../../settings/settings.component'

export const BUSINESS_ROUTES = [{
  path: '',
  data: {
    breadcrumb: {
      label: 'Business'
    }
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
        breadcrumb: {
          label: 'Settings'
        }
      },
      component: SettingsComponent
    },
    {
      path: 'contacts',
      loadChildren: () => import('../../contacts/contacts.module').then(m => m.ContactsModule),
      data: {
        breadcrumb: {
          label: 'Contacts'
        }
      }
    }, {
      path: 'transactions',
      loadChildren: () => import('../../transactions/transactions.module').then(m => m.TransactionsModule),
      data: {
        breadcrumb: {
          label: 'Transactions'
        }
      }
    }, {
      path: 'accounts',
      loadChildren: () => import('../../accounts/accounts.module').then(m => m.AccountsModule),
      data: {
        breadcrumb: {
          label: 'Accounts'
        }
      }
    }, {
      path: 'agreements',
      loadChildren: () => import('../../agreements/agreements.module').then(m => m.AgreementsModule),
      data: {
        breadcrumb: {
          label: 'Agreements'
        }
      }
    }, {
      path: 'orders',
      loadChildren: () => import('../../orders/orders.module').then(m => m.OrdersModule),
      data: {
        breadcrumb: {
          label: 'Orders'
        }
      }
    }, {
      path: 'invoices',
      loadChildren: () => import('../../invoices/invoices.module').then(m => m.InvoicesModule),
      data: {
        breadcrumb: {
          label: 'Invoices'
        }
      }
    }, {
      path: 'storage',
      loadChildren: () => import('../../storage/storage.module').then(m => m.StorageModule),
      data: {
        breadcrumb: {
          label: 'Storage'
        }
      }
    },
    { path: '', redirectTo: 'contacts', pathMatch: 'full' }
  ]
}]
