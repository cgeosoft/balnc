import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { ActivatedRouteSnapshot, RouterModule, RouterStateSnapshot, Routes } from '@angular/router'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

import { DatabaseModule } from '../../_core/modules/database/database.module'
import { EllipsisPipe } from '../../../pipes/ellipsis.pipe'

import { ItemComponent, OverviewComponent, CreateComponent, UploadComponent, AddPageComponent } from './components'
import { Entity } from '../../_core/modules/database/models/entity'
import { FileUploadModule } from 'ng2-file-upload';
import { PresentationSchema } from './data/presentation';

const entities: Entity[] = [{
  name: 'presentation',
  schema: PresentationSchema,
  sync: true,
}]

const routes: Routes = [{
  path: '',
  children: [
    { path: 'overview', component: OverviewComponent },
    { path: 'item/:id', component: ItemComponent },
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

    EllipsisPipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    FileUploadModule,
    DatabaseModule.forChild(entities),
    RouterModule.forChild(routes),
    NgbModule,
  ],
  providers: [],
  entryComponents: [
    CreateComponent,
    UploadComponent,
    AddPageComponent,
  ]
})
export class PresentationsModule { }
