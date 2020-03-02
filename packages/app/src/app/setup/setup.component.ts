import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { ConfigService } from '@balnc/core'
import { DEMO_PROFILE, Profile } from '@balnc/shared'
import { ReadFile } from 'ngx-file-helpers'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss']
})
export class SetupComponent implements OnInit {
  loading = false
  profile: Profile = { ...DEMO_PROFILE }

  get version () {
    return this.configService.version
  }

  get build () {
    return this.configService.build
  }

  ngOnInit (): void {
    this.loading = false
  }

  constructor (
    private router: Router,
    public configService: ConfigService,
    private toastr: ToastrService
  ) { }

  async start () {
    await this.load(this.profile)
  }

  async import (file: ReadFile) {
    this.profile = this.configService.import(file)
    if (!this.profile) {
      this.toastr.error('Import failed')
      return
    }
    await this.load(this.profile)
  }

  async load (profile) {
    this.loading = true
    const key = this.configService.save(profile)
    this.configService.select(key)
    await this.router.navigateByUrl('/')
  }
}
