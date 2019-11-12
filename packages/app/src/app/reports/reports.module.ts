import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { SharedModule } from '@balnc/shared'
import { NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap'
import { NgbDateNativeAdapter } from './adapters/datepicker.adapter'
import { OverviewComponent } from './components/overview/overview.component'
import { ReportComponent } from './components/report/report.component'
import { WrapperComponent } from './components/_wrapper/wrapper.component'
import { ReportsRoutes } from './reports.routes'
import { ReportsService } from './reports.service'

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(ReportsRoutes)
  ],
  declarations: [
    WrapperComponent,
    OverviewComponent,
    ReportComponent
  ],
  providers: [
    ReportsService,
    { provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }
  ],
  entryComponents: []
})
export class ReportsModule { }
