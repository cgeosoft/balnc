import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { SwiperModule, SWIPER_CONFIG, SwiperConfigInterface } from 'ngx-swiper-wrapper'
import { ChartModule } from 'angular2-chartjs';

import { CommonModule } from '@balnc/common'

import { PresentationsService } from './services/presentations.service'
import { PresentationComponent } from './components/presentation/presentation.component'
import { CreatePresentationComponent } from './components/create-presentation/create-presentation.component'
import { AddPageComponent } from './components/add-page/add-page.component'
import { OverviewComponent } from './components/overview/overview.component'

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto',
  effect: 'coverflow'
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    SwiperModule,
    ChartModule 
  ],
  declarations: [
    OverviewComponent,
    PresentationComponent,
    CreatePresentationComponent,
    AddPageComponent
  ],
  providers: [
    PresentationsService,
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }
  ],
  entryComponents: [
    CreatePresentationComponent,
    AddPageComponent
  ]
})
export class PresentationsModule { }
