import { Component, Input, OnInit } from '@angular/core'
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'

import { PresentationsService } from '../../presentations.service'

@Component({
  selector: 'presentations-create',
  templateUrl: './create.component.html'
})
export class CreateComponent implements OnInit {

  presentationTitle: string

  constructor (
    public activeModal: NgbActiveModal,
    private presentationsService: PresentationsService
  ) { }

  async ngOnInit () {
    // todo
  }

  async onSubmit () {
    await this.presentationsService.addPresentation(this.presentationTitle)
    this.activeModal.close()
  }
}
