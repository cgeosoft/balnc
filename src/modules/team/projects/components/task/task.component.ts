import { Component, NgZone, OnDestroy, OnInit, ElementRef, ViewChild } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Subscription } from 'rxjs/Subscription'
import { RxCollection, RxDocumentBase } from 'rxdb'
import { Observable } from 'rxjs/Observable'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { FormBuilder, Validators, FormGroup } from '@angular/forms'
import * as _ from 'lodash'
import * as moment from 'moment'

import { CreateTaskComponent } from '../create-task/create-task.component'
import { RxProjectDocument } from '../../data/project'
import { RxLogDocument } from '../../data/log'
import { ProjectsService } from '../../services/projects.service'

@Component({
  selector: 'app-team-projects-task',
  templateUrl: 'task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {

  commentPreview: boolean
  taskId: string
  comment: string = null

  task: RxLogDocument
  project: RxProjectDocument & any = {}
  logs: RxLogDocument[] = []

  form: FormGroup

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
        this.form = this.formBuilder.group({
          comment: ["", [Validators.required]],
        })
        this.setup()
        this.getLogs()
      })
  }

  private async setup() {
    this.task = await this.projectsService.getLog(this.taskId)
    this.project = await this.projectsService.getProject(this.task.project)
  }

  private async getLogs() {
    const logs = await this.projectsService.getLogs(this.taskId)
    this.logs = logs.sort((a, b) => {
      return a.insertedAt < b.insertedAt ? -1 : 1
    })
  }

  async submitComment() {
    const formModel = this.form.value
    await this.projectsService.addComment(formModel.comment, this.task)
    await this.getLogs()
    this.form.reset()
  }
}
