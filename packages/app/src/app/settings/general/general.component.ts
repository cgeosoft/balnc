import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { Router } from '@angular/router'
import { ConfigService, DEFAULT_USER, RxDBService, User, UsersRepo, Workspace } from '@balnc/core'
import { MENU } from '@balnc/shared'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import * as Sentry from '@sentry/browser'
import { Angulartics2 } from 'angulartics2'
import { Observable, Subscription } from 'rxjs'

@Component({
  selector: 'app-settings-general',
  templateUrl: './general.component.html'

})
export class GeneralComponent implements OnInit, OnDestroy {

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
  showMenuItems: { [key: string]: boolean } = {}
  user: User

  sharableUrl
  users$: Observable<User[]>
  sub: Subscription

  get username () {
    return this.configService.username
  }

  constructor (
    private configService: ConfigService,
    private modal: NgbModal,
    private router: Router,
    private dbService: RxDBService,
    private usersRepo: UsersRepo,
    private angulartics2: Angulartics2
  ) {
  }

  ngOnInit () {
    this.workspace = this.configService.workspace
    this.user = { ...DEFAULT_USER, ...this.configService.user }
    this.sub = this.usersRepo.allm$().subscribe((users) => {
      const user = users.find(x => x.username === this.configService.username)
      this.user = { ...DEFAULT_USER, ...user }
      this.showMenuItems = this.menu.reduce((l, x) => {
        l[x.label] = (this.configService.user?.config?.menu?.items || []).indexOf(x.label) === -1
        return l
      }, {})
    })
    this.users$ = this.usersRepo.allm$()
  }

  ngOnDestroy (): void {
    this.sub.unsubscribe()
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

  export () {
    let a = document.createElement('a')
    let file = new Blob([JSON.stringify(this.workspace, null, 2)], { type: 'application/json' })
    a.href = URL.createObjectURL(file)
    a.download = `${(new Date()).toDateString()} - ${this.workspace.key}.json`
    a.click()
  }

  switchUser (username: string) {
    this.configService.username = username
  }

  removeUser (userId) {
    return this.usersRepo.remove(userId)
  }

  async createUser (username: string) {
    await this.usersRepo.add({
      username
    })
    this.configService.username = username
  }

  saveWorkspace () {
    this.configService.save({ ...this.workspace })
    this.angulartics2.settings.developerMode = !this.configService.workspace?.config.analytics
    Sentry.getCurrentHub().getClient().getOptions().enabled = this.configService.workspace?.config.errors
  }

  async saveUser () {
    this.user.config.menu.items = this.menu.map(m => m.label).filter(x => !this.showMenuItems[x])
    await this.usersRepo.update(this.user._id, this.user)
  }

}
