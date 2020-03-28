import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { Router } from '@angular/router'
import { ConfigService, RxDBService } from '@balnc/core'
import { Workspace } from '@balnc/shared'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import * as Sentry from '@sentry/browser'
import { Angulartics2 } from 'angulartics2'
import { RawViewComponent } from './../raw-view/raw-view.component'

@Component({
  selector: 'app-settings-general',
  templateUrl: './general.component.html'

})
export class GeneralComponent implements OnInit {

  @ViewChild('name') name: ElementRef
  @ViewChild('alias') alias: ElementRef

  workspaceName: string
  workspaceAlias: string

  selected: string
  workspace: Workspace

  deleteData = false
  deleteDataRemote = false
  editName = false

  source: string
  options: any = { maxLines: 1000, printMargin: true }
  rawErr = false

  constructor (
    private configService: ConfigService,
    private modal: NgbModal,
    private router: Router,
    private rxdbService: RxDBService,
    private angulartics2: Angulartics2
  ) {
  }

  ngOnInit () {
    this.workspace = this.configService.workspace
    this.source = JSON.stringify(this.workspace, null, 2)
  }

  validate () {
    try {
      this.rawErr = false
      JSON.parse(this.source)
    } catch (err) {
      this.rawErr = true
    }
  }

  updateRaw () {
    this.configService.save(JSON.parse(this.source))
  }

  rename (newName) {
    if (!newName) return
    this.workspace.name = newName
    this.configService.save(this.workspace)
  }

  async delete () {
    if (!confirm('Are you sure?')) return
    await this.rxdbService.remove(this.workspace.key)
    this.configService.remove(this.workspace.key)
    this.configService.activated = null

    if (!this.configService.workspaces.length) {
      await this.router.navigate(['/setup'])
      return false
    }
    this.configService.setup()
    await this.rxdbService.setup()
  }

  async editRaw () {
    const m = this.modal.open(RawViewComponent, { backdrop: 'static' })
    m.componentInstance.workspace = this.workspace
    this.workspace = await m.result
  }

  export () {
    let a = document.createElement('a')
    let file = new Blob([JSON.stringify(this.workspace, null, 2)], { type: 'application/json' })
    a.href = URL.createObjectURL(file)
    a.download = `${(new Date()).toDateString()} - ${this.workspace.name}.json`
    a.click()
  }

  save () {
    this.configService.save({ ...this.workspace })
    this.angulartics2.settings.developerMode = !this.configService.workspace?.analytics
    Sentry.getCurrentHub().getClient().getOptions().enabled = this.configService.workspace?.errorReport
  }
}
