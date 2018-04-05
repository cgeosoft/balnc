import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from "@blnc/core/common/common.module"
import { MainComponent } from '@blnc/core/main/main.component';
import { PageNotFoundComponent } from '@blnc/core/common/components/page-not-found/page-not-found.component';
import { DefaultProfileGuard } from '@blnc/core/profile/guards/profile.guard';
import { DatabaseService } from '@blnc/core/database/services/database.service';

const routes: Routes = [{
  path: '',
  component: MainComponent,
  canActivate: [DefaultProfileGuard],
  children: [{
    path: 'dashboard',
    loadChildren: "@blnc/core/dashboard/dashboard.module#DashboardModule"
  }, {
    path: 'page-not-found',
    component: PageNotFoundComponent,
  }, {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
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
