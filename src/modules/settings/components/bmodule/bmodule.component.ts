import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { BModule, ConfigService } from '@balnc/common'

@Component({
  selector: 'core-settings-bmodule',
  templateUrl: './bmodule.component.html',
  styleUrls: ['./bmodule.component.scss']
})
export class BModuleComponent implements OnInit {

  profile
  bmodule: BModule
  config: any

  constructor (
    private route: ActivatedRoute,
    private configService: ConfigService
  ) { }

  async ngOnInit () {
    this.profile = this.configService.getProfile()
    this.route
      .params
      .subscribe(async params => {
        this.bmodule = this.configService.bmodules.find(p => p.id === params['id'])
      })
  }
}
