import { Component, OnInit } from '@angular/core'
import { ConfigService, RxDBService } from '@balnc/core'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { CreateProfileComponent } from './create-profile/create-profile.component'

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html'
})
export class ProfilesComponent implements OnInit {

  get profiles () {
    return this.configService.profiles
  }

  constructor (
    private configService: ConfigService,
    private modal: NgbModal,
    private rxdbService: RxDBService
  ) { }

  ngOnInit (): void {
  }

  async create () {
    this.modal.open(CreateProfileComponent)
  }

  async activate (profile) {
    this.configService.select(profile.key)
    this.configService.setup()
    await this.rxdbService.setup()
  }
}
