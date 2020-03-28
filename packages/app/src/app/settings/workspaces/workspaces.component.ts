import { Component } from '@angular/core'
import { ConfigService, RxDBService } from '@balnc/core'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import * as faker from 'faker'
import { ReadFile } from 'ngx-file-helpers'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-settings-workspaces',
  templateUrl: './workspaces.component.html'
})
export class WorkspacesComponent {

  get workspaces () {
    return this.configService.workspaces
  }

  get activated () {
    return this.configService.activated
  }

  constructor (
    private configService: ConfigService,
    private modal: NgbModal,
    private toastr: ToastrService,
    private rxdbService: RxDBService
  ) { }

  async create () {
    const key = this.configService.save({
      name: faker.hacker.noun()
    })
    this.configService.activate(key)
  }

  async import (file: ReadFile) {
    const workspace = this.configService.import(file)
    if (!workspace) {
      this.toastr.error('Import failed')
      return
    }
    const key = this.configService.save(workspace)
    this.configService.activate(key)
    this.configService.setup()
    await this.rxdbService.setup()
  }

  async activate (workspace) {
    this.configService.activate(workspace.key)
    this.configService.setup()
    await this.rxdbService.setup()
  }
}
