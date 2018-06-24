import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { CommonModule } from '@balnc/common'

import { WelcomeComponent } from './welcome.component'
import { WelcomeGuard } from './welcome.guard'

const routes: Routes = [{
  path: 'welcome',
  component: WelcomeComponent
}]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    WelcomeComponent
  ],
  providers: [
    WelcomeGuard,
  ],
  exports: []
})
export class WelcomeModule { }
