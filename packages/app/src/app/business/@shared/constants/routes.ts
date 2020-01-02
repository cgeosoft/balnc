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
      loadChildren: './contacts/contacts.module#ContactsModule',
      data: {
        breadcrumb: {
          label: 'Contacts'
        }
      }
    }, {
      path: 'transactions',
      loadChildren: './transactions/transactions.module#TransactionsModule',
      data: {
        breadcrumb: {
          label: 'Transactions'
        }
      }
    }, {
      path: 'accounts',
      loadChildren: './accounts/accounts.module#AccountsModule',
      data: {
        breadcrumb: {
          label: 'Accounts'
        }
      }
    }, {
      path: 'agreements',
      loadChildren: './agreements/agreements.module#AgreementsModule',
      data: {
        breadcrumb: {
          label: 'Agreements'
        }
      }
    }, {
      path: 'orders',
      loadChildren: './orders/orders.module#OrdersModule',
      data: {
        breadcrumb: {
          label: 'Orders'
        }
      }
    }, {
      path: 'invoices',
      loadChildren: './invoices/invoices.module#InvoicesModule',
      data: {
        breadcrumb: {
          label: 'Invoices'
        }
      }
    }, {
      path: 'storage',
      loadChildren: './storage/storage.module#StorageModule',
      data: {
        breadcrumb: {
          label: 'Storage'
        }
      }
    },
    { path: '', redirectTo: 'contacts', pathMatch: 'full' }
  ]
}]
