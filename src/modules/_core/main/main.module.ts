import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@balnc/common/common.module';
import { MainComponent } from '@balnc/core/main/main.component';
// import { PageNotFoundComponent } from '@balnc/common/components/page-not-found/page-not-found.component';
import { DefaultProfileGuard } from '@balnc/core/profile/guards/profile.guard';
import { WelcomeGuard } from '@balnc/core/welcome/welcome.guard';

const routes: Routes = [{
  path: '',
  component: MainComponent,
  canActivate: [
    WelcomeGuard,
    DefaultProfileGuard,
  ],
  children: [{
    path: 'dashboard',
    loadChildren: "@balnc/core/dashboard/dashboard.module#DashboardModule",
  // }, {
  //   path: 'business',
  //   loadChildren: "@balnc/business/business.module#BusinessModule",
  // }, {
  //   path: 'teams',
  //   loadChildren: "@balnc/teams/teams.module#TeamsModule",
  // }, {
  //   path: 'marketing',
  //   loadChildren: "@balnc/marketing/marketing.module#MarketingModule",
  // }, {
  //   path: 'report',
  //   loadChildren: "@balnc/report/report.module#ReportModule",
  }, {
    path: '',
    pathMatch: "full",
    redirectTo: "/dashboard"
  }],
}]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    MainComponent,
  ]
})
export class MainModule { }
