import { NgModule } from '@angular/core'
import { BoardsRepo } from './@shared/repos/boards.repo'
import { MessagesRepo } from './@shared/repos/messages.repo'

@NgModule({
  providers: [
    BoardsRepo,
    MessagesRepo
  ]
})
export class BoardsDataModule {
}
