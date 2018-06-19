import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { ActivatedRouteSnapshot, RouterModule, RouterStateSnapshot, Routes } from '@angular/router'

import { CommonModule } from '@balnc/common/common.module'
import { PresentationsService } from '@balnc/marketing/presentations/services/presentations.service'
import { ItemComponent } from '@balnc/marketing/presentations/components/item/item.component'
import { CreatePresentationComponent } from '@balnc/marketing/presentations/components/create-presentation/create-presentation.component'
import { AddPageComponent } from '@balnc/marketing/presentations/components/add-page/add-page.component'
import { OverviewComponent } from '@balnc/marketing/presentations/components/overview/overview.component'

const routes: Routes = [{
  path: 'presentations',
  resolve: {
    service: PresentationsService
  },
  children: [
    { path: 'overview', component: OverviewComponent },
    { path: ':id', component: ItemComponent },
    { path: '', redirectTo: "overview" },
  ]
}]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    OverviewComponent,
    ItemComponent,
    CreatePresentationComponent,
    AddPageComponent,
  ],
  providers: [
    PresentationsService
  ],
  entryComponents: [
    CreatePresentationComponent,
    AddPageComponent,
  ]
})
export class PresentationsModule { }
