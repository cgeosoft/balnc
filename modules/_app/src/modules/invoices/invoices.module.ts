import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InvoicesItemComponent, InvoicesOverviewComponent, InvoicesReportComponent } from './components';

const appRoutes: Routes = [
  { path: 'overview', component: InvoicesOverviewComponent },
  { path: ':id', component: InvoicesItemComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(appRoutes)
  ],
  declarations: [
    InvoicesOverviewComponent,
    InvoicesItemComponent,
    InvoicesReportComponent,
  ]
})
export class InvoicesModule { }
