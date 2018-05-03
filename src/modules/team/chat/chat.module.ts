import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { ChatComponent } from '@blnc/team/chat/components'
import { ChatMessageSchema } from '@blnc/team/chat/data/message'
import { ChatService } from '@blnc/team/chat/services/chat.service'
import { ChatRoutes } from '@blnc/team/chat/routes/chat.routes'

@NgModule({
  declarations: [
    ChatComponent,
  ],
  imports: [
    RouterModule.forChild(ChatRoutes)
  ],
  providers: [
    ChatService,
  ]
})
export class ChatModule { }
