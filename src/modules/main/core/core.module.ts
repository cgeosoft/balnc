import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { CORE_ROUTES } from './core.routes'
import { MainComponent } from './components/main/main.component'
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(CORE_ROUTES)
  ],
  declarations: [
    MainComponent,
    PageNotFoundComponent,
  ]
})
export class CoreModule { }
