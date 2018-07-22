import { Component, Input, OnInit } from '@angular/core'
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'

import { PresentationsService } from '../../services/presentations.service'

@Component({
    selector: 'presentations-create-presentation',
    templateUrl: './create-presentation.component.html'
})
export class CreatePresentationComponent implements OnInit {

    presentationTitle: string

    constructor(
        public activeModal: NgbActiveModal,
        private presentationsService: PresentationsService
    ) { }

    async ngOnInit() {

    }

    onSubmit() {
        this.presentationsService
            .addPresentation(this.presentationTitle)
            .then(() => {
                this.activeModal.close()
            })
    }
}
