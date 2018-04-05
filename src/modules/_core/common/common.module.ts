import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { CommonModule as AngularCommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgModule, APP_INITIALIZER, Injector } from '@angular/core'

import { NgPipesModule } from 'ngx-pipes'
import { MomentModule } from 'angular2-moment'

import { SideBarComponent } from '@blnc/core/common/components/side-bar/side-bar.component'
import { StatusBarComponent } from '@blnc/core/common/components/status-bar/status-bar.component'
import { PageNotFoundComponent } from '@blnc/core/common/components/page-not-found/page-not-found.component'
import { ContentComponent } from '@blnc/core/common/components/content/content.component'
import { ContentHeaderComponent } from '@blnc/core/common/components/content-header/content-header.component'
import { ContentBodyComponent } from '@blnc/core/common/components/content-body/content-body.component'
import { EmptyPanelComponent } from '@blnc/core/common/components/empty-panel/empty-panel.component'
import { DebugPanelComponent } from '@blnc/core/common/components/debug-panel/debug-panel.component'
import { LoaderComponent } from '@blnc/core/common/components/loader/loader.component'
import { EllipsisPipe } from '@blnc/core/common/pipes/ellipsis.pipe'
import { HttpClientModule } from '@angular/common/http'
import { DocVersionPipe } from '@blnc/core/common/pipes/doc-version.pipe'
import { FilesModule } from '@blnc/core/files/files.module'
import { ProdNotifComponent } from '@blnc/core/common/components/prod-notif/prod-notif.component'

import { HelperService } from '@blnc/core/common/services/helper.service'
import { ConfigService } from '@blnc/core/common/services/config.service';
import { RouterModule, Router } from '@angular/router';
import { DatabaseService } from '@blnc/core/common/services/database.service';

@NgModule({
  imports: [
    HttpClientModule,
    AngularCommonModule,
    NgbModule,
    NgPipesModule,
    MomentModule,
    FormsModule,
    ReactiveFormsModule,
    FilesModule,
    // RouterModule.forChild([]),
  ],
  declarations: [
    SideBarComponent,
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
  providers: [

    HelperService,
    ConfigService,
    DatabaseService,
    {
      provide: APP_INITIALIZER,
      useFactory: (configService: ConfigService) => () => configService.setup(),
      deps: [ConfigService],
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (databaseService: DatabaseService) => () => databaseService.setup(),
      deps: [DatabaseService],
      multi: true
    }
  ],
  exports: [
    HttpClientModule,
    AngularCommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    SideBarComponent,
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
  ],
  entryComponents: [
    ProdNotifComponent,
  ]
})
export class CommonModule { }
