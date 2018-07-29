import { Routes } from '@angular/router'

import { OverviewComponent } from './components/overview/overview.component'
import { PresentationComponent } from './components/presentation/presentation.component'

export const PresentationsRoutes: Routes = [{
  path: 'presentations',
  children: [
    { path: 'overview', component: OverviewComponent },
    { path: ':id', component: PresentationComponent },
    { path: '', pathMatch: 'full', redirectTo: 'overview' }
  ]
}]
