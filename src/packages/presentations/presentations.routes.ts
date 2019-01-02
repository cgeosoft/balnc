import { PresentationComponent } from './components/presentation/presentation.component'
import { WrapperComponent } from './components/_wrapper/wrapper.component'
import { PresentationsService } from './presentations.service'
import { OverviewComponent } from './components/overview/overview.component'

export const PresentationsRoutes = [{
  path: '',
  component: WrapperComponent,
  resolve: {
    srv: PresentationsService
  },
  children: [
    { path: 'overview', component: OverviewComponent },
    { path: 'presentation/:id', component: PresentationComponent }
  ]
}]
