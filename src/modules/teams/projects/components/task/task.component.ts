import { Component, NgZone, OnDestroy, OnInit, ElementRef, ViewChild } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Subscription } from 'rxjs/Subscription'
import { RxCollection, RxDocumentBase } from 'rxdb'
import { Observable } from 'rxjs/Observable'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import * as _ from 'lodash'
import * as moment from 'moment'

import { DatabaseService } from '@blnc-core/database/services/database.service'

import { CreateTaskComponent } from '../create-task/create-task.component'
import { RxProjectDocument } from '../../data/project'
import { RxTaskDocument } from '../../data/task'
import { ProjectsService } from '../../services/projects.service';

@Component({
  selector: 'app-team-projects-task',
  templateUrl: 'task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {

  commentPreview: boolean
  taskId: string;
  comment: string = null
  task: RxDocumentBase<RxTaskDocument> & RxTaskDocument

  project$: Observable<any>
  task$: Observable<any>
  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
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
    })

    this.form = this.formBuilder.group({
      comment: ["", [Validators.required]],
    });
  }

  async submitComment() {
    const formModel = this.form.value;

    const now = moment().toISOString()
    const user = "anonymous"
    // const log = this.task.log
    // log.push({
    //   comment: formModel.comment,
    //   from: user,
    //   at: now,
    //   type: "COMMENT"
    // })
    // this.task.log = log
    await this.task.save()
    this.form.reset()
  }
}
