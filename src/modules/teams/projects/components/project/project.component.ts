import { Component, NgZone, OnDestroy, OnInit, ElementRef, ViewChild } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Subscription } from 'rxjs/Subscription'
import { RxCollection, RxDocumentBase } from 'rxdb'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { Observable } from 'rxjs/Observable'

import * as _ from 'lodash'
import * as moment from 'moment'

import { DatabaseService } from '@blnc/_core/database/services/database.service'

import { RxTaskDocument } from '../../data/task'
import { CreateTaskComponent } from '../create-task/create-task.component'
import { RxProjectDocument } from '../../data/project'
import { ProjectsService } from '../../services/projects.service'

@Component({
  selector: 'app-team-projects-project',
  templateUrl: 'project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit {
  projectId: string;

  dbProject: RxCollection<any>
  dbTask: RxCollection<any>

  tasks$: Observable<any[]>
  project$: Observable<any>

  constructor(
    private route: ActivatedRoute,
    private projectsService: ProjectsService,
    private modal: NgbModal
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.projectId = params['id']
      this.setup()
    })
  }

  private async setup() {
    this.project$ = this.projectsService.getProject(this.projectId)
    this.tasks$ = this.projectsService.tasks.find({
      query: { project: { $eq: this.projectId } }
    }).$
  }

  createTask() {
    const modalRef = this.modal.open(CreateTaskComponent)
    modalRef.componentInstance.projectId = this.projectId
  }
}
