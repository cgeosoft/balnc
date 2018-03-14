import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { DatabaseModule } from '@blnc/core/database/database.module'
import { Entity } from '@blnc/core/database/models/entity';

import { ContactItemComponent, ContactsOverviewComponent } from './components'

import { ContactSchema } from './data/contact';
import { CommonModule } from '@blnc/core/common/common.module';

const entities: Entity[] = [{
  name: 'contact',
  schema: ContactSchema,
  sync: true,
}]

const routes: Routes = [
  { path: 'overview', component: ContactsOverviewComponent },
  { path: 'contact/:id', component: ContactItemComponent },
  { path: '', redirectTo: "overview" },
]

@NgModule({
  imports: [
    CommonModule,
    DatabaseModule.forChild(entities),
    RouterModule.forChild(routes),
  ],
  declarations: [
    ContactsOverviewComponent,
    ContactItemComponent,
  ],
  providers: []
})
export class ContactsModule { }
