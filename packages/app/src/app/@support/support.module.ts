import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { SharedModule } from './../@shared/shared.module'
import { ShellComponent } from './@shell/shell.component'
import { AboutComponent } from './about/about.component'
import { FaqComponent } from './faq/faq.component'
import { LiveComponent } from './live/live.component'

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{
      path: '',
      component: ShellComponent,
      data: {
        title: 'Support'
      },
      children: [
        {
          path: 'faq',
          data: {
            title: 'FAQ'
          },
          component: FaqComponent
        },
        {
          path: 'live',
          data: {
            title: 'Live Chat'
          },
          component: LiveComponent
        },
        {
          path: 'about',
          data: {
            title: 'About '
          },
          component: AboutComponent
        },
        {
          path: '',
          pathMatch: 'full',
          redirectTo: '/support/faq'
        }
      ]
    }])
  ],
  declarations: [
    ShellComponent,
    LiveComponent,
    FaqComponent,
    AboutComponent
  ]
})
export class SupportModule { }
