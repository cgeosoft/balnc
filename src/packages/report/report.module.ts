import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { CommonModule } from '@balnc/common'

import { WrapperComponent } from '@balnc/report/components/_wrapper/wrapper.component';
import { OverviewComponent } from "@balnc/report/components/overview/overview.component";
import { ReportComponent } from "@balnc/report/components/report/report.component";
import { ReportRoutes } from '@balnc/report/routes/report.routes';
import { ReportService } from '@balnc/report/services/report.service';
import { NgbDateNativeAdapter } from '@balnc/report/adapters/datepicker.adapter';
import { NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    WrapperComponent,
    OverviewComponent,
    ReportComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ReportRoutes),
  ],
  providers: [
    ReportService,
    { provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }
  ],
  entryComponents: []
})
export class ReportModule { }
