import { Routes } from "@angular/router";

import { WrapperComponent } from "@balnc/reports/components/_wrapper/wrapper.component";
import { OverviewComponent } from "@balnc/reports/components/overview/overview.component";
import { ReportComponent } from "@balnc/reports/components/report/report.component";

import { ReportService } from '@balnc/reports/services/report.service';

const routes: Routes = [{
  path: '',
  component: WrapperComponent,
  resolve: {
    ReportService
  },
  children: [
    { path: 'overview', component: OverviewComponent },
    { path: ':id', component: ReportComponent },
    { path: '', redirectTo: "overview" },
  ]
}]

export const ReportRoutes = routes
