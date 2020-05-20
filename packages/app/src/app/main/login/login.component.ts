import { Component } from '@angular/core'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  get activeModal () {
    return this.modal
  }

  constructor (
    private modal: NgbActiveModal
  ) { }

  submit (username, password) {
    this.activeModal.close({ username, password })
  }

}
