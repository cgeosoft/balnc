import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { SharedModule } from './../@shared/shared.module'
import { ShellComponent } from './@shell/shell.component'
import { AboutComponent } from './about/about.component'
import { FaqComponent } from './faq/faq.component'
import { LiveComponent } from './live/live.component'

@NgModule({
  declarations: [
    ShellComponent,
    LiveComponent,
    FaqComponent,
    AboutComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([{
      path: '',
      component: ShellComponent,
      data: {
        breadcrumb: {
          label: 'Support'
        }
      },
      children: [
        {
          path: 'faq',
          data: {
            breadcrumb: {
              label: 'FAQ'
            }
          },
          component: FaqComponent
        },
        {
          path: 'live',
          data: {
            breadcrumb: {
              label: 'Live Chat'
            }
          },
          component: LiveComponent
        },
        {
          path: 'about',
          data: {
            breadcrumb: {
              label: 'About '
            }
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
  ]
})
export class SupportModule { }
