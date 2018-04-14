import { Routes } from "@angular/router";

import { MainComponent } from "@blnc/reports/components/_main/main.component";
import { OverviewComponent } from "@blnc/reports/components/overview/overview.component";
import { ReportComponent } from "@blnc/reports/components/report/report.component";

import { ReportService } from '@blnc/reports/services/report.service';
const routes: Routes = [{
  path: '',
  component: MainComponent,
  resolve: {
    ReportService
  },
  children: [
    { path: 'overview', component: OverviewComponent },
    { path: ':alias', component: ReportComponent },
    { path: '', redirectTo: "overview" },
  ],
}]

export const ReportRoutes = routes
