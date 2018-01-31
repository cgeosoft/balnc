import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { ActivatedRouteSnapshot, RouterModule, RouterStateSnapshot, Routes } from '@angular/router'

import { CommonModule } from '../../_core/common/common.module';
import { DatabaseModule } from '../../_core/database/database.module'

import { ItemComponent, OverviewComponent, CreateComponent, UploadComponent, AddPageComponent } from './components'
import { Entity } from '../../_core/database/models/entity'
import { FileUploadModule } from 'ng2-file-upload';
import { PresentationSchema } from './data/presentation';

const entities: Entity[] = [{
  name: 'presentation',
  schema: PresentationSchema,
  sync: false,
}]

const routes: Routes = [{
  path: '',
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
    DatabaseModule.forChild(entities),
    RouterModule.forChild(routes),
  ],
  providers: [],
  entryComponents: [
    CreateComponent,
    UploadComponent,
    AddPageComponent,
  ]
})
export class PresentationsModule { }
