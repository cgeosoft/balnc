import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@balnc/shared'
import { NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap'

import { NgbDateNativeAdapter } from './adapters/datepicker.adapter'
import { WrapperComponent } from './components/_wrapper/wrapper.component'
import { OverviewComponent } from './components/overview/overview.component'
import { ReportComponent } from './components/report/report.component'
import { ReportService } from './report.service'
import { ReportsRoutes } from './reports.routes'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ReportsRoutes)
  ],
  declarations: [
    WrapperComponent,
    OverviewComponent,
    ReportComponent
  ],
  providers: [
    ReportService,
    { provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }
  ],
  entryComponents: []
})
export class ReportsModule { }
