import { Component, Input } from '@angular/core';

import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-team-projects-project-create',
    templateUrl: './create-project.component.html'
})
export class CreateProjectComponent {

    name: string;

    constructor(public activeModal: NgbActiveModal) { }

    submit() {
        this.activeModal.close({
            name: this.name
        })
    }
}
