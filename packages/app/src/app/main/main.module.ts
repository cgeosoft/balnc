import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { SharedModule } from '@balnc/shared'
import { MainShellComponent } from './@shell/shell.component'
import { AppbarComponent } from './appbar/appbar.component'
import { ErrorComponent } from './error/error.component'
import { MainGuard } from './main.guard'
import { StatusbarComponent } from './statusbar/statusbar.component'

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([])
  ],
  declarations: [
    AppbarComponent,
    ErrorComponent,
    MainShellComponent,
    StatusbarComponent
  ],
  providers: [
    MainGuard
  ],
  exports: [
    ErrorComponent,
    MainShellComponent
  ]
})
export class MainModule { }
