import { Component } from '@angular/core'
import { ConfigService, RxDBService } from '@balnc/core'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { ReadFile } from 'ngx-file-helpers'
import { ToastrService } from 'ngx-toastr'
import { CreateProfileComponent } from './create-profile/create-profile.component'

@Component({
  selector: 'app-settings-profiles',
  templateUrl: './profiles.component.html'
})
export class ProfilesComponent {

  get profiles () {
    return this.configService.profiles
  }

  constructor (
    private configService: ConfigService,
    private modal: NgbModal,
    private toastr: ToastrService,
    private rxdbService: RxDBService
  ) { }

  async create () {
    this.modal.open(CreateProfileComponent)
  }

  async import (file: ReadFile) {
    const profile = this.configService.import(file)
    if (!profile) {
      this.toastr.error('Import failed')
      return
    }
    const key = this.configService.save(profile)
    this.configService.select(key)
    this.configService.setup()
    await this.rxdbService.setup()
  }

  async activate (profile) {
    this.configService.select(profile.key)
    this.configService.setup()
    await this.rxdbService.setup()
  }
}
