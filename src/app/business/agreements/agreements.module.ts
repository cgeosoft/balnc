import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@balnc/shared';
import { NgxPrintModule } from 'ngx-print';
import { AgreementComponent } from './agreement/agreement.component';
import { AgreementsComponent } from './agreements/agreements.component';
import { CreateComponent } from './create/create.component';

@NgModule({
  declarations: [
    AgreementsComponent,
    AgreementComponent,
    CreateComponent,
  ],
  entryComponents:[
    CreateComponent,
  ],
  imports: [
    SharedModule,
    NgxPrintModule,
    RouterModule.forChild([
      { path: '', component: AgreementsComponent },
      { path: ':id', component: AgreementComponent }
    ])
  ]
})
export class AgreementsModule { }
