import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { ContenteditableModule } from '@ng-stack/contenteditable'
import { DateFnsModule } from 'ngx-date-fns'
import { NgxFileHelpersModule } from 'ngx-file-helpers'
import { MarkdownModule } from 'ngx-markdown'
import { NgPipesModule } from 'ngx-pipes'
import { WebStorageModule } from 'ngx-store'
import { ToastrModule } from 'ngx-toastr'
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component'
import { ContentBodyComponent } from './components/content-body/content-body.component'
import { ContentBreadcrumbComponent } from './components/content-breadcrumb/content-breadcrumb.component'
import { ContentHeaderComponent } from './components/content-header/content-header.component'
import { ContentComponent } from './components/content/content.component'
import { DebugComponent } from './components/debug/debug.component'
import { EmptyComponent } from './components/empty/empty.component'
import { FooterComponent } from './components/footer/footer.component'
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component'
import { SidebarComponent } from './components/sidebar/sidebar.component'
import { SpinnerComponent } from './components/spinner/spinner.component'
import { FontAwesomeModule } from './modules/font-awesome/font-awesome.module'
import { DocVersionPipe } from './pipes/doc-version.pipe'
import { EllipsisPipe } from './pipes/ellipsis.pipe'

@NgModule({
  imports: [
    FontAwesomeModule,
    CommonModule,
    NgxFileHelpersModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    NgPipesModule,
    ReactiveFormsModule,
    RouterModule,
    WebStorageModule,
    ToastrModule,
    ContenteditableModule,
    MarkdownModule.forChild()
  ],
  declarations: [
    ContentBodyComponent,
    ConfirmDialogComponent,
    ContentComponent,
    ContentHeaderComponent,
    DebugComponent,
    DocVersionPipe,
    EllipsisPipe,
    EmptyComponent,
    FooterComponent,
    PageNotFoundComponent,
    SidebarComponent,
    SpinnerComponent,
    ContentBreadcrumbComponent
  ],
  entryComponents: [
    ConfirmDialogComponent
  ],
  exports: [
    FontAwesomeModule,
    RouterModule,
    CommonModule,
    NgxFileHelpersModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    NgPipesModule,
    ReactiveFormsModule,
    ToastrModule,
    DateFnsModule,
    ContenteditableModule,
    MarkdownModule,

    DocVersionPipe,
    EllipsisPipe,

    ContentBodyComponent,
    ConfirmDialogComponent,
    ContentComponent,
    ContentHeaderComponent,
    DebugComponent,
    EmptyComponent,
    FooterComponent,
    SidebarComponent,
    SpinnerComponent,
    ContentBreadcrumbComponent
  ]
})
export class SharedModule { }
