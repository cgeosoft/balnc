import { Component, OnInit } from '@angular/core';
import { ConfigService, DEFAULT_USER, User, UsersRepo } from '@balnc/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html'
})
export class UserFormComponent implements OnInit {

  users$: Observable<User[]>

  get activeModal() {
    return this.modal
  }

  constructor(
    private modal: NgbActiveModal,
    private configService: ConfigService,
    private usersRepo: UsersRepo,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.users$ = this.usersRepo.allm$()
  }

  select(userId) {
    this.configService.userId = userId
    this.activeModal.close()
    this.toastr.success(`User ${this.configService.user.username} selected`)
  }

  async create(username) {
    const user = await this.usersRepo.add({ ...DEFAULT_USER, ...{ username } })
    this.select(user._id)
  }

}
