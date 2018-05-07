import { NgModule } from '@angular/core'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { CommonModule as AngularCommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { NgPipesModule } from 'ngx-pipes'
import { MomentModule } from 'angular2-moment'
import { FileHelpersModule } from 'ngx-file-helpers'

import { SideBarComponent } from '@balnc/common/components/side-bar/side-bar.component'
import { StatusBarComponent } from '@balnc/common/components/status-bar/status-bar.component'
import { PageNotFoundComponent } from '@balnc/common/components/page-not-found/page-not-found.component'
import { ContentComponent } from '@balnc/common/components/content/content.component'
import { ContentHeaderComponent } from '@balnc/common/components/content-header/content-header.component'
import { ContentBodyComponent } from '@balnc/common/components/content-body/content-body.component'
import { EmptyComponent } from '@balnc/common/components/empty/empty.component'
import { DebugComponent } from '@balnc/common/components/debug/debug.component'
import { LoaderComponent } from '@balnc/common/components/loader/loader.component'
import { EllipsisPipe } from '@balnc/common/pipes/ellipsis.pipe'
import { DocVersionPipe } from '@balnc/common/pipes/doc-version.pipe'
import { HelperService } from '@balnc/common/services/helper.service'
import { FooterComponent } from '@balnc/common/components/footer/footer.component';

@NgModule({
  imports: [
    HttpClientModule,
    AngularCommonModule,
    NgbModule,
    NgPipesModule,
    FileHelpersModule,
    MomentModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([]),
  ],
  declarations: [
    ContentBodyComponent,
    ContentComponent,
    ContentHeaderComponent,
    DebugComponent,
    DocVersionPipe,
    EllipsisPipe,
    EmptyComponent,
    LoaderComponent,
    PageNotFoundComponent,
    SideBarComponent,
    StatusBarComponent,
    FooterComponent,
  ],
  providers: [
    HelperService,
  ],
  exports: [
    AngularCommonModule,
    ContentBodyComponent,
    ContentComponent,
    ContentHeaderComponent,
    DebugComponent,
    DocVersionPipe,
    EllipsisPipe,
    EmptyComponent,
    FileHelpersModule,
    FormsModule,
    HttpClientModule,
    LoaderComponent,
    MomentModule,
    NgbModule,
    NgPipesModule,
    ReactiveFormsModule,
    SideBarComponent,
    StatusBarComponent,
    FooterComponent,
  ],
})
export class CommonModule { }
