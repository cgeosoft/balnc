import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from '@blnc/core/main/main.component';
// import { PageNotFoundComponent } from '@blnc/common/components/page-not-found/page-not-found.component';
import { DefaultProfileGuard } from '@blnc/core/profile/guards/profile.guard';
import { WelcomeGuard } from '@blnc/core/welcome/welcome.guard';

const routes: Routes = [{
  path: '',
  component: MainComponent,
  canActivate: [WelcomeGuard, DefaultProfileGuard],
  children: [{
    path: 'dashboard',
    loadChildren: "@blnc/core/dashboard/dashboard.module#DashboardModule"
  }, {
    path: '',
    loadChildren: "@blnc/business/business.module#BusinessModule"
  }, {
    path: '',
    loadChildren: "@blnc/team/team.module#TeamModule"
  }, {
    path: '',
    loadChildren: "@blnc/marketing/marketing.module#MarketingModule"
  }, {
    path: '',
    loadChildren: "@blnc/report/report.module#ReportModule"
  }, {
  //   path: 'page-not-found',
  //   component: PageNotFoundComponent,
  // }, {
    path: '',
    pathMatch: "full",
    redirectTo: "/dashboard"
  }]
}]

@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    RouterModule.forChild(routes),
  ],
  providers: [],
  entryComponents: []
})
export class MainModule { }
