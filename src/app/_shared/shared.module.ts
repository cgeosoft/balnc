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

<<<<<<< HEAD:src/modules/_common/common.module.ts
import { ContentBodyComponent } from './components/content-body/content-body.component'
import { ContentHeaderComponent } from './components/content-header/content-header.component'
import { ContentComponent } from './components/content/content.component'
import { DebugComponent } from './components/debug/debug.component'
import { EmptyComponent } from './components/empty/empty.component'
import { ErrorComponent } from './components/error/error.component'
import { FooterComponent } from './components/footer/footer.component'
import { SpinnerComponent } from './components/spinner/spinner.component'
import { MainComponent } from './components/main/main.component'
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component'
import { SidebarComponent } from './components/sidebar/sidebar.component'
import { DocVersionPipe } from './pipes/doc-version.pipe'
import { EllipsisPipe } from './pipes/ellipsis.pipe'
import { RxDBService } from './rxdb/rxdb.service'
import { HelperService } from './services/helper.service'
import { CommonService } from './services/common.service'
import { DateFnsModule } from 'ngx-date-fns'
=======
import { ContentBodyComponent } from './components/content-body/content-body.component';
import { ContentHeaderComponent } from './components/content-header/content-header.component';
import { ContentComponent } from './components/content/content.component';
import { DebugComponent } from './components/debug/debug.component';
import { EmptyComponent } from './components/empty/empty.component';
import { ErrorComponent } from './components/error/error.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoaderComponent } from './components/loader/loader.component';
import { MainComponent } from './components/main/main.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DocVersionPipe } from './pipes/doc-version.pipe';
import { EllipsisPipe } from './pipes/ellipsis.pipe';
>>>>>>> 691769442f885075ef7b2d4ff225f98d4258e0cd:src/app/_shared/shared.module.ts

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
<<<<<<< HEAD:src/modules/_common/common.module.ts
    SpinnerComponent,
    MainComponent,
=======
    LoaderComponent,
>>>>>>> 691769442f885075ef7b2d4ff225f98d4258e0cd:src/app/_shared/shared.module.ts
    PageNotFoundComponent,
    SidebarComponent,
    MainComponent,
    ErrorComponent,
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
<<<<<<< HEAD:src/modules/_common/common.module.ts
    SpinnerComponent,
    SidebarComponent
=======
    LoaderComponent,
    SidebarComponent,
    MainComponent,
    ErrorComponent,
>>>>>>> 691769442f885075ef7b2d4ff225f98d4258e0cd:src/app/_shared/shared.module.ts
  ]
})
export class SharedModule { }
