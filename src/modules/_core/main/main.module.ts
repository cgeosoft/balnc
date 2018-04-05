import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from "@blnc/core/common/common.module"
import { MainComponent } from '@blnc/core/main/main.component';
import { PageNotFoundComponent } from '@blnc/core/common/components/page-not-found/page-not-found.component';
import { DefaultProfileGuard } from '@blnc/core/profile/guards/profile.guard';

const routes: Routes = [{
  path: '',
  component: MainComponent,
  canActivate: [DefaultProfileGuard],
  children: [{
    path: 'dashboard',
    loadChildren: "@blnc/core/dashboard/dashboard.module#DashboardModule"
  }, {
    path: 'settings',
    loadChildren: "@blnc/core/settings/settings.module#SettingsModule"
  }, {
    //   path: "orders",
    //   loadChildren: "@blnc/business/orders/orders.module#OrdersModule"
    // }, {
    path: "invoices",
    loadChildren: "@blnc/business/invoices/invoices.module#InvoicesModule"
  }, {
    path: "presentations",
    loadChildren: "@blnc/marketing/presentations/presentations.module#PresentationsModule"
  }, {
    path: "projects",
    loadChildren: "@blnc/teams/projects/projects.module#ProjectsModule"
  }, {
    path: "chat",
    loadChildren: "@blnc/teams/chat/chat.module#ChatModule"
  }, {
    path: 'page-not-found',
    component: PageNotFoundComponent,
  }],
}]

@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  providers: [DefaultProfileGuard],
  entryComponents: []
})
export class MainModule { }
