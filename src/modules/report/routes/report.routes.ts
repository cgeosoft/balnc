import { Routes } from "@angular/router";

import { WrapperComponent } from "@balnc/report/components/_wrapper/wrapper.component";
import { OverviewComponent } from "@balnc/report/components/overview/overview.component";
import { ReportComponent } from "@balnc/report/components/report/report.component";

import { ReportService } from '@balnc/report/services/report.service';

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
