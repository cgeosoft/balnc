import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from '@balnc/core';
import { Profile } from '@balnc/shared';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RemoteComponent } from '../remote/remote.component';

@Component({
  selector: 'app-settings-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
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
  needReload = false

  constructor(
    private router: Router,
    private configService: ConfigService,
    private modal: NgbModal
  ) { }

  ngOnInit() {
    this.profile = this.configService.getProfile()
  }

  save() {
    this.configService.saveProfile(this.profile)
    this.needReload = true
  }

  reload() {
    window.location.reload()
  }

  delete() {
    this.configService.deleteProfile(this.profile.id)
    this.router.navigate(['/settings'])
  }

  activate() {
    this.configService.selectProfile(this.profile.id)
  }

  async remoteEnable() {
    await this.modal.open(RemoteComponent).result
  }
}
