import { Component, NgZone, OnDestroy, OnInit, ElementRef, ViewChild } from '@angular/core'
import { Subscription } from 'rxjs/Subscription'
import { RxCollection, RxDocumentBase } from 'rxdb'
import { RxTaskDocument } from '../../data/task'
import { Observable } from 'rxjs/Observable'
import { DatabaseService } from '../../../../_core/database/services/database.service'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'

import { CreateTaskComponent } from '../create-task/create-task.component';
import * as _ from 'lodash'
import * as moment from 'moment'
import { RxProjectDocument } from '../../data/project'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-team-projects-project',
  templateUrl: 'project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent {

  dbProject: RxCollection<any>
  dbTask: RxCollection<any>

  tasks$: Observable<any[]>
  project$: Observable<any>

  project: RxDocumentBase<RxProjectDocument> & RxProjectDocument;

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
        this.setup(params['projectId'])
      })

    setTimeout(() => {
      this.zone.run(() => { })
    }, 500)
  }

  private async setup(projectId: string) {
    this.dbProject = await this.dbService.get<RxProjectDocument>("project")
    this.dbTask = await this.dbService.get<RxTaskDocument>("task")

    this.project$ = this.dbProject.findOne(projectId).$
    this.project$.subscribe((project: RxDocumentBase<RxProjectDocument> & RxProjectDocument) => {
      this.project = project

      this.tasks$ = this.dbTask
        .find({ project: { $eq: this.project.get('_id') } }).$
        .map((data) => {
          if (!data) { return data }
          data.sort((a, b) => {
            return a.updatedAt > b.updatedAt ? -1 : 1
          })
          return data
        })

      this.tasks$.subscribe(() => {
        this.zone.run(() => { })
      })
    })
  }

  createTask() {
    const modalRef = this.modal.open(CreateTaskComponent)
    modalRef.result
      .then((result) => {
        const now = moment().toISOString()
        const user = "anonymous"
        const task = this.dbTask.newDocument({
          title: result.title,
          insertedAt: now,
          updatedAt: now,
          insertedFrom: user,
          log: [{
            comment: "Task inserted to project",
            from: user,
            at: now,
          }],
          status: "PENDING",
          project: this.project.get('_id')
        })
        task.save()
        this.zone.run(() => { })
      }, (reject) => {
        console.log("dismissed", reject)
      })
  }

}
