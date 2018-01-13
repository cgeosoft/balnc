import { CommonModule as ngCommonModule } from '@angular/common';
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { MainComponent } from './components/main/main.component'
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component'
import { ContentHeaderComponent } from './components/content/header/content-header.component'
import { EmptyPanelComponent } from './components/empty-panel/empty-panel.component'

@NgModule({
  imports: [
    ngCommonModule,
    RouterModule,
  ],
  declarations: [
    MainComponent,
    PageNotFoundComponent,
    ContentHeaderComponent,
    EmptyPanelComponent,
  ],
  providers: [],
  exports: [
    ContentHeaderComponent,
    EmptyPanelComponent,
    ngCommonModule,
  ]
})
export class CommonModule { }
