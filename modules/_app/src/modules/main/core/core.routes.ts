import { Routes } from '@angular/router';

import { MainComponent } from './components/main/main.component';

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
            path: '',
            redirectTo: '/dashboard',
            pathMatch: 'full',
        }]
    },
];
