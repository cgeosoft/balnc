import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@balnc/shared';
import { OverviewComponent } from './overview/overview.component';
import { ViewComponent } from './view/view.component';



@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([])
  ],
  declarations: [
    OverviewComponent,
    ViewComponent
  ],
  providers: []
})
export class OrdersModule { }
