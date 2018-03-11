import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule as ngCommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { NgPipesModule } from 'ngx-pipes';
import { MomentModule } from 'angular2-moment';

import { SidebarComponent } from './components/sidebar/sidebar.component'
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component'
import { ContentComponent } from './components/content/content.component'
import { ContentHeaderComponent } from './components/content-header/content-header.component'
import { ContentBodyComponent } from './components/content-body/content-body.component'
import { EmptyPanelComponent } from './components/empty-panel/empty-panel.component'
import { DebugPanelComponent } from './components/debug-panel/debug-panel.component'
import { LoaderComponent } from './components/loader/loader.component'
import { EllipsisPipe } from './pipes/ellipsis.pipe';

@NgModule({
  imports: [
    ngCommonModule,
    RouterModule,
    NgbModule,
    NgPipesModule,
    MomentModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    SidebarComponent,
    PageNotFoundComponent,
    ContentComponent,
    ContentHeaderComponent,
    ContentBodyComponent,
    EmptyPanelComponent,
    DebugPanelComponent,
    LoaderComponent,
    EllipsisPipe,
  ],
  providers: [],
  exports: [
    ngCommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    SidebarComponent,
    ContentComponent,
    ContentHeaderComponent,
    ContentBodyComponent,
    EmptyPanelComponent,
    DebugPanelComponent,
    LoaderComponent,
    NgPipesModule,
    MomentModule,
    EllipsisPipe,
  ]
})
export class CommonModule { }
