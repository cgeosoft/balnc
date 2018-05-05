import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { CommonModule } from '@balnc/common/common.module'
import { PresentationsModule } from '@balnc/marketing/presentations/presentations.module'

@NgModule({
  imports: [
    CommonModule,
    PresentationsModule,
  ],
  declarations: [],
  providers: [],
})
export class MarketingModule { }
