import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { CommonModule } from '@balnc/shared'
import { InvoicesWrapperComponent } from './components/_wrapper/invoices-wrapper.component'
import { InvoicesOverviewComponent } from './components/overview/invoices-overview.component'
import { InvoicesReportComponent } from './components/report/report.component'
import { InvoicesItemComponent } from './components/view/invoices-item.component'

import { InvoicesService } from './invoices.service'

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    InvoicesWrapperComponent,
    InvoicesOverviewComponent,
    InvoicesItemComponent,
    InvoicesReportComponent
  ],
  providers: [
    InvoicesService
  ]
})
export class InvoicesModule { }
