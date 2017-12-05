import { Component, Input } from '@angular/core';

import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-presentation-create',
    templateUrl: './create.component.html'
})
export class CreateComponent {

    presentationTitle: string;

    constructor(public activeModal: NgbActiveModal) { }

    submit() {
        this.activeModal.close({
            title: this.presentationTitle
        })
    }
}
