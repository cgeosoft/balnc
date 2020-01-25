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
import { ContentComponent } from './components/content/content.component'
import { DebugComponent } from './components/debug/debug.component'
import { EmptyComponent } from './components/empty/empty.component'
import { FooterComponent } from './components/footer/footer.component'
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component'
import { PageComponent } from './components/page/page.component'
import { SidemenuComponent } from './components/sidemenu/sidemenu.component'
import { SpinnerComponent } from './components/spinner/spinner.component'
import { PaginatePipe } from './components/table/paginate.pipe'
import { SearchPipe } from './components/table/search.pipe'
import { TableComponent } from './components/table/table.component'
import { ToolbarComponent } from './components/toolbar/toolbar.component'
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
    ContentComponent,
    ConfirmDialogComponent,
    PageComponent,
    DebugComponent,
    EmptyComponent,
    FooterComponent,
    PageNotFoundComponent,
    SpinnerComponent,
    TableComponent,

    DocVersionPipe,
    EllipsisPipe,
    PaginatePipe,
    SearchPipe,
    ToolbarComponent,
    SidemenuComponent
  ],
  entryComponents: [ConfirmDialogComponent],
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
    SearchPipe,

    ConfirmDialogComponent,
    ContentComponent,
    PageComponent,
    DebugComponent,
    EmptyComponent,
    FooterComponent,
    SpinnerComponent,
    TableComponent,
    ToolbarComponent,
    SidemenuComponent
  ]
})
export class SharedModule {}
