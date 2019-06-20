import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from '@balnc/core';

@Component({
  selector: 'app-settings-remote',
  templateUrl: './remote.component.html',
})
export class RemoteComponent implements OnInit {

  constructor(
    private router: Router,
    private configService: ConfigService
  ) { }

  ngOnInit() {
  }

  save() {
  }
}
