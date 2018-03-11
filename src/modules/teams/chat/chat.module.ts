import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { RouterModule, Routes } from '@angular/router'

import { DatabaseModule } from '@blnc/core/database/database.module'
import { Entity } from '@blnc/core/database/models/entity';

import { ChatComponent } from './components'
import { ChatMessageSchema } from './data/message';

const entities: Entity[] = [{
  name: 'message',
  schema: ChatMessageSchema,
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
