import { Routes } from '@angular/router';

import { MainComponent } from './components/main/main.component';

export const CORE_ROUTES: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [{
            path: 'invoices',
            loadChildren: "../../business/invoices/src/invoices.module#InvoicesModule"
        }, {
            path: 'chat',
            loadChildren: "../../main/chat/src/chat.module#ChatModule"
        }]
    },
    { path: '**', redirectTo: '/invoices/report', pathMatch: 'full' },
];
