import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from '@balnc/core';
import { Profile } from '@balnc/shared';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-settings-remote',
  templateUrl: './remote.component.html',
})
export class RemoteComponent implements OnInit {

  profile: Profile

  constructor(
    private router: Router,
    private configService: ConfigService,
    private activeModal: NgbActiveModal,
  ) { }

  ngOnInit() {
  }

  save() {
  }

  dismiss() {
    this.activeModal.dismiss()
  }
}
