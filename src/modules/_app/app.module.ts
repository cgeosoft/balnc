import { NgModule } from '@angular/core'
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { RouterModule, Routes } from '@angular/router'

import { CommonModule } from "@blnc/core/common/common.module"
import { DatabaseModule } from '@blnc/core/database/database.module'
import { ConfigModule } from '@blnc/core/config/config.module'
import { FilesModule } from '@blnc/core/files/files.module'
import { MainModule } from '@blnc/core/main/main.module';

import { AppComponent } from './app.component'
import { PageNotFoundComponent } from '@blnc/core/common/components/page-not-found/page-not-found.component';
import { MainComponent } from '@blnc/core/main/main.component';
import { DatabaseService } from '@blnc/core/database/services/database.service';
import { AccountsService } from '@blnc/core/accounts/accounts.service';
import { AccountsModule } from '@blnc/general/accounts/accounts.module';

const routes: Routes = [{
  path: '',
  component: MainComponent,
  resolve: {
    service: AccountsService
  },
  children: [{
    path: 'dashboard',
    loadChildren: "@blnc/general/dashboard/dashboard.module#DashboardModule"
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
    loadChildren: "@blnc/general/settings/settings.module#SettingsModule"
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
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MainModule,
    AccountsModule,
    RouterModule.forRoot(routes, {
      enableTracing: true
    }),
    NgbModule.forRoot(),

    DatabaseModule.forRoot(),
    FilesModule,
    ConfigModule,

    CommonModule,
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [],
  exports: [
    RouterModule
  ]
})
export class AppModule { }
