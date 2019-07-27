import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from '@balnc/core';
import { Profile } from '@balnc/shared';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RemoteComponent } from '../remote/remote.component';

@Component({
  selector: 'app-settings-general',
  templateUrl: './general.component.html',
})
export class GeneralComponent implements OnInit {

  @ViewChild('name', { static: false }) name: ElementRef
  @ViewChild('alias', { static: false }) alias: ElementRef

  profileName: string
  profileAlias: string

  selected: string
  profile: Profile

  deleteData = false
  deleteDataRemote = false
  editName = false

  constructor(
    private router: Router,
    private configService: ConfigService,
    private modal: NgbModal
  ) { }

  ngOnInit() {
    this.profile = this.configService.profile
  }

  rename(newName) {
    if (!newName) return
    this.profile.name = newName
    this.configService.saveProfile(this.profile)
  }

  activate() {
    this.configService.selectProfile(this.profile.id)
  }

  delete() {
    if (!confirm('Are you sure?')) return
    this.configService.deleteProfile(this.profile.id)
    window.location.reload()
  }

  toggleRemote() {
    if (!confirm('Are you sure?')) return
    this.profile.remote.enabled = !this.profile.remote.enabled
    this.configService.saveProfile(this.profile)
    window.location.reload()
  }

  async remote() {
    const m = this.modal.open(RemoteComponent, { backdrop: "static" })
    m.componentInstance.profile = this.profile
    const remote = await m.result
    this.profile.remote = remote
    this.configService.saveProfile(this.profile)
    window.location.reload()
  }
}
