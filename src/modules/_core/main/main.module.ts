import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router';

import { CommonModule } from "@blnc/core/common/common.module"
import { AccountsModule } from '@blnc/core/accounts/accounts.module'
import { MainComponent } from '@blnc/core/main/main.component';
import { PageNotFoundComponent } from '@blnc/core/common/components/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  providers: [
  ],
  entryComponents: [
  ]
})
export class MainModule { }
