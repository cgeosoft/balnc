import { Component, OnInit } from '@angular/core'
import { ConfigService, DEFAULT_USER, User, UsersRepo } from '@balnc/core'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html'
})
export class UserFormComponent implements OnInit {

  users$: Observable<User[]>

  get activeModal () {
    return this.modal
  }

  constructor (
    private modal: NgbActiveModal,
    private configService: ConfigService,
    private usersRepo: UsersRepo
  ) { }

  ngOnInit () {
    this.users$ = this.usersRepo.allm$()
  }

  select (userId) {
    this.configService.userId = userId
    this.activeModal.close()
  }

  async create (username) {
    await this.usersRepo.add({ ...DEFAULT_USER, ...{ username } })
    this.select(username)
  }

}
