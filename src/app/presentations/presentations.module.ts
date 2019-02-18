import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { SharedModule } from '@balnc/shared'
import { ChartModule } from 'angular2-chartjs'
import { SWIPER_CONFIG, SwiperModule } from 'ngx-swiper-wrapper'

import { WrapperComponent } from './components/_wrapper/wrapper.component'
import { AddPageComponent } from './components/add-page/add-page.component'
import { CreateComponent } from './components/create/create.component'
import { OverviewComponent } from './components/overview/overview.component'
import { PresentationComponent } from './components/presentation/presentation.component'
import { PresentationsService } from './presentations.service'
import { PresentationsRoutes } from './presentations.routes'

@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    RouterModule.forChild(PresentationsRoutes),
    SwiperModule,
    ChartModule
  ],
  declarations: [
    WrapperComponent,
    OverviewComponent,
    PresentationComponent,
    CreateComponent,
    AddPageComponent
  ],
  providers: [
    PresentationsService,
    {
      provide: SWIPER_CONFIG,
      useValue: {
        direction: 'horizontal',
        slidesPerView: 'auto',
        effect: 'coverflow'
      }
    }
  ],
  entryComponents: [
    CreateComponent,
    AddPageComponent
  ]
})
export class PresentationsModule { }
