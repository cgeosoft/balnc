import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { ActivatedRouteSnapshot, RouterModule, RouterStateSnapshot, Routes } from '@angular/router'

import { CommonModule } from '@blnc/core/common/common.module';
import { DatabaseModule } from '@blnc/core/database/database.module'

import { ItemComponent, OverviewComponent, CreateComponent, UploadComponent, AddPageComponent } from './components'
import { Entity } from '@blnc/core/database/models/entity'
import { FileUploadModule } from 'ng2-file-upload';
import { PresentationsService } from '@blnc/marketing/presentations/services/presentations.service';

const routes: Routes = [{
  path: '',
  resolve: {
    service: PresentationsService
  },
  children: [
    { path: 'overview', component: OverviewComponent },
    { path: ':id', component: ItemComponent },
    { path: '', redirectTo: "overview" },
  ]
}]

@NgModule({
  declarations: [
    OverviewComponent,
    ItemComponent,
    CreateComponent,
    UploadComponent,
    AddPageComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    FileUploadModule,
    RouterModule.forChild(routes),
  ],
  providers: [
    PresentationsService
  ],
  entryComponents: [
    CreateComponent,
    UploadComponent,
    AddPageComponent,
  ]
})
export class PresentationsModule { }
