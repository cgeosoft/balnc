import { Component, OnInit } from '@angular/core'
import { ConfigService, RxDBService } from '@balnc/core'
import { ConfirmDialogComponent, Helpers, Profile } from '@balnc/shared'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { ReadFile } from 'ngx-file-helpers'
import environment from 'src/environments/environment'

@Component({
  selector: 'app-settings-shell',
  templateUrl: './shell.component.html'
})
export class ShellComponent implements OnInit {

  error: string
  profile: Profile

  helperService = Helpers

  sidebar = {
    title: 'Settings',
    menu: [{
      url: '/settings/general',
      icon: 'cog',
      type: 'button',
      label: 'General Options'
    }, {
      url: '/settings/plugins',
      icon: 'box',
      type: 'button',
      label: 'Manage Plugins'
    }, {
      url: '/settings/remote',
      icon: 'cog',
      type: 'button',
      label: 'Remote Options'
    }, {
      url: '/settings/demo-data',
      icon: 'cog',
      type: 'button',
      label: 'Demo Data'
    }, {
      type: 'divider'
    }, {
      url: '/settings/profiles',
      icon: 'swatchbook',
      type: 'button',
      label: 'Manage Profiles'
    }, {
      url: '/settings/developer',
      icon: 'code',
      type: 'button',
      label: 'Developer'
    }]
  }

  get profiles () {
    return this.configService.profiles
  }

  get selected () {
    return this.configService.selected
  }

  get plugins () {
    return environment.plugins
  }

  constructor (
    public configService: ConfigService,
    private modal: NgbModal,
    private dbService: RxDBService
  ) { }

  ngOnInit () {
    this.profile = this.configService.profile
  }

  clear () {
    this.configService.clearAll()
  }

  async remove (profileId) {

    await this.modal.open(ConfirmDialogComponent, { size: 'sm' })
      .result
      .then(async () => {
        this.configService.remove(profileId)
        await this.dbService.remove(profileId)
      })
      .catch(() => {
        console.log('dismised')
      })
  }

  onFilePicked (file: ReadFile) {
    this.error = null
    try {
      const data = file.content.split(',')[1]
      const profileStr = atob(data)
      const profile = JSON.parse(profileStr)
      const key = this.configService.save(profile)
      this.configService.select(key)
    } catch (error) {
      this.error = 'File is corrupted'
      console.log('[ProfileComponent]', 'Error' + error)
    }
  }
}
