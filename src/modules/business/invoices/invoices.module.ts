import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { DatabaseModule } from '../../_core/modules/database/database.module'
import { Entity } from '../../_core/modules/database/models/entity';

import { InvoicesItemComponent, InvoicesOverviewComponent, InvoicesReportComponent } from './components'

const entities: Entity[] = [{
  name: 'invoice',
  schemaPath: 'schemas/business/invoices/invoice.json',
  sync: true,
}]

const routes: Routes = [
  { path: 'overview', component: InvoicesOverviewComponent },
  { path: 'report/:id', component: InvoicesReportComponent },
  { path: 'report', component: InvoicesReportComponent },
  { path: 'item/:id', component: InvoicesItemComponent },
  { path: '', redirectTo: "report" },
]

@NgModule({
  imports: [
    CommonModule,
    DatabaseModule.forChild(entities),
    RouterModule.forChild(routes),
  ],
  declarations: [
    InvoicesOverviewComponent,
    InvoicesItemComponent,
    InvoicesReportComponent,
  ],
  providers: []
})
export class InvoicesModule { }
