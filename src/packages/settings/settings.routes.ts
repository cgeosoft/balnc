import { WrapperComponent } from './components/_wrapper/wrapper.component'
import { GeneralComponent } from './components/general/general.component'
import { ManageComponent } from './components/manage/manage.component'
import { PackageComponent } from './components/package/package.component'
import { DataComponent } from './components/data/data.component'

export const SettingsRoutes = [{
  path: '',
  component: WrapperComponent,
  children: [
    { path: 'general', component: GeneralComponent },
    { path: 'manage', component: ManageComponent },
    { path: 'data', component: DataComponent },
    { path: 'packages/:id', component: PackageComponent },
    {
      path: '',
      pathMatch: 'full',
      redirectTo: '/settings/general'
    }
  ]
}]
