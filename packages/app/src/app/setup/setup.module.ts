import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { SharedModule } from '@balnc/shared'
import { SetupComponent } from './setup.component'
import { SetupGuard } from './setup.guard'
import { SetupRoutes } from './setup.routes'

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(SetupRoutes)
  ],
  declarations: [
    SetupComponent
  ],
  providers: [
    SetupGuard
  ]
})
export class SetupModule { }
