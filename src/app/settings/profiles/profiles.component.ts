import { Component } from '@angular/core';
import { ConfigService, RxDBService } from '@balnc/core';
import { ConfirmDialogComponent, Helpers } from '@balnc/shared';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReadFile } from 'ngx-file-helpers';
import { ToastrService } from 'ngx-toastr';
import { ContactsEntities, InvoicesEntities, OrdersEntities } from 'src/app/business/_shared/models/_entities';

@Component({
  selector: 'app-settings-profiles',
  templateUrl: './profiles.component.html'
})
export class ProfilesComponent {

  constructor (
    private configService: ConfigService,
    private dbService: RxDBService,
    private toastr: ToastrService,
    private modal: NgbModal
  ) { }

  get profiles () {
    return this.configService.profiles
  }
  get selected () {
    return this.configService.selected
  }

  activate (profileId) {
    this.configService.selectProfile(profileId)
  }

  create () {
    const alias = this.configService.saveProfile({
      name: Helpers.generateName()
    })
    this.configService.selectProfile(alias)
  }

  async remove (profileId) {
    const entities = [
      ...ContactsEntities,
      ...OrdersEntities,
      ...InvoicesEntities
    ]

    await this.modal.open(ConfirmDialogComponent,{ size: "sm" })
      .result
      .then(async () => {
        this.configService.removeProfile(profileId)
        await this.dbService.removeProfile(profileId, entities)
      })
      .catch(() => {
        console.log('dismised')
      })
  }

  async import (file: ReadFile) {
    const profile = this.configService.importFile(file)
    if (!profile) {
      this.toastr.error('Import failed')
      return
    }
    const alias = this.configService.saveProfile(profile)
    this.configService.selectProfile(alias)
  }
}
