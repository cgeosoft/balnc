import { Component, OnInit } from '@angular/core'
import { ConfigService } from '@balnc/core'
import { DEMO_PROFILE, Helpers, Plugin, Profile } from '@balnc/shared'
import { ReadFile } from 'ngx-file-helpers'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss']
})
export class SetupComponent implements OnInit {

  steps = [
    { label: 'Setup' },
    { label: 'Profile' },
    { label: 'Plugins' },
    { label: 'Finish' }
  ]
  stepIndex = 0

  accepted: false

  profile: Profile = {
    remote: {
      enabled: false
    },
    plugins: {}
  }

  plugins: Plugin[]

  helperService = Helpers

  constructor(
    public configService: ConfigService,
    private toastr: ToastrService
  ) { }

  async ngOnInit() {
    this.plugins = this.configService.plugins
  }

  back() {
    this.stepIndex--
  }

  next() {
    this.stepIndex++
  }

  finish() {
    this.profile.name = this.profile.name || this.helperService.generateName()
    const alias = this.configService.saveProfile(this.profile)
    this.configService.selectProfile(alias)
  }

  addDemo() {
    this.profile = DEMO_PROFILE
    this.stepIndex = this.steps.length - 1
  }

  importFile(file: ReadFile) {
    const profile: Profile = this.configService.importFile(file)
    if (!profile) {
      this.toastr.error('Import failed')
      return
    }
    this.stepIndex = this.steps.length - 1
  }

  switchStatus(pluginId: string) {
    this.profile.plugins[pluginId] = !this.profile.plugins[pluginId]
  }
}
