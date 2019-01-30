import { Component, Input, OnInit, ElementRef, ViewChild, NgZone } from '@angular/core'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { RxDocumentBase } from 'rxdb'
import { Observable } from 'rxjs'

import { ProjectsService } from '../../projects.service'
import { RxProjectDoc } from '../../models/project'
import { PEvent } from '../../models/pevent'

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
