import { Component, Input, OnInit, NgZone } from '@angular/core';

import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RxProjectDocument } from '../../data/project';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ProjectsService } from '../../services/projects.service';

@Component({
    selector: 'app-team-projects-project-create',
    templateUrl: './create-project.component.html'
})
export class CreateProjectComponent implements OnInit {

    form: FormGroup;

    constructor(
        private activeModal: NgbActiveModal,
        private formBuilder: FormBuilder,
        private projectsService: ProjectsService,
        private ngZone: NgZone,
    ) { }

    async ngOnInit() {
        this.form = this.formBuilder.group({
            name: ["", [Validators.required, Validators.maxLength(100)]],
            description: ["", []],
        });
    }

    onSubmit() {
        const formModel = this.form.value;
        const projectId = formModel.project
        this.projectsService
            .addProject(formModel.name, formModel.description)
            .then(() => {
                this.ngZone.run(() => { })
                this.activeModal.close()
            })
    }
}
