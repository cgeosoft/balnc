import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'

import { RxLogDoc } from '../../models/log'
import { CreateTaskComponent } from '../create-task/create-task.component'
import { Project } from '../../models/project'
import { ProjectsService } from '../../services/projects.service'

@Component({
  selector: 'projects-project',
  templateUrl: 'project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  tabsMenu: any
  tasks: RxLogDoc[]
  project: Project & any = {}
  projectId: string

  constructor (
    private route: ActivatedRoute,
    private projectsService: ProjectsService,
    private modal: NgbModal
  ) { }

  ngOnInit () {

    this.tabsMenu = {
      active: 'tasks',
      tabs: [{
        id: 'tasks',
        label: 'Tasks',
        icon: 'tasks'
      }, {
        id: 'settings',
        icon: 'cog',
        right: true
      }],
      select: (tabId) => {
        this.tabsMenu.active = tabId
      }
    }

    this.route.params.subscribe(params => {
      this.projectId = params['prjectId']
      this.projectId = params['prjectId']
      this.setup()
    })
  }

  private async setup () {
    this.project = await this.projectsService.getProject(this.projectId)
    this.tasks = await this.projectsService.getTasks({
      query: { project: { $eq: this.projectId } }
    })
  }

  createTask () {
    const modalRef = this.modal.open(CreateTaskComponent)
    modalRef.componentInstance.projectId = this.projectId
  }
}
