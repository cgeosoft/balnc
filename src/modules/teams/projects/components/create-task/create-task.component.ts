import { Component, Input, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-team-projects-task-create',
    templateUrl: './create-task.component.html',
    styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {

    form: FormGroup;

    constructor(
        public activeModal: NgbActiveModal,
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            title: ["", [Validators.required, Validators.maxLength(100)]],
            description: ["", []],
        });
    }

    submit() {

        const formModel = this.form.value;
        const task = {
            title: formModel.title as string,
            description: formModel.name as string,
        }
        this.activeModal.close(task)
    }
}

// lorem ipsum dolor sit amet lorem ipsum dolor sit 