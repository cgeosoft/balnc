import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { SharedModule } from '@balnc/shared'
import { ShellComponent } from './@shell/shell.component'

@NgModule({
  declarations: [ShellComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: '', component: ShellComponent }
    ])
  ]
})
export class FilesModule { }
