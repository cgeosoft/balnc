import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router';

import { WelcomeComponent } from '@blnc/core/welcome/welcome.component';
import { WelcomeGuard } from '@blnc/core/welcome/welcome.guard';

const routes: Routes = [{
  path: 'welcome',
  component: WelcomeComponent
}]

@NgModule({
  declarations: [
    WelcomeComponent
  ],
  imports: [
    RouterModule.forChild(routes),
  ],
  providers: [WelcomeGuard],
  entryComponents: []
})
export class WelcomeModule { }
