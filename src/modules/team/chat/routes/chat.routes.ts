import { Routes } from "@angular/router";
import { ChatService } from "@blnc/team/chat/services/chat.service";
import { ChatComponent } from "@blnc/team/chat/components/chat/chat.component";

const routes: Routes = [{
  path: 'chat',
  component: ChatComponent,
  resolve: {
    db: ChatService,
  },
}]

export const ChatRoutes = routes
