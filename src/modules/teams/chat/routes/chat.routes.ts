import { Routes } from "@angular/router";
import { ChatService } from "@blnc/teams/chat/services/chat.service";
import { ChatComponent } from "@blnc/teams/chat/components/chat/chat.component";

const routes: Routes = [{
  path: '',
  component: ChatComponent,
  resolve: {
    db: ChatService,
  },
}]

export const ChatRoutes = routes
