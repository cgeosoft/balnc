import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { ChatComponent } from '@balnc/team/chat/components'
import { ChatMessageSchema } from '@balnc/team/chat/data/message'
import { ChatService } from '@balnc/team/chat/services/chat.service'
import { ChatRoutes } from '@balnc/team/chat/routes/chat.routes'

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
