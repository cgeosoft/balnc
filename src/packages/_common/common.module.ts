import { NgModule } from '@angular/core'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { CommonModule as AngularCommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { ToastrModule } from 'ngx-toastr'
import { WebStorageModule } from 'ngx-store'

import { NgPipesModule } from 'ngx-pipes'
import { MomentModule } from 'ngx-moment'
import { FileHelpersModule } from 'ngx-file-helpers'

import { AgoPipe } from './pipes/ago.pipe'

import { ContentBodyComponent } from './components/content-body/content-body.component'
import { ContentComponent } from './components/content/content.component'
import { ContentHeaderComponent } from './components/content-header/content-header.component'
import { DebugComponent } from './components/debug/debug.component'
import { DocVersionPipe } from './pipes/doc-version.pipe'
import { EllipsisPipe } from './pipes/ellipsis.pipe'
import { EmptyComponent } from './components/empty/empty.component'
import { FooterComponent } from './components/footer/footer.component'
import { LoaderComponent } from './components/loader/loader.component'
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component'
import { SidebarComponent } from './components/sidebar/sidebar.component'

import { HelperService } from './services/helper.service'
import { MainComponent } from './components/main/main.component'
import { BoxComponent } from './components/box/box.component'
import { ErrorComponent } from './components/error/error.component'
import { RxDBModule } from './rxdb/rxdb.module';

library.add(fas, far)

@NgModule({
  imports: [
    AngularCommonModule,
    FileHelpersModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
    MomentModule,
    NgbModule,
    NgPipesModule,
    ReactiveFormsModule,
    RouterModule,
    ToastrModule,
    WebStorageModule,
    RxDBModule
  ],
  declarations: [
    AgoPipe,
    BoxComponent,
    ContentBodyComponent,
    ContentComponent,
    ContentHeaderComponent,
    DebugComponent,
    DocVersionPipe,
    EllipsisPipe,
    EmptyComponent,
    ErrorComponent,
    FooterComponent,
    LoaderComponent,
    MainComponent,
    PageNotFoundComponent,
    SidebarComponent
  ],
  providers: [
    HelperService
  ],
  exports: [
    AgoPipe,
    AngularCommonModule,
    BoxComponent,
    ContentBodyComponent,
    ContentComponent,
    ContentHeaderComponent,
    DebugComponent,
    DocVersionPipe,
    EllipsisPipe,
    EmptyComponent,
    ErrorComponent,
    FileHelpersModule,
    FontAwesomeModule,
    FooterComponent,
    FormsModule,
    HttpClientModule,
    LoaderComponent,
    MomentModule,
    NgbModule,
    NgPipesModule,
    ReactiveFormsModule,
    SidebarComponent,
    ToastrModule,
  ]
})
export class CommonModule { }
