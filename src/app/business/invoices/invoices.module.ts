import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { SharedModule } from '@balnc/shared'
import { InvoicesOverviewComponent } from './overview/invoices-overview.component'
import { InvoicesReportComponent } from './report/report.component'
import { InvoicesItemComponent } from './view/invoices-item.component'

import { InvoicesService } from '../_shared/services/invoices.service'

@NgModule({
  imports: [
    SharedModule,
    RouterModule
  ],
  declarations: [
    InvoicesOverviewComponent,
    InvoicesItemComponent,
    InvoicesReportComponent
  ],
  providers: [
    InvoicesService
  ]
})
export class InvoicesModule { }
