import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { CommonModule } from '@balnc/common'

import { WrapperComponent } from './components/_wrapper/wrapper.component'
import { OverviewComponent } from './components/overview/overview.component'
import { ViewComponent } from './components/view/view.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    WrapperComponent,
    OverviewComponent,
    ViewComponent
  ],
  providers: []
})
export class OrdersModule { }
