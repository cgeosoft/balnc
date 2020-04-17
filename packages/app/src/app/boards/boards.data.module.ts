import { NgModule } from '@angular/core'
import { BoardsRepo } from './@shared/repos/boards.repo'
import { BUsersRepo } from './@shared/repos/buser.repo'
import { MessagesRepo } from './@shared/repos/messages.repo'

@NgModule({
  providers: [
    BoardsRepo,
    MessagesRepo,
    BUsersRepo
  ]
})
export class BoardsDataModule {
}
