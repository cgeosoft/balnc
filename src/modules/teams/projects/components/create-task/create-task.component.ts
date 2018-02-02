import { Component, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-team-projects-task-create',
    templateUrl: './create-task.component.html'
})
export class CreateTaskComponent {

    title: string;

    constructor(public activeModal: NgbActiveModal) { }

    submit() {
        this.activeModal.close({
            title: this.title
        })
    }
}
