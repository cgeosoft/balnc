import { Component, Input, OnInit, ElementRef, ViewChild, NgZone } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RxDocumentBase } from 'rxdb';
import { Observable } from 'rxjs/Observable';

import { ProjectsService } from '../../services/projects.service';
import { RxProjectDocument } from '../../data/project';

@Component({
    selector: 'app-team-projects-task-create',
    templateUrl: './create-task.component.html',
    styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {

    projects$: Observable<(RxDocumentBase<RxProjectDocument> & RxProjectDocument)[]>;

    @Input() projectId = "";

    @ViewChild("title") title: ElementRef;

    form: FormGroup;

    constructor(
        public activeModal: NgbActiveModal,
        private formBuilder: FormBuilder,
        private projectsService: ProjectsService,
    ) { }

    async ngOnInit() {

        // this.projects$ = await this.projectsService.getProjects()

        if (this.projectId === null) {
            const projects = await this.projects$.toPromise()
            if (projects.length !== 0) {
                this.projectId = projects[0].get("_id")
            }
        }

        this.form = this.formBuilder.group({
            title: ["", [Validators.required, Validators.maxLength(100)]],
            project: [this.projectId, [Validators.required]],
            description: ["", []],
        });
    }

    onSubmit() {
        const formModel = this.form.value;
        const projectId = formModel.project
        this.projectsService
            .addTask(formModel.title, formModel.project, formModel.description)
            .then(() => {
                this.form.reset()
                this.form.get("project").setValue(projectId)
                this.title.nativeElement.focus()
            })
    }
}