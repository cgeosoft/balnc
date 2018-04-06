import { NgModule } from '@angular/core'

import { CommonModule } from '@blnc/core/common/common.module'

import { DefaultProfileGuard } from '@blnc/core/profile/guards/profile.guard'
import { ProfileService } from '@blnc/core/profile/services/profile.service'

import { ManageComponent } from '@blnc/core/profile/components/manage/manage.component'
import { CreateProfileComponent } from '@blnc/core/profile/components/create/create.component'


@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    ManageComponent,
    CreateProfileComponent,
  ],
  providers: [
    ProfileService,
    DefaultProfileGuard
  ],
  entryComponents: [
    CreateProfileComponent
  ]
})
export class ProfileModule { }
