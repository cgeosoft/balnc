import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RxDocumentBase } from 'rxdb';
import { Observable } from 'rxjs';
import { PEvent } from '../_shared/models/pevent';
import { RxProjectDoc } from '../_shared/models/project';
import { ProjectsService } from '../_shared/projects.service';

@Component({
  selector: 'projects-task-create',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {

  projects$: Observable<(RxDocumentBase<RxProjectDoc> & RxProjectDoc)[]>

  @Input() projectId

  form: FormGroup

  constructor (
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private projectsService: ProjectsService
  ) { }

  ngOnInit () {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      project: [this.projectId, [Validators.required]],
      description: ['', []]
    })
  }

  async onSubmit () {
    const formModel = this.form.value
    const task: PEvent = {
      title: formModel.title,
      description: formModel.description,
      project: this.projectId
    }
    await this.projectsService.createTask(task)
    this.activeModal.close()
  }
}