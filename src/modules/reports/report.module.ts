import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { CommonModule } from '@blnc/core/common/common.module'
import { MainComponent } from '@blnc/reports/components/_main/main.component'
import { OverviewComponent } from "@blnc/reports/components/overview/overview.component";
import { ReportComponent } from "@blnc/reports/components/report/report.component";
import { ReportRoutes } from '@blnc/reports/routes/report.routes';
import { ReportService } from '@blnc/reports/services/report.service';

@NgModule({
  declarations: [
    MainComponent,
    OverviewComponent,
    ReportComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ReportRoutes),
  ],
  providers: [
    ReportService
  ],
  entryComponents: []
})
export class ReportModule { }
