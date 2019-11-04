import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { SharedModule } from '@balnc/shared'
import { OverviewComponent } from './overview/overview.component'

@NgModule({
  declarations: [
    OverviewComponent
  ],
  entryComponents: [
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: '', component: OverviewComponent }
    ])
  ]
})
export class PaymentsModule { }
