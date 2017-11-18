import { Routes } from '@angular/router'

import { MainComponent } from './components/main/main.component'
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component'

export const CORE_ROUTES: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [{
            path: 'dashboard',
            loadChildren: "../../main/dashboard/dashboard.module#DashboardModule"
        }, {
            path: 'invoices',
            loadChildren: "../../business/invoices/invoices.module#InvoicesModule"
        }, {
            path: 'chat',
            loadChildren: "../../main/chat/chat.module#ChatModule"
        }, {
            path: 'settings',
            loadChildren: "../../main/settings/settings.module#SettingsModule"
        }, {
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
