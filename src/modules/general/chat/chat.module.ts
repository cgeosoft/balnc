import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Routes } from '@angular/router'

import { DatabaseModule } from '../../_core/modules/database/database.module'
import { ChatComponent } from './components'
import { Entity } from '../../_core/modules/database/models/entity';

const entities: Entity[] = [{
  name: 'message',
  schema: require('./data/message.json'),
  sync: true,
}]

const routes: Routes = [
  { path: '', component: ChatComponent },
]

@NgModule({
  imports: [
    CommonModule,
    DatabaseModule.forChild(entities),
    RouterModule.forChild(routes)
  ],
  declarations: [
    ChatComponent
  ],
  providers: []
})
export class ChatModule { }
