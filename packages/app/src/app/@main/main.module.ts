import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { SharedModule } from '@balnc/shared'
import { MainShellComponent } from './@shell/shell.component'
import { AppbarComponent } from './appbar/appbar.component'
import { ChangelogComponent } from './changelog/changelog.component'
import { ErrorComponent } from './error/error.component'
import { LoginComponent } from './login/login.component'
import { MainGuard } from './main.guard'
import { StatusbarComponent } from './statusbar/statusbar.component'
import { UserFormComponent } from './user-form/user-form.component'

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([])
  ],
  declarations: [
    AppbarComponent,
    ErrorComponent,
    MainShellComponent,
    StatusbarComponent,
    ChangelogComponent,
    LoginComponent,
    UserFormComponent
  ],
  providers: [
    MainGuard
  ],
  exports: [
    ErrorComponent,
    MainShellComponent
  ],
  entryComponents: [
    ChangelogComponent,
    LoginComponent,
    UserFormComponent
  ]
})
export class MainModule { }
