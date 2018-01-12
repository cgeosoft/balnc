import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { DatabaseModule } from '../../_core/database/database.module'
import { Entity } from '../../_core/database/models/entity';

import { ContactItemComponent, ContactsOverviewComponent } from './components'

import { ContactSchema } from './data/contact';

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
