import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router';

import { WelcomeComponent } from '@blnc/core/welcome/welcome.component';
import { WelcomeGuard } from '@blnc/core/welcome/welcome.guard';
import { CommonModule } from '@angular/common';

const routes: Routes = [{
  path: 'welcome',
  component: WelcomeComponent
}]

@NgModule({
  declarations: [
    WelcomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  providers: [WelcomeGuard],
  entryComponents: []
})
export class WelcomeModule { }
