import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { RouterModule, Routes } from '@angular/router'

import { ChatComponent } from './components'
import { ChatMessageSchema } from './data/message'
import { CommonModule } from '@blnc/core/common/common.module'
import { ChatService } from '@blnc/teams/chat/services/chat.service'
import { ChatRoutes } from '@blnc/teams/chat/routes/chat.routes'

@NgModule({
  declarations: [
    ChatComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    RouterModule.forChild(ChatRoutes)
  ],
  providers: [
    ChatService,
  ]
})
export class ChatModule { }
