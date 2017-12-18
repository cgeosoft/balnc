import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { RouterModule, Routes } from '@angular/router'

import { DatabaseModule } from '../../_core/modules/database/database.module'
import { ChatComponent } from './components'
import { Entity } from '../../_core/modules/database/models/entity';

import * as c from './../../../../schemas/_core/org.json'

const entities: Entity[] = [{
  name: 'message',
  schemaPath: 'schemas/general/chat/message.json',
  sync: true,
}]

const routes: Routes = [
  { path: '', component: ChatComponent },
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    DatabaseModule.forChild(entities),
    RouterModule.forChild(routes)
  ],
  declarations: [
    ChatComponent
  ],
  providers: []
})
export class ChatModule { }
