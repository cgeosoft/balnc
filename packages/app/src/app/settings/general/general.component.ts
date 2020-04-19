import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { Router } from '@angular/router'
import { ConfigService, RxDBService, User, UsersRepo, Workspace } from '@balnc/core'
import { MENU } from '@balnc/shared'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import * as Sentry from '@sentry/browser'
import { Angulartics2 } from 'angulartics2'
import { Observable, Subscription } from 'rxjs'
import { UserFormComponent } from '../../@main/user-form/user-form.component'

@Component({
  selector: 'app-settings-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']

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

  sharableUrl
  users$: Observable<User[]>
  sub: Subscription
  avatarPreview: any

  get username () {
    return this.configService.user?.username
  }

  get user () {
    return this.configService.user
  }

  get avatar () {
    return this.configService.userAvatars[this.user._id]
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
    this.sub = this.usersRepo.allm$().subscribe(async (users: User[]) => {
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

  updateWorkspace (data: any) {
    this.workspace = { ...this.workspace, ...data }
    this.configService.update(this.workspace)
    this.angulartics2.settings.developerMode = !this.configService.workspace?.analytics
    Sentry.getCurrentHub().getClient().getOptions().enabled = this.configService.workspace?.errors
  }

  async deleteWorkspace () {
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
    this.configService.export()
  }

  removeUser () {
    return this.usersRepo.remove(this.user._id)
  }

  createUser () {
    this.modal.open(UserFormComponent, { size: 'sm', centered: true })
  }

  async saveUser () {
    this.user.config.menu.items = this.menu.map(m => m.label).filter(x => !this.showMenuItems[x])
    await this.usersRepo.update(this.user._id, this.user)
  }

  @ViewChild('fileupload') fileupload: ElementRef
  selectAvatar () {
    this.fileupload.nativeElement.click()
  }

  async clearAvatar () {
    await this.usersRepo.detach(this.user._id, 'avatar')
  }

  async uploadAvatar (file: File) {
    await this.usersRepo.attach(this.user._id, file, 'avatar')
  }
}
