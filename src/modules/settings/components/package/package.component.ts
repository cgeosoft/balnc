import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { ConfigService, BModule } from '@balnc/common'
import { config } from 'rxjs'

@Component({
  selector: 'core-settings-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.scss']
})
export class PackageComponent implements OnInit {

  package: BModule
  config: any

  constructor (
    private route: ActivatedRoute,
    private configService: ConfigService
  ) { }

  async ngOnInit () {
    this.route
      .params
      .subscribe(async params => {
        this.package = this.configService.bmodules.find(p => p.id === params['id'])
      })
  }
}
