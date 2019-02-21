import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@balnc/shared';
import { InvoicesService } from '../_shared/services/invoices.service';
import { InvoicesOverviewComponent } from './overview/invoices-overview.component';
import { InvoicesReportComponent } from './report/report.component';
import { InvoicesItemComponent } from './view/invoices-item.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([])
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
