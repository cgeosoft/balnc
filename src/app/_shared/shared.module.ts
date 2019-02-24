import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DateFnsModule } from 'ngx-date-fns';
import { FileHelpersModule } from 'ngx-file-helpers';
import { NgPipesModule } from 'ngx-pipes';
import { WebStorageModule } from 'ngx-store';
import { ToastrModule } from 'ngx-toastr';
import { ContentBodyComponent } from './components/content-body/content-body.component';
import { ContentHeaderComponent } from './components/content-header/content-header.component';
import { ContentComponent } from './components/content/content.component';
import { DebugComponent } from './components/debug/debug.component';
import { EmptyComponent } from './components/empty/empty.component';
import { ErrorComponent } from './components/error/error.component';
import { FooterComponent } from './components/footer/footer.component';
import { MainComponent } from './components/main/main.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { StatusbarComponent } from './components/statusbar/statusbar.component';
import { DocVersionPipe } from './pipes/doc-version.pipe';
import { EllipsisPipe } from './pipes/ellipsis.pipe';

library.add(fas, far)

@NgModule({
  imports: [
    CommonModule,
    FileHelpersModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    NgPipesModule,
    ReactiveFormsModule,
    RouterModule,
    ToastrModule,
    WebStorageModule,
    DateFnsModule.forRoot(),

    ToastrModule
  ],
  declarations: [
    ContentBodyComponent,
    ContentComponent,
    ContentHeaderComponent,
    DebugComponent,
    DocVersionPipe,
    EllipsisPipe,
    EmptyComponent,
    FooterComponent,
    PageNotFoundComponent,
    SidebarComponent,
    MainComponent,
    ErrorComponent,
    SpinnerComponent,
    StatusbarComponent
  ],
  exports: [
    CommonModule,
    FileHelpersModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    NgPipesModule,
    ReactiveFormsModule,
    ToastrModule,
    DateFnsModule,
    ToastrModule,

    DocVersionPipe,
    EllipsisPipe,

    ContentBodyComponent,
    ContentComponent,
    ContentHeaderComponent,
    DebugComponent,
    EmptyComponent,
    FooterComponent,
    StatusbarComponent,
    SidebarComponent,
    MainComponent,
    ErrorComponent,
    SpinnerComponent
  ]
})
export class SharedModule { }
