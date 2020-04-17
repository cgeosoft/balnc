import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { Router } from '@angular/router'
import { ConfigService, RxDBService } from '@balnc/core'
import { Workspace } from '@balnc/shared'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import * as Sentry from '@sentry/browser'
import { Angulartics2 } from 'angulartics2'
import { MENU } from 'src/app/@core/models/menu'
import { DEFAULT_USER, User } from './../../@shared/models/workspace'
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

  menu: any[] = MENU
  showMenuItems: { [key: string]: boolean }
  user: User

  sharableUrl

  constructor (
    private configService: ConfigService,
    private modal: NgbModal,
    private router: Router,
    private dbService: RxDBService,
    private angulartics2: Angulartics2
  ) {
  }

  ngOnInit () {
    this.workspace = this.configService.workspace
    this.user = { ...DEFAULT_USER, ...this.configService.user }
    this.loadRaw()
    this.showMenuItems = this.menu.reduce((l, x) => {
      l[x.label] = (this.configService.user?.config?.menu?.items || []).indexOf(x.label) === -1
      return l
    }, {})
  }

  validate () {
    try {
      this.rawErr = false
      JSON.parse(this.source)
    } catch (err) {
      this.rawErr = true
    }
  }

  loadRaw () {
    this.source = JSON.stringify(this.workspace, null, 2)
  }

  updateRaw () {
    this.configService.save(JSON.parse(this.source))
  }

  async delete () {
    if (!confirm('Are you sure?')) return
    await this.dbService.remove(this.workspace.key)
    this.configService.remove(this.workspace.key)
    this.configService.activated = null

    if (!this.configService.workspaces.length) {
      await this.router.navigate(['/setup'])
      return false
    }
    this.configService.setup()
    await this.dbService.setup()
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
    a.download = `${(new Date()).toDateString()} - ${this.workspace.key}.json`
    a.click()
  }

  async saveUser () {
    await this.dbService.upsetUser(this.user)
  }

  save () {
    this.configService.user.config.menu.items = this.menu
      .map(m => m.label)
      .filter(x => !this.showMenuItems[x])
    this.configService.save({ ...this.workspace })
    this.angulartics2.settings.developerMode = !this.configService.workspace?.config.analytics
    Sentry.getCurrentHub().getClient().getOptions().enabled = this.configService.workspace?.config.errors
    this.loadRaw()

  }
}
