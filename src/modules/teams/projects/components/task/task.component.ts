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

@Component({
  selector: 'app-team-projects-task',
  templateUrl: 'task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {
  comment: string = null
  task: RxDocumentBase<RxTaskDocument> & RxTaskDocument

  dbProject: RxCollection<any>
  dbTask: RxCollection<any>

  project$: Observable<any>
  task$: Observable<any>

  project: RxProjectDocument

  constructor(
    private route: ActivatedRoute,
    private dbService: DatabaseService,
    private zone: NgZone,
    private modal: NgbModal
  ) { }

  ngOnInit() {

    this.route
      .params
      .subscribe(params => {
        this.setup(params['projectId'], params['taskId'])
      })

    setTimeout(() => {
      this.zone.run(() => { })
    }, 500)
  }

  private async setup(projectId: string, taskId: string) {
    this.dbProject = await this.dbService.get<RxProjectDocument>("project")
    this.dbTask = await this.dbService.get<RxTaskDocument>("task")

    this.project$ = this.dbProject.findOne(projectId).$
    this.task$ = this.dbTask.findOne(taskId).$

    this.task$.subscribe((task: RxDocumentBase<RxTaskDocument> & RxTaskDocument) => {
      this.task = task
    })

    this.zone.run(() => { })
  }

  submitComment() {

    if (!this.comment.length) {

      console.log("empty")
      return
    }

    const now = moment().toISOString()
    const user = "anonymous"
    const log = this.task.log
    log.push({
      comment: this.comment,
      from: user,
      at: now,
    })
    this.task.log = log
    this.task
      .save()
      .then(() => {
        this.comment = null
        this.zone.run(() => { })
      })

  }

}
