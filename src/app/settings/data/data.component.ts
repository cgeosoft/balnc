import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfigService } from '@balnc/core';
import { Profile } from '@balnc/shared';

@Component({
  selector: 'app-settings-data',
  templateUrl: './data.component.html'
})
export class DataComponent implements OnInit {
  profile: Profile
  data: any

  constructor(
    private route: ActivatedRoute,
    private configService: ConfigService
  ) { }

  async ngOnInit() {
    this.route.params.subscribe(params => {
      this.setup(params['alias'])
    })
  }

  setup(alias) {
    const profile = this.configService.getProfile(alias)
    this.profile = Object.assign({}, profile)
    this.data = null
  }

  save() {
    this.configService.saveProfile(this.profile)
  }

  async export() {
    const backup = {
      profile: this.profile,
      data: this.data
    }
    const a = document.createElement('a')
    const file = new Blob([JSON.stringify(backup)], { type: 'application/json' })
    a.href = URL.createObjectURL(file)
    a.download = `balnc.${this.profile.id}.${(new Date()).getTime()}.json`
    a.click()
  }

}
