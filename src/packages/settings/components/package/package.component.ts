import { ActivatedRoute } from '@angular/router'
import { Component, OnInit } from '@angular/core'

import { ConfigService, Package } from '@balnc/common'

@Component({
  selector: 'core-settings-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.scss']
})
export class PackageComponent implements OnInit {

  package: Package

  constructor (
    private route: ActivatedRoute,
    private configService: ConfigService
  ) { }

  async ngOnInit () {
    this.route
      .params
      .subscribe(async params => {
        this.package = this.configService.packages.find(p => p.id === params['id'])
      })
  }
}
