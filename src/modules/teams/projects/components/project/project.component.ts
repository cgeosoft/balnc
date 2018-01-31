import { Component, NgZone, OnDestroy, OnInit, ElementRef, ViewChild } from '@angular/core'
import { Subscription } from 'rxjs/Subscription'
import { RxCollection, RxDocumentBase } from 'rxdb'
import { RxTaskDocument } from '../../data/task'
import { Observable } from 'rxjs/Observable'
import { DatabaseService } from '../../../../_core/database/database.service'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { CreateComponent } from '../create/create.component'
import * as _ from 'lodash'
import * as moment from 'moment'
import { RxProjectDocument } from '../../data/project'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-team-project',
  templateUrl: 'project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent {
  dbProject: RxCollection<any>
  dbTask: RxCollection<any>

  tasks$: Observable<any[]>
  project$: Observable<any>

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
        this.setup(params['id'])
      })

    setTimeout(() => {
      this.zone.run(() => { })
    }, 500)
  }

  private async setup(projectId: string) {
    this.dbProject = await this.dbService.get<RxProjectDocument>("project")
    this.dbTask = await this.dbService.get<RxTaskDocument>("task")

    this.project$ = this.dbProject.findOne(projectId).$

    this.tasks$ = this.dbTask.find().$.map((data) => {
      if (!data) { return data }
      data.sort((a, b) => {
        return a.title < b.title ? -1 : 1
      })
      return data
    })
    this.project$.subscribe((project) => {

      if (project.length === 0) {
        this.zone.run(() => { })
        return
      }
      for (const task of project) {
        const _id = task.get("_id")
      }
      this.zone.run(() => { })
    })
  }

}
