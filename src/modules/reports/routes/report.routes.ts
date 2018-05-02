import { Routes } from "@angular/router";

import { MainComponent } from "@blnc/reports/components/_main/main.component";
import { OverviewComponent } from "@blnc/reports/components/overview/overview.component";
import { ReportComponent } from "@blnc/reports/components/report/report.component";

import { ReportService } from '@blnc/reports/services/report.service';
import { LoginComponent } from "@blnc/reports/components/login/login.component";
import { ReportGuard } from "@blnc/reports/guards/report.guard";
import { ReportsComponent } from "@blnc/reports/components/reports/reports.component";

const routes: Routes = [{
  path: '',
  component: MainComponent,
  resolve: {
    ReportService
  },
  children: [
    { path: 'login', component: LoginComponent },
    {
      path: 'view',
      canActivate: [ReportGuard],
      component: ReportsComponent,
      children: [
        { path: 'overview', component: OverviewComponent },
        {
          path: ':id',
          component: ReportComponent
        }
      ]
    },
    { path: '', redirectTo: "view/overview" },
  ],
}]

export const ReportRoutes = routes
