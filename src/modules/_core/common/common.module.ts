import { CommonModule as ngCommonModule } from '@angular/common';
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import {
  MainComponent,
  PageNotFoundComponent,
  ContentHeaderComponent
} from './components'

@NgModule({
  imports: [
    ngCommonModule,
    RouterModule,
  ],
  declarations: [
    MainComponent,
    PageNotFoundComponent,
    ContentHeaderComponent,
  ],
  providers: [],
  exports: [
    ContentHeaderComponent,
    ngCommonModule,
  ]
})
export class CommonModule { }
