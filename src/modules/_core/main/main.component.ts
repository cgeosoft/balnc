import { Component, OnInit } from '@angular/core'
import { RxCollection } from 'rxdb'
import { ConfigService } from '@blnc/core/config/config.service'
import { BehaviorSubject } from 'rxjs/Rx'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {

  $account: BehaviorSubject<any>

  constructor(
    private configService: ConfigService,
  ) { }

  ngOnInit() {
    this.setup()
  }

  private async setup() {
    this.$account = this.configService.$account
  }
}
