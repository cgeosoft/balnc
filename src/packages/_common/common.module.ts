import { CommonModule as AngularCommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { FileHelpersModule } from 'ngx-file-helpers'
import { MomentModule } from 'ngx-moment'
import { NgPipesModule } from 'ngx-pipes'
import { WebStorageModule } from 'ngx-store'
import { ToastrModule } from 'ngx-toastr'

import { BoxComponent } from './components/box/box.component'
import { ContentBodyComponent } from './components/content-body/content-body.component'
import { ContentHeaderComponent } from './components/content-header/content-header.component'
import { ContentComponent } from './components/content/content.component'
import { DebugComponent } from './components/debug/debug.component'
import { EmptyComponent } from './components/empty/empty.component'
import { ErrorComponent } from './components/error/error.component'
import { FooterComponent } from './components/footer/footer.component'
import { LoaderComponent } from './components/loader/loader.component'
import { MainComponent } from './components/main/main.component'
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component'
import { SidebarComponent } from './components/sidebar/sidebar.component'
import { AgoPipe } from './pipes/ago.pipe'
import { DocVersionPipe } from './pipes/doc-version.pipe'
import { EllipsisPipe } from './pipes/ellipsis.pipe'
import { RxDBService } from './rxdb/rxdb.service'
import { HelperService } from './services/helper.service'

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
    WebStorageModule
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
    HelperService,
    RxDBService
  ],
  exports: [
    AngularCommonModule,
    FileHelpersModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
    MomentModule,
    NgbModule,
    NgPipesModule,
    ReactiveFormsModule,
    ToastrModule,

    AgoPipe,
    DocVersionPipe,
    EllipsisPipe,

    BoxComponent,
    ContentBodyComponent,
    ContentComponent,
    ContentHeaderComponent,
    DebugComponent,
    EmptyComponent,
    ErrorComponent,
    FooterComponent,
    LoaderComponent,
    SidebarComponent
  ]
})
export class CommonModule { }
