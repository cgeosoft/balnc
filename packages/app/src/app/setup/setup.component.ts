import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { ConfigService } from '@balnc/core'
import { DEFAULT_WORKSPACE, Workspace } from '@balnc/shared'
import { ReadFile } from 'ngx-file-helpers'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss']
})
export class SetupComponent implements OnInit {
  loading = false
  workspace: Workspace = { ...DEFAULT_WORKSPACE }

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
    await this.load(this.workspace)
  }

  async import (file: ReadFile) {
    this.workspace = this.configService.import(file)
    if (!this.workspace) {
      this.toastr.error('Import failed')
      return
    }
    await this.load(this.workspace)
  }

  async load (workspace) {
    this.loading = true
    const key = this.configService.save(workspace)
    this.configService.activate(key)
    await this.router.navigateByUrl('/')
  }
}
