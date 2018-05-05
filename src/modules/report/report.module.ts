import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { CommonModule } from '@balnc/common/common.module'
import { MainComponent } from '@balnc/report/components/_main/main.component'
import { OverviewComponent } from "@balnc/report/components/overview/overview.component";
import { ReportComponent } from "@balnc/report/components/report/report.component";
import { ReportRoutes } from '@balnc/report/routes/report.routes';
import { ReportService } from '@balnc/report/services/report.service';
import { NgbDateNativeAdapter } from '@balnc/report/adapters/datepicker.adapter';
import { NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '@balnc/report/components/login/login.component';
import { ReportGuard } from '@balnc/report/guards/report.guard';
import { ReportsComponent } from '@balnc/report/components/reports/reports.component';

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
