import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { SharedModule } from '@balnc/shared'
import { ImportComponent } from './import.component'

@NgModule({
  declarations: [
    ImportComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([{
      path: '',
      component: ImportComponent
    }])
  ]
})
export class ImportModule { }
