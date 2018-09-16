import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@balnc/common'

import { SetupComponent } from './setup.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    SetupComponent
  ],
  providers: [],
  entryComponents: []
})
export class SetupModule { }
