import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InvoicesModule } from '../invoices/invoices.module';
import { MainComponent } from './main.component';

const appRoutes: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
            {
                path: 'invoices',
                loadChildren: '../invoices/invoices.module#InvoicesModule',
            },
            { path: '**', redirectTo: '/invoices/overview', pathMatch: 'full' },
        ],
    },
];

@NgModule({
    imports: [
        CommonModule,
        InvoicesModule,
        RouterModule.forChild(appRoutes)
    ],
    declarations: [
        MainComponent,
    ],
})
export class MainModule { }


