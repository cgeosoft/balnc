import { Component, NgZone, OnDestroy, OnInit, ElementRef, ViewChild } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Subscription } from 'rxjs/Subscription'
import { RxCollection, RxDocumentBase } from 'rxdb'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { Observable } from 'rxjs/Observable'

import * as _ from 'lodash'
import * as moment from 'moment'

import { DatabaseService } from '@blnc/core/database/services/database.service'

import { RxLogDocument } from '../../data/log'
import { CreateTaskComponent } from '../create-task/create-task.component'
import { RxProjectDocument } from '../../data/project'
import { ProjectsService } from '../../services/projects.service'

@Component({
  selector: 'app-team-projects-project',
  templateUrl: 'project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit {

  tabsMenu: any
  tasks: RxLogDocument[]
  project: RxProjectDocument
  projectId: string

  constructor(
    private route: ActivatedRoute,
    private projectsService: ProjectsService,
    private modal: NgbModal
  ) { }

  ngOnInit() {

    this.tabsMenu = {
      active: "tasks",
      tabs: [{
        id: "tasks",
        label: "Tasks",
        icon: "tasks",
      }, {
        id: "settings",
        icon: "cog",
        right: true
      }],
      select: (tabId) => {
        this.tabsMenu.active = tabId
      }
    }

    this.route.params.subscribe(params => {
      this.projectId = params['id']
      this.setup()
    })
  }

  private async setup() {
    this.project = await this.projectsService.getProject(this.projectId)
    this.tasks = await this.projectsService.getTasks({
      query: { project: { $eq: this.projectId } }
    })
  }

  createTask() {
    const modalRef = this.modal.open(CreateTaskComponent)
    modalRef.componentInstance.projectId = this.projectId
  }
}
