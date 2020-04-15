import { Component } from '@angular/core'
import { ConfigService, RxDBService } from '@balnc/core'
import { DEFAULT_USER } from '@balnc/shared'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent {

  get users () {
    return this.configService.users
  }

  get activeModal () {
    return this.modal
  }

  constructor (
    private modal: NgbActiveModal,
    private configService: ConfigService,
    private dbService: RxDBService
  ) { }

  async selectExisting (username) {
    this.configService.username = username
    this.activeModal.close()
  }

  async createNew (username, email) {
    const owner = !!this.configService.users?.length
    await this.dbService.upsetUser({ ...DEFAULT_USER, ...{ username, email, owner } })
    this.configService.username = username
    this.activeModal.close()
  }

}
