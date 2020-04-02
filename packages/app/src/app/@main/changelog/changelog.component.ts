import { Component } from '@angular/core'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-changelog',
  templateUrl: './changelog.component.html'
})
export class ChangelogComponent {
  get m () {
    return this.activeModal
  }
  constructor (
    public activeModal: NgbActiveModal
  ) { }
}
