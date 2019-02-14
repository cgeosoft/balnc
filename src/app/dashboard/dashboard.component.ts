import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { ConfigService } from '@balnc/shared'

@Component({
  selector: 'core-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  menu: any
  profile: any
  config: any
  constructor(
    private configService: ConfigService,
    private router: Router
  ) { }

  ngOnInit() {
    this.config = this.configService.config
    this.profile = this.configService.getProfile()
  }
}
