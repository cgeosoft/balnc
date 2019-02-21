import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfigService, Profile } from '@balnc/core';

@Component({
  selector: 'settings-data',
  templateUrl: './data.component.html'
})
export class DataComponent implements OnInit {
  profile: Profile
  data: any

  constructor (
    private route: ActivatedRoute,
    private configService: ConfigService
  ) { }

  async ngOnInit () {
    this.route.params.subscribe(params => {
      this.setup(params['alias'])
    })
  }

  setup (alias) {
    this.profile = this.configService.getProfile(alias)
    this.data = null
  }

  async export () {
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
