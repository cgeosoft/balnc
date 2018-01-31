import { Component, Input } from '@angular/core';

import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-project-create',
    templateUrl: './create.component.html'
})
export class CreateComponent {

    projectName: string;

    constructor(public activeModal: NgbActiveModal) { }

    submit() {
        this.activeModal.close({
            name: this.projectName
        })
    }
}
