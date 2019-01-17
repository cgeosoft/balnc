import { WrapperComponent } from './components/_wrapper/wrapper.component'
import { GeneralComponent } from './components/general/general.component'
import { ManageComponent } from './components/manage/manage.component'
import { BModuleComponent } from './components/bmodule/bmodule.component'
import { DataComponent } from './components/data/data.component'

export const SettingsRoutes = [{
  path: '',
  component: WrapperComponent,
  children: [
    { path: 'general', component: GeneralComponent },
    { path: 'manage', component: ManageComponent },
    { path: 'data', component: DataComponent },
    { path: 'bmodules/:id', component: BModuleComponent },
    {
      path: '',
      pathMatch: 'full',
      redirectTo: '/settings/general'
    }
  ]
}]
