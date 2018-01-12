import { Routes } from '@angular/router'

import { MainComponent } from '../_core/common/components/main/main.component'
import { PageNotFoundComponent } from '../_core/common/components/page-not-found/page-not-found.component'

export const CORE_ROUTES: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [{
            path: 'dashboard',
            loadChildren: "./../general/dashboard/dashboard.module#DashboardModule"
        }, {
            path: 'contacts',
            loadChildren: "./../business/contacts/contacts.module#ContactsModule"
        }, {
            path: 'invoices',
            loadChildren: "./../business/invoices/invoices.module#InvoicesModule"
        }, {
            path: 'presentations',
            loadChildren: "./../marketing/presentations/presentations.module#PresentationsModule",
        }, {
            path: 'chat',
            loadChildren: "./../general/chat/chat.module#ChatModule"
        }, {
            path: 'settings',
            loadChildren: "./../general/settings/settings.module#SettingsModule"
        }, {
            path: 'page-not-found',
            component: PageNotFoundComponent,
        }, {
            path: '',
            redirectTo: '/dashboard',
            pathMatch: 'full',
        }]
    },
]
