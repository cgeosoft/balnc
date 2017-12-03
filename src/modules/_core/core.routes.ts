import { Routes } from '@angular/router'

import { MainComponent } from './components/main/main.component'
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component'
import { DatabaseService } from './modules/database/database.service'

export const CORE_ROUTES: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [{
            path: 'dashboard',
            loadChildren: "./../general/dashboard/dashboard.module#DashboardModule"
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
            loadChildren: "./modules/settings/settings.module#SettingsModule"
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
