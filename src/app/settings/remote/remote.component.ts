import { Component, Input, OnInit } from '@angular/core';
import { Profile } from '@balnc/shared';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-settings-remote',
  templateUrl: './remote.component.html',
})
export class RemoteComponent implements OnInit {

  @Input() profile: Profile
  remote: { enabled: boolean; host?: string; username?: string; password?: string; };

  constructor(
    private activeModal: NgbActiveModal,
  ) { }

  ngOnInit() {
    this.remote = { ...this.profile.remote }
  }

  save() {
    this.activeModal.close(this.remote)
  }

  dismiss() {
    this.activeModal.dismiss()
  }
}
