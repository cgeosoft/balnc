import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { SharedModule } from '@balnc/shared'
import { ChartModule } from 'angular2-chartjs'
import { SwiperModule, SWIPER_CONFIG } from 'ngx-swiper-wrapper'
import { AddPageComponent } from './add-page/add-page.component'
import { CreateComponent } from './create/create.component'
import { OverviewComponent } from './overview/overview.component'
import { PresentationComponent } from './presentation/presentation.component'
import { SettingsComponent } from './settings/settings.component'
import { PagesRepo } from './_shared/repos/pages.repo'
import { PresentationsRepo } from './_shared/repos/presentations.repo'
import { PresentationsService } from './_shared/services/presentations.service'
import { ShellComponent } from './_shell/shell.component'

@NgModule({
  imports: [
    SharedModule,
    SwiperModule,
    ChartModule,
    RouterModule.forChild([{
      path: '',
      component: ShellComponent,
      children: [
        { path: 'overview', component: OverviewComponent },
        { path: 'settings', component: SettingsComponent },
        { path: ':id', component: PresentationComponent },
        { path: '', pathMatch: 'full', redirectTo: 'overview' }
      ]
    }])
  ],
  declarations: [
    ShellComponent,
    OverviewComponent,
    PresentationComponent,
    CreateComponent,
    SettingsComponent,
    AddPageComponent
  ],
  providers: [
    PresentationsRepo,
    PagesRepo,
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
