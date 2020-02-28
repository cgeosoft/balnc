import { Component, OnInit } from '@angular/core'
import { ConfigService, RxDBService } from '@balnc/core'
import { BPlugin, ConfirmDialogComponent, DEMO_PROFILE, Helpers, Profile } from '@balnc/shared'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { ReadFile } from 'ngx-file-helpers'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-settings-shell',
  templateUrl: './shell.component.html'
})
export class ShellComponent implements OnInit {

  error: string
  profile: Profile
  plugins: BPlugin[] = []

  helperService = Helpers

  sidebar = {
    title: 'Settings',
    menu: [{
      url: '/settings/general',
      icon: 'cog',
      type: 'button',
      label: 'General'
    },
    {
      url: '/settings/plugins',
      icon: 'box',
      type: 'button',
      label: 'Plugins'
    },
    {
      url: '/settings/profiles',
      icon: 'swatchbook',
      type: 'button',
      label: 'Profiles'
    }]
  }

  constructor (
    public configService: ConfigService,
    private toastr: ToastrService,
    private modal: NgbModal,
    private dbService: RxDBService
  ) { }

  get profiles () {
    return this.configService.profiles
  }

  get selected () {
    return this.configService.selected
  }

  ngOnInit () {
    this.profile = this.configService.profile
    this.plugins = this.configService.plugins
  }

  clear () {
    this.configService.clearAll()
  }

  create () {
    const key = this.configService.save({
      key: null,
      name: Helpers.generateName(),
      data: {
        persist: true
      },
      remote: {
        enabled: false
      },
      plugins: {}
    })
    this.configService.select(key)
  }

  async import (file: ReadFile) {
    const profile = this.configService.import(file)
    if (!profile) {
      this.toastr.error('Import failed')
      return
    }
    const key = this.configService.save(profile)
    this.configService.select(key)
  }

  activate (profileId) {
    this.configService.select(profileId)
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

  createDemo () {
    const demo = this.configService.save(DEMO_PROFILE)
    this.activate(demo)
  }

  onFilePicked (file: ReadFile) {
    this.error = null
    try {
      const data = file.content.split(',')[1]
      const profileStr = atob(data)
      const profile = JSON.parse(profileStr)
      const key = this.configService.save(profile)
      this.configService.select(alias)
    } catch (error) {
      this.error = 'File is corrupted'
      console.log('[ProfileComponent]', 'Error' + error)
    }
  }
}
