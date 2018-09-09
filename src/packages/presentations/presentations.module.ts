import { NgModule, APP_INITIALIZER } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { SwiperModule, SWIPER_CONFIG } from 'ngx-swiper-wrapper'
import { ChartModule } from 'angular2-chartjs'

import { CommonModule, PouchDBService } from '@balnc/common'

import { PresentationsService } from './presentations.service'
import { PresentationComponent } from './components/presentation/presentation.component'
import { CreateComponent } from './components/create/create.component'
import { AddPageComponent } from './components/add-page/add-page.component'
import { OverviewComponent } from './components/overview/overview.component'
import { WrapperComponent } from './components/_wrapper/wrapper.component'
import { PresentationsEntities } from './models/_entities';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
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
    },
    PouchDBService,
    {
      provide: APP_INITIALIZER,
      deps: [PouchDBService],
      multi: true,
      useFactory: (db: PouchDBService) => async () => {
        await db.setup('presentations', [
          ...PresentationsEntities
        ]).catch(err => {
          sessionStorage.setItem('ngx_error', err.stack)
          if (window.location.href.indexOf('/error') === -1) {
            window.location.href = '/error'
          }
        })
      }
    }
  ],
  entryComponents: [
    CreateComponent,
    AddPageComponent
  ]
})
export class PresentationsModule { }
