import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'

import { CommonModule } from '@balnc/common'

import { PresentationsService } from './services/presentations.service'
import { ItemComponent } from './components/item/item.component'
import { CreatePresentationComponent } from './components/create-presentation/create-presentation.component'
import { AddPageComponent } from './components/add-page/add-page.component'
import { OverviewComponent } from './components/overview/overview.component'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
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
