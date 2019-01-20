import { Component } from '@angular/core'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'

import { PresentationsService } from '../../presentations.service'

@Component({
  selector: 'presentations-create',
  templateUrl: './create.component.html'
})
export class CreateComponent {

  presentationTitle: string

  constructor (
    public activeModal: NgbActiveModal,
    private presentationsService: PresentationsService
  ) { }

  async onSubmit () {
    const presentation = await this.presentationsService
      .addPresentation(this.presentationTitle)
    this.activeModal.close(presentation)
  }
}
