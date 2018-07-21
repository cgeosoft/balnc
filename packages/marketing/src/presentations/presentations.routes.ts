import { Routes } from '@angular/router';

import { OverviewComponent } from './components/overview/overview.component'
import { ItemComponent } from './components/item/item.component'

import { PresentationsService } from './services/presentations.service'

export const PresentationsRoutes: Routes = [{
  path: 'presentations',
  resolve: {
    service: PresentationsService
  },
  children: [
    { path: 'overview', component: OverviewComponent },
    { path: ':id', component: ItemComponent },
    { path: '', pathMatch: "full", redirectTo: "overview" },
  ]
}]