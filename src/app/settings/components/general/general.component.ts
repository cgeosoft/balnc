import { Component, ElementRef, ViewChild, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { ConfigService, Profile } from '@balnc/core'

@Component({
  selector: 'core-settings-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit {

  @ViewChild('name') name: ElementRef
  @ViewChild('alias') alias: ElementRef

  profileName: string
  profileAlias: string

  selected: string
  profile: Profile

  deleteData = false
  deleteDataRemote = false
  needReload = false

  constructor (
    private router: Router,
    private configService: ConfigService
  ) { }

  ngOnInit () {
    this.profile = this.configService.getProfile()
  }

  save () {
    this.configService.saveProfile(this.profile)
    this.needReload = true
  }

  reload () {
    window.location.reload()
  }

  delete () {
    this.configService.deleteProfile(this.profile.id)
    this.router.navigate(['/settings'])
  }

  activate () {
    this.configService.selectProfile(this.profile.id)
  }
}
