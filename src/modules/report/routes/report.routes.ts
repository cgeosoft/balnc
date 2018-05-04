import { Routes } from "@angular/router";

import { MainComponent } from "@blnc/report/components/_main/main.component";
import { OverviewComponent } from "@blnc/report/components/overview/overview.component";
import { ReportComponent } from "@blnc/report/components/report/report.component";

import { ReportService } from '@blnc/report/services/report.service';
import { LoginComponent } from "@blnc/report/components/login/login.component";
import { ReportGuard } from "@blnc/report/guards/report.guard";
import { ReportsComponent } from "@blnc/report/components/reports/reports.component";

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
