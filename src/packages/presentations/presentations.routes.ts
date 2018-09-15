import { PresentationComponent } from './components/presentation/presentation.component'
import { WrapperComponent } from './components/_wrapper/wrapper.component'

export const PresentationsRoutes = [{
  path: 'presentations',
  component: WrapperComponent,
  children: [
    { path: ':id', component: PresentationComponent }
  ]
}]
