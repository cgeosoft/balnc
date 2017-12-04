import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Routes } from '@angular/router'

import { ChatComponent } from './components'

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
    // ChatDB
  ]
})
export class ChatModule { }
