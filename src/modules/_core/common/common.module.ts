import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule as AngularCommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { NgPipesModule } from 'ngx-pipes';
import { MomentModule } from 'angular2-moment';

import { SidebarComponent } from '@blnc/core/common/components/sidebar/sidebar.component';
import { StatusBarComponent } from '@blnc/core/common/components/status-bar/status-bar.component';
import { PageNotFoundComponent } from '@blnc/core/common/components/page-not-found/page-not-found.component'
import { ContentComponent } from '@blnc/core/common/components/content/content.component'
import { ContentHeaderComponent } from '@blnc/core/common/components/content-header/content-header.component'
import { ContentBodyComponent } from '@blnc/core/common/components/content-body/content-body.component'
import { EmptyPanelComponent } from '@blnc/core/common/components/empty-panel/empty-panel.component'
import { DebugPanelComponent } from '@blnc/core/common/components/debug-panel/debug-panel.component'
import { LoaderComponent } from '@blnc/core/common/components/loader/loader.component'
import { EllipsisPipe } from '@blnc/core/common/pipes/ellipsis.pipe';
import { HttpClientModule } from '@angular/common/http';
import { DocVersionPipe } from '@blnc/core/common/pipes/doc-version.pipe';
import { FilesModule } from '@blnc/core/files/files.module';
import { ConfigModule } from '@blnc/core/config/config.module';
import { ProdNotifComponent } from '@blnc/core/common/components/prod-notif/prod-notif.component';

@NgModule({
  imports: [
    HttpClientModule,
    AngularCommonModule,
    RouterModule,
    NgbModule,
    NgPipesModule,
    MomentModule,
    FormsModule,
    ReactiveFormsModule,
    FilesModule,
    ConfigModule,
  ],
  declarations: [
    SidebarComponent,
    StatusBarComponent,
    PageNotFoundComponent,
    ContentComponent,
    ContentHeaderComponent,
    ContentBodyComponent,
    EmptyPanelComponent,
    DebugPanelComponent,
    ProdNotifComponent,
    LoaderComponent,
    EllipsisPipe,
    DocVersionPipe,
  ],
  providers: [],
  exports: [
    HttpClientModule,
    AngularCommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    SidebarComponent,
    StatusBarComponent,
    ContentComponent,
    ContentHeaderComponent,
    ContentBodyComponent,
    EmptyPanelComponent,
    DebugPanelComponent,
    ProdNotifComponent,
    LoaderComponent,
    NgPipesModule,
    MomentModule,
    EllipsisPipe,
    DocVersionPipe,
    FilesModule,
    ConfigModule,
  ],
  entryComponents: [
    ProdNotifComponent,
  ]
})
export class CommonModule { }
