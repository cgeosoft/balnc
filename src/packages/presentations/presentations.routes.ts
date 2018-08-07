import { OverviewComponent } from './components/overview/overview.component'
import { PresentationComponent } from './components/presentation/presentation.component'
import { WrapperComponent } from './components/_wrapper/wrapper.component'

export const PresentationsRoutes = [{
  path: 'presentations',
  component: WrapperComponent,
  children: [
    // { path: 'overview', component: OverviewComponent },
    { path: ':id', component: PresentationComponent }
    // { path: '', pathMatch: 'full', redirectTo: 'overview' }
  ]
}]
