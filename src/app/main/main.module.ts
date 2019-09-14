import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { SharedModule } from '../_shared/shared.module'
import { AppbarComponent } from './components/appbar/appbar.component'
import { ErrorComponent } from './components/error/error.component'
import { MainShellComponent } from './components/main-shell/main-shell.component'
import { StatusbarComponent } from './components/statusbar/statusbar.component'

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
