import { Component, OnInit } from '@angular/core'
import { ConfigService, RxDBService } from '@balnc/core'
import { ConfirmDialogComponent, Helpers, MenuItem, Workspace } from '@balnc/shared'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { ReadFile } from 'ngx-file-helpers'
import environment from 'src/environments/environment'

@Component({
  selector: 'app-settings-shell',
  templateUrl: './shell.component.html'
})
export class ShellComponent implements OnInit {

  error: string
  workspace: Workspace

  helperService = Helpers

  menu: MenuItem[] = [{
    url: '/settings/general',
    icon: 'cog',
    type: 'button',
    label: 'General'
  }, {
    url: '/settings/modules',
    icon: 'boxes',
    type: 'button',
    label: 'Modules'
  }, {
    type: 'divider'
  }, {
    url: '/settings/remote',
    icon: 'server',
    type: 'button',
    label: 'Remote'
  }, {
    url: '/settings/demo-data',
    icon: 'exchange-alt',
    type: 'button',
    label: 'Demo Data'
  }]

  extra: MenuItem[] = [{
    url: '/settings/workspaces',
    icon: 'swatchbook',
    type: 'button',
    label: 'Workspaces'
  }, {
    url: '/settings/developer',
    icon: 'code',
    type: 'button',
    label: 'Developer'
  }]

  get workspaces() {
    return this.configService.workspaces
  }

  get activated() {
    return this.configService.activated
  }

  get plugins() {
    return environment.modules
  }

  constructor(
    public configService: ConfigService,
    private modal: NgbModal,
    private dbService: RxDBService
  ) { }

  ngOnInit() {
    this.workspace = this.configService.workspace
  }

  clear() {
    this.configService.clearAll()
  }

  async remove(workspaceId) {
    await this.modal.open(ConfirmDialogComponent, { size: 'sm' })
      .result
      .then(async () => {
        this.configService.remove(workspaceId)
        await this.dbService.remove(workspaceId)
      })
      .catch(() => {
        console.log('dismised')
      })
  }

  onFilePicked(file: ReadFile) {
    this.error = null
    try {
      const data = file.content.split(',')[1]
      const workspaceStr = atob(data)
      const workspace = JSON.parse(workspaceStr)
      const key = this.configService.save(workspace)
      this.configService.activate(key)
    } catch (error) {
      this.error = 'File is corrupted'
      console.log('[WorkspaceComponent]', 'Error' + error)
    }
  }
}
