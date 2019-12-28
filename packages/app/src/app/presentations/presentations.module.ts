import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { SharedModule } from '@balnc/shared'
import { SwiperModule, SWIPER_CONFIG } from 'ngx-swiper-wrapper'
import { SlidesRepo } from './@shared/repos/pages.repo'
import { PresentationsRepo } from './@shared/repos/presentations.repo'
import { PresentationsService } from './@shared/services/presentations.service'
import { ShellComponent } from './@shell/shell.component'
import { AddPageComponent } from './add-page/add-page.component'
import { CreateComponent } from './create/create.component'
import { OverviewComponent } from './overview/overview.component'
import { PresentationComponent } from './presentation/presentation.component'
import { SettingsComponent } from './settings/settings.component'

@NgModule({
  imports: [
    SharedModule,
    SwiperModule,
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
    SlidesRepo,
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
