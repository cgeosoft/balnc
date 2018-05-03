import { Component, OnDestroy, OnInit } from '@angular/core'
import { ConfigService } from '@blnc/common/services/config.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  config: any;
  constructor(
    private configService: ConfigService
  ) { }

  ngOnInit() {
    this.config = this.configService.config
  }

  ngOnDestroy() {
  }
}
