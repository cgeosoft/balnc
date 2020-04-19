import { Routes } from '@angular/router'
import { MainShellComponent } from './@main/@shell/shell.component'
import { ErrorComponent } from './@main/error/error.component'
import { ImportComponent } from './@main/import/import.component'
import { MainGuard } from './@main/main.guard'
import { SetupComponent } from './@main/setup/setup.component'
import { SetupGuard } from './@main/setup/setup.guard'

export const APP_ROUTES: Routes = [{
  path: '',
  component: MainShellComponent,
  canActivate: [MainGuard],
  children: [{
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  }, {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule)
  }, {
    path: 'support',
    loadChildren: () => import('./support/support.module').then(m => m.SupportModule)
  }, {
    path: 'contacts',
    data: {
      title: 'Contacts'
    },
    loadChildren: () => import('./contacts/contacts.module').then(m => m.ContactsModule)
  }, {
    path: 'transactions',
    loadChildren: () => import('./transactions/transactions.module').then(m => m.TransactionsModule),
    data: {
      title: 'Transactions'
    }
  }, {
    path: 'accounts',
    loadChildren: () => import('./accounts/accounts.module').then(m => m.AccountsModule),
    data: {
      title: 'Accounts'
    }
  }, {
    path: 'agreements',
    loadChildren: () => import('./agreements/agreements.module').then(m => m.AgreementsModule),
    data: {
      title: 'Agreements'
    }
  }, {
    path: 'orders',
    loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule),
    data: {
      title: 'Orders'
    }
  }, {
    path: 'invoices',
    loadChildren: () => import('./invoices/invoices.module').then(m => m.InvoicesModule),
    data: {
      title: 'Invoices'
    }
  }, {
    path: 'storage',
    loadChildren: () => import('./storage/storage.module').then(m => m.StorageModule),
    data: {
      title: 'Storage'
    }
  }, {
    path: 'documents',
    loadChildren: () => import('./documents/documents.module').then(m => m.DocumentsModule)
  }, {
    path: 'projects',
    loadChildren: () => import('./projects/projects.module').then(m => m.ProjectsModule)
  }, {
    path: 'presentations',
    loadChildren: () => import('./presentations/presentations.module').then(m => m.PresentationsModule)
  }, {
    path: 'boards',
    loadChildren: () => import('./boards/boards.module').then(m => m.BoardsModule)
  }, {
    path: '',
    pathMatch: 'full',
    redirectTo: '/dashboard'
  }]
}, {
  path: 'setup',
  canActivate: [SetupGuard],
  component: SetupComponent
}, {
  path: 'import',
  component: ImportComponent
}, {
  path: 'error',
  component: ErrorComponent
}]
