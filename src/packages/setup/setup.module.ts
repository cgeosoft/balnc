import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@balnc/common'

import { SetupComponent } from './setup.component'
import { SetupRoutes } from './setup.routes'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(SetupRoutes)
  ],
  declarations: [
    SetupComponent
  ],
  providers: [],
  entryComponents: []
})
export class SetupModule { }
