import { ShellComponent } from '../../@shell/shell.component'
import { BoardComponent } from '../../board/board.component'
import { FilesComponent } from '../../board/files/files.component'
import { ManageComponent } from '../../board/manage/manage.component'
import { TimelineComponent } from '../../board/timeline/timeline.component'
import { SettingsComponent } from '../../settings/settings.component'

export const BOARDS_ROUTES = [{
  path: '',
  component: ShellComponent,
  children: [
    // {
    //   path: 'manage',
    //   component: BoardsComponent
    // },
    {
      path: 'settings',
      component: SettingsComponent
    },
    {
      path: ':id',
      component: BoardComponent,
      children: [{
        path: 'timeline',
        component: TimelineComponent
      }, {
        path: 'manage',
        component: ManageComponent
      }, {
        path: 'files',
        component: FilesComponent
      },
      { path: '', redirectTo: 'timeline', pathMatch: 'full' }]
    },
    // { path: '', redirectTo: 'manage', pathMatch: 'full' }
  ]
}]
