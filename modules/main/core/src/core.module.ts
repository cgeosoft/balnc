import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MainComponent } from './components/main/main.component';
import { CORE_ROUTES } from './core.routes';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(CORE_ROUTES)
  ],
  declarations: [
    MainComponent,
  ]
})
export class CoreModule { }
