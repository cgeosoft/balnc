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
// import { ToastrModule } from 'ngx-toastr'

import { NgPipesModule } from 'ngx-pipes'
// import { MomentModule } from 'angular2-moment'
import { FileHelpersModule } from 'ngx-file-helpers'

import { SideBarComponent } from './components/side-bar/side-bar.component'
// import { StatusBarComponent } from './components/status-bar/status-bar.component'
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component'
import { ContentComponent } from './components/content/content.component'
import { ContentHeaderComponent } from './components/content-header/content-header.component'
import { ContentBodyComponent } from './components/content-body/content-body.component'
import { EmptyComponent } from './components/empty/empty.component'
import { DebugComponent } from './components/debug/debug.component'
import { LoaderComponent } from './components/loader/loader.component'
import { EllipsisPipe } from './pipes/ellipsis.pipe'
import { DocVersionPipe } from './pipes/doc-version.pipe'
import { AgoPipe } from './pipes/ago.pipe'
import { HelperService } from './services/helper.service'
import { FooterComponent } from './components/footer/footer.component'

// Add an icon to the library for convenient access in other components
library.add(fas, far)

@NgModule({
  imports: [
    HttpClientModule,
    AngularCommonModule,
    NgbModule,
    NgPipesModule,
    FileHelpersModule,
    // MomentModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([]),
    FontAwesomeModule,
    // ToastrModule,
  ],
  declarations: [
    ContentBodyComponent,
    ContentComponent,
    ContentHeaderComponent,
    DebugComponent,
    DocVersionPipe,
    AgoPipe,
    EllipsisPipe,
    EmptyComponent,
    LoaderComponent,
    PageNotFoundComponent,
    SideBarComponent,
    // StatusBarComponent,
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
    AgoPipe,
    EllipsisPipe,
    EmptyComponent,
    FileHelpersModule,
    FormsModule,
    HttpClientModule,
    LoaderComponent,
    // MomentModule,
    NgbModule,
    NgPipesModule,
    ReactiveFormsModule,
    SideBarComponent,
    // StatusBarComponent,
    FooterComponent,
    FontAwesomeModule,
    // ToastrModule,
  ],
})
export class CommonModule { }
