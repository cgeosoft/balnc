import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { ConfigService, RxDBService } from '@balnc/core'
import { ConfirmDialogComponent, DEMO_PROFILE, Helpers, Plugin, Profile } from '@balnc/shared'
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
  plugins: Plugin[] = []

  helperService = Helpers

  menu = {
    items: [{
      url: '/settings/general',
      icon: 'cog',
      type: 'PAGE',
      label: 'General'
    },
    {
      url: '/settings/plugins',
      icon: 'box',
      type: 'PAGE',
      label: 'Plugins'
    },
    {
      url: '/settings/about',
      icon: 'info-circle',
      type: 'PAGE',
      label: 'About'
    }]
  }

  constructor (
    public configService: ConfigService,
    private router: Router,
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
    this.configService.clearAllProfiles()
  }

  create () {
    const alias = this.configService.saveProfile({
      name: Helpers.generateName(),
      remote: {
        enabled: false
      },
      plugins: {}
    })
    this.configService.selectProfile(alias)
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

  activate (profileId) {
    this.configService.selectProfile(profileId)
  }

  async remove (profileId) {

    await this.modal.open(ConfirmDialogComponent, { size: 'sm' })
      .result
      .then(async () => {
        this.configService.removeProfile(profileId)
        await this.dbService.removeProfile(profileId)
      })
      .catch(() => {
        console.log('dismised')
      })
  }

  createProfile () {
    this.configService.saveProfile({
      name: this.helperService.generateName(),
      remote: {
        enabled: false
      },
      plugins: {}
    })
  }

  createDemo () {
    const demo = this.configService.saveProfile(DEMO_PROFILE)
    this.activate(demo)
  }

  onFilePicked (file: ReadFile) {
    this.error = null
    try {
      const data = file.content.split(',')[1]
      const profileStr = atob(data)
      const profile = JSON.parse(profileStr)
      const alias = this.configService.saveProfile(profile)
      this.configService.selectProfile(alias)
    } catch (error) {
      this.error = 'File is corrupted'
      console.log('[ProfileComponent]', 'Error' + error)
    }
  }
}
