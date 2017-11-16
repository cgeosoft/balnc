import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { ChatComponent } from './components'
import { ChatDB } from './services/chat-db.service'

const appRoutes: Routes = [
  { path: '', component: ChatComponent },
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(appRoutes)
  ],
  declarations: [
    ChatComponent
  ],
  providers: [
    ChatDB
  ]
})
export class ChatModule { }
