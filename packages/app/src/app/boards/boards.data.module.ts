import { NgModule } from '@angular/core'
import { BoardsRepo } from './@shared/repos/boards.repo'
import { MessagesRepo } from './@shared/repos/messages.repo'
import { BoardsDemoService } from './@shared/services/demo.service'

@NgModule({
  providers: [
    BoardsDemoService,

    BoardsRepo,
    MessagesRepo
  ]
})
export class BoardsDataModule {
}
