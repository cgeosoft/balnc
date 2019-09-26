import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { SharedModule } from '@balnc/shared'
import { AppbarComponent } from './appbar/appbar.component'
import { ErrorComponent } from './error/error.component'
import { MainShellComponent } from './main-shell/main-shell.component'
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
  exports: [
    ErrorComponent,
    MainShellComponent
  ]
})
export class MainModule { }
