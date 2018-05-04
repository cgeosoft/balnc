import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@blnc/common/common.module';
import { WelcomeComponent } from '@blnc/core/welcome/welcome.component';
import { WelcomeGuard } from '@blnc/core/welcome/welcome.guard';

const routes: Routes = [{
  path: 'welcome',
  component: WelcomeComponent
}]

@NgModule({
  imports: [
    // CommonModule,
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
