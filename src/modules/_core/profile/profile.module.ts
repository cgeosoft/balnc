import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { CommonModule } from '@blnc/core/common/common.module'

import { DefaultProfileGuard } from '@blnc/core/profile/guards/profile.guard'
import { ProfileService } from '@blnc/core/profile/services/profile.service'

import { ManageComponent } from '@blnc/core/profile/components/manage/manage.component'
import { LandingComponent } from '@blnc/core/profile/components/landing/landing.component'
import { CreateProfileComponent } from '@blnc/core/profile/components/create/create.component'

const routes: Routes = [{
  path: 'start',
  component: LandingComponent,
}, {
  path: 'manage',
  component: ManageComponent,
}]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    ManageComponent,
    LandingComponent,
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
