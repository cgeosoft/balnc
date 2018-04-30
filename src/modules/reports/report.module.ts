import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { CommonModule } from '@blnc/core/common/common.module'
import { MainComponent } from '@blnc/reports/components/_main/main.component'
import { OverviewComponent } from "@blnc/reports/components/overview/overview.component";
import { ReportComponent } from "@blnc/reports/components/report/report.component";
import { ReportRoutes } from '@blnc/reports/routes/report.routes';
import { ReportService } from '@blnc/reports/services/report.service';
import { NgbDateNativeAdapter } from '@blnc/reports/adapters/datepicker.adapter';
import { NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { AuthComponent } from '@blnc/reports/components/auth/auth.component';
import { ReportGuard } from '@blnc/reports/guards/report.guard';
import { ReportsComponent } from '@blnc/reports/components/reports/reports.component';

@NgModule({
  declarations: [
    MainComponent,
    OverviewComponent,
    ReportsComponent,
    ReportComponent,
    AuthComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ReportRoutes),
  ],
  providers: [
    ReportService,
    ReportGuard,
    { provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }
  ],
  entryComponents: []
})
export class ReportModule { }
