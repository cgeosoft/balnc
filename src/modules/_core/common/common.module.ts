import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import {
  MainComponent,
  PageNotFoundComponent,
  ContentHeaderComponent
} from './components'

@NgModule({
  imports: [
    RouterModule
  ],
  declarations: [
    MainComponent,
    PageNotFoundComponent,
    ContentHeaderComponent,
  ],
  providers: [],
  exports: [
    ContentHeaderComponent,
  ]
})
export class BlcCommonModule { }
