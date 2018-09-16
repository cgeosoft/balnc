import { NgModule } from '@angular/core'
import { NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap'
import { RouterModule } from '@angular/router'

import { CommonModule } from '@balnc/common'

import { RxDBModule } from '@balnc/core'

import { WrapperComponent } from './components/_wrapper/wrapper.component'
import { OverviewComponent } from './components/overview/overview.component'
import { ReportComponent } from './components/report/report.component'
import { ReportService } from './report.service'
import { NgbDateNativeAdapter } from './adapters/datepicker.adapter'
import { ReportsEntities } from './models/_entities'

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    RxDBModule.forChild([
      ...ReportsEntities
    ])
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
