import { Component } from '@angular/core'
import { ConfigService } from '@balnc/core'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html'
})
export class CreateProfileComponent {

  name: string

  get m () {
    return this.activeModal
  }

  constructor (
    public activeModal: NgbActiveModal,
    private configService: ConfigService
  ) { }

  save () {
    this.configService.save({
      key: null,
      data: {
        persist: true
      },
      name: this.name,
      remote: {
        enabled: false
      },
      plugins: {

      }
    })
    this.activeModal.close()
  }
}
