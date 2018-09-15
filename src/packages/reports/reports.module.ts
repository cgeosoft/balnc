import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { CommonModule } from '@balnc/common'

import { WrapperComponent } from '@balnc/reports/components/_wrapper/wrapper.component'
import { OverviewComponent } from '@balnc/reports/components/overview/overview.component'
import { ReportComponent } from '@balnc/reports/components/report/report.component'
import { ReportRoutes } from '@balnc/reports/routes/report.routes'
import { ReportService } from '@balnc/reports/services/report.service'
import { NgbDateNativeAdapter } from '@balnc/reports/adapters/datepicker.adapter'
import { NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap'

@NgModule({
  declarations: [
    WrapperComponent,
    OverviewComponent,
    ReportComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ReportRoutes)
  ],
  providers: [
    ReportService,
    { provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }
  ],
  entryComponents: []
})
export class ReportsModule { }
