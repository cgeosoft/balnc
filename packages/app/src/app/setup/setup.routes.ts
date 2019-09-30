import { SetupComponent } from './setup.component'
import { SetupGuard } from './setup.guard'

export const SetupRoutes = [{
  path: '',
  component: SetupComponent,
  canActivate: [SetupGuard]
}]
