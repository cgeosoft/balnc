import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { SharedModule } from './../@shared/shared.module'
import { SupportComponent } from './support/support.component'

@NgModule({
  declarations: [SupportComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([{
      path: '',
      component: SupportComponent,
      data: {
        breadcrumb: {
          label: 'Support'
        }
      }
    }])
  ]
})
export class SupportModule { }
