import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { CommonModule } from '@balnc/common/common.module';

import { ChatComponent, ChannelFilterPipe } from '@balnc/team/chat/components'
import { ChatMessageSchema } from '@balnc/team/chat/data/message'
import { ChatService } from '@balnc/team/chat/services/chat.service'
import { ChatRoutes } from '@balnc/team/chat/routes/chat.routes'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ChatRoutes),
  ],
  declarations: [
    ChatComponent,
    ChannelFilterPipe,
  ],
  providers: [
    ChatService,
  ]
})
export class ChatModule { }
