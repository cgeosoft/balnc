import { Component } from '@angular/core'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import { PresentationsRepo } from '../_shared/repos/presentations.repo'

@Component({
  selector: 'app-presentations-create',
  templateUrl: './create.component.html'
})
export class CreateComponent {

  presentationTitle: string

  constructor (
    public activeModal: NgbActiveModal,
    private presentationsRepo: PresentationsRepo
  ) { }

  async onSubmit () {
    const presentation = await this.presentationsRepo.add({ title: this.presentationTitle })
    this.activeModal.close(presentation)
  }
}
