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
    path: 'contacts',
    loadChildren: "@blnc/business/contacts/contacts.module#ContactsModule"
  }, {
    path: 'invoices',
    loadChildren: "@blnc/business/invoices/invoices.module#InvoicesModule"
  }, {
    path: 'presentations',
    loadChildren: "@blnc/marketing/presentations/presentations.module#PresentationsModule",
  }, {
    path: 'chat',
    loadChildren: "@blnc/teams/chat/chat.module#ChatModule"
  }, {
    path: 'projects',
    loadChildren: "@blnc/teams/projects/projects.module#ProjectsModule"
  }, {
    path: 'settings',
    loadChildren: "@blnc/core/settings/settings.module#SettingsModule"
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
