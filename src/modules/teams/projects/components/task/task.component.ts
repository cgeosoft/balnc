import { Component, NgZone, OnDestroy, OnInit, ElementRef, ViewChild } from '@angular/core'
import { Subscription } from 'rxjs/Subscription'
import { RxCollection, RxDocumentBase } from 'rxdb'
import { RxTaskDocument } from '../../data/task'
import { Observable } from 'rxjs/Observable'
import { DatabaseService } from '../../../../_core/database/services/database.service'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'

import { CreateTaskComponent } from '../create-task/create-task.component'
import * as _ from 'lodash'
import * as moment from 'moment'
import { RxProjectDocument } from '../../data/project'
import { ActivatedRoute } from '@angular/router'
import { ProjectsService } from '../../services/projects.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-team-projects-task',
  templateUrl: 'task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {
  taskId: string;
  comment: string = null
  task: RxDocumentBase<RxTaskDocument> & RxTaskDocument

  project$: Observable<any>
  task$: Observable<any>
  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private ngZone: NgZone,
    private modal: NgbModal,
    private formBuilder: FormBuilder,
    private projectsService: ProjectsService,
  ) { }

  ngOnInit() {
    this.route
      .params
      .subscribe(params => {
        this.taskId = params['id']
        this.setup()
      })
  }

  private async setup() {
    this.task$ = this.projectsService.getTask(this.taskId)
    this.task$.subscribe((task: RxDocumentBase<RxTaskDocument> & RxTaskDocument) => {
      this.task = task
      this.project$ = this.projectsService.getProject(task.project)
      this.ngZone.run(() => { })
    })

    this.form = this.formBuilder.group({
      comment: ["", [Validators.required]],
    });
  }

  async submitComment() {
    const formModel = this.form.value;

    const now = moment().toISOString()
    const user = "anonymous"
    const log = this.task.log
    log.push({
      comment: formModel.comment,
      from: user,
      at: now,
      type: "COMMENT"
    })
    this.task.log = log
    await this.task.save()
    this.form.reset()
  }
}
