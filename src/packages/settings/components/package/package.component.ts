import { ActivatedRoute } from '@angular/router'
import { Component, OnInit } from '@angular/core'

import { ConfigService, Package } from '@balnc/common'
import { config } from 'rxjs';

@Component({
  selector: 'core-settings-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.scss']
})
export class PackageComponent implements OnInit {

  package: Package
  config: any

  constructor(
    private route: ActivatedRoute,
    private configService: ConfigService
  ) { }

  async ngOnInit() {
    this.route
      .params
      .subscribe(async params => {
        this.package = this.configService.packages.find(p => p.id === params['id'])
      })
  }
}
