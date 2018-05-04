import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { CommonModule } from '@blnc/common/common.module'
import { MainComponent } from '@blnc/report/components/_main/main.component'
import { OverviewComponent } from "@blnc/report/components/overview/overview.component";
import { ReportComponent } from "@blnc/report/components/report/report.component";
import { ReportRoutes } from '@blnc/report/routes/report.routes';
import { ReportService } from '@blnc/report/services/report.service';
import { NgbDateNativeAdapter } from '@blnc/report/adapters/datepicker.adapter';
import { NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '@blnc/report/components/login/login.component';
import { ReportGuard } from '@blnc/report/guards/report.guard';
import { ReportsComponent } from '@blnc/report/components/reports/reports.component';

@NgModule({
  declarations: [
    MainComponent,
    OverviewComponent,
    ReportsComponent,
    ReportComponent,
    LoginComponent,
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
