import { Component } from '@angular/core'
import { ConfigService, RxDBService } from '@balnc/core'
import { DEFAULT_WORKSPACE } from '@balnc/shared'
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
    private toastr: ToastrService,
    private dbService: RxDBService
  ) { }

  async create () {
    const key = this.configService.save({ ...DEFAULT_WORKSPACE })
    this.configService.activated = key
    await this.activate({ key })
  }

  async import (file: ReadFile) {
    const workspace = this.configService.import(file)
    if (!workspace) {
      this.toastr.error('Import failed')
      return
    }
    const key = this.configService.save(workspace)
    workspace.key = key
    await this.activate(workspace)
  }

  async activate (workspace) {
    this.configService.activated = workspace.key
    this.configService.setup()
    await this.dbService.setup()
    window.location.reload()
  }
}
