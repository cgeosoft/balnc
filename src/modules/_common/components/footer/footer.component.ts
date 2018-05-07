import { Component, OnInit } from '@angular/core';
import { ConfigService } from '@balnc/common/services/config.service';

@Component({
  selector: 'app-footer',
  templateUrl: "./footer.component.html",
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  version: string

  constructor(
    private configService: ConfigService,
  ) { }

  ngOnInit() {
    this.version = this.configService.version
  }

}
