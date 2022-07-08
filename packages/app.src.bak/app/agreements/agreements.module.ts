import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { SharedModule } from '@balnc/shared'
import { NgxPrintModule } from 'ngx-print'
import { ShellComponent } from './@shell/shell.component'
import { AgreementComponent } from './agreement/agreement.component'
import { AgreementsComponent } from './agreements/agreements.component'
import { CreateComponent } from './create/create.component'

@NgModule({
  declarations: [
    ShellComponent,
    AgreementsComponent,
    AgreementComponent,
    CreateComponent
  ],
  entryComponents: [
    CreateComponent
  ],
  imports: [
    SharedModule,
    NgxPrintModule,
    RouterModule.forChild([{
      path: '',
      component: ShellComponent,
      children: [{
        path: 'overview',
        data: {
          title: 'Overview'
        },
        component: AgreementsComponent
      }, {
        path: ':id',
        data: {
          title: 'Agreement'
        },
        component: AgreementComponent
      }, {
        path: '', pathMatch: 'full', redirectTo: 'overview'
      }]
    }])
  ]
})
export class AgreementsModule { }
