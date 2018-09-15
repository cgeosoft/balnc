import { WrapperComponent } from './components/_wrapper/wrapper.component'
import { GeneralComponent } from './components/general/general.component'
import { ManageComponent } from './components/manage/manage.component'
import { PackageComponent } from './components/package/package.component'

export const SettingsRoutes = [{
  path: 'settings',
  component: WrapperComponent,
  children: [
    { path: 'general', component: GeneralComponent },
    { path: 'manage', component: ManageComponent },
    { path: 'package/:id', component: PackageComponent },
    {
      path: '',
      pathMatch: 'full',
      redirectTo: '/settings/general'
    }
  ]
}]
