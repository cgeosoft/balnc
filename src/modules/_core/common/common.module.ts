import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule as ngCommonModule } from '@angular/common';
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { NgPipesModule } from 'angular-pipes';

import { MainComponent } from './components/main/main.component'
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component'
import { ContentHeaderComponent } from './components/content/header/content-header.component'
import { EmptyPanelComponent } from './components/empty-panel/empty-panel.component'

@NgModule({
  imports: [
    ngCommonModule,
    RouterModule,
    NgbModule,
    NgPipesModule,
  ],
  declarations: [
    MainComponent,
    PageNotFoundComponent,
    ContentHeaderComponent,
    EmptyPanelComponent,
  ],
  providers: [],
  exports: [
    ngCommonModule,
    NgbModule,
    NgPipesModule,

    ContentHeaderComponent,
    EmptyPanelComponent,
  ]
})
export class CommonModule { }
