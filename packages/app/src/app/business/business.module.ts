import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { SharedModule } from '@balnc/shared'
import { BUSINESS_ROUTES } from './@shared/constants/routes'
import { ShellComponent } from './@shell/shell.component'
import { QuickSearchComponent } from './quick-search/quick-search.component'
import { SearchComponent } from './search/search.component'
import { SettingsComponent } from './settings/settings.component'

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(BUSINESS_ROUTES)
  ],
  declarations: [
    ShellComponent,
    SettingsComponent,
    QuickSearchComponent,
    SearchComponent
  ],
  entryComponents: [
    QuickSearchComponent
  ]
})
export class BusinessModule { }
