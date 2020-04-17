import { Component } from '@angular/core'
import { ConfigService, DEFAULT_USER, UsersRepo } from '@balnc/core'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html'
})
export class UserFormComponent {

  get users () {
    return this.configService.users
  }

  get activeModal () {
    return this.modal
  }

  constructor (
    private modal: NgbActiveModal,
    private configService: ConfigService,
    private usersRepo: UsersRepo
  ) { }

  select (username) {
    this.configService.username = username
    this.activeModal.close()
  }

  async create (username) {
    if (this.users.find(x => x.username === username)) {
      this.select(username)
      return
    }
    const owner = !!this.configService.users?.length
    await this.usersRepo.add({ ...DEFAULT_USER, ...{ username, owner } })
    this.select(username)
  }

}
