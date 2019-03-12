import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateTaskComponent } from '../create-task/create-task.component';
import { PEvent } from '../_shared/models/pevent';
import { Project } from '../_shared/models/project';
import { ProjectsService } from '../_shared/projects.service';

@Component({
  selector: 'app-projects-project',
  templateUrl: 'project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  tabsMenu: any
  tasks: PEvent[]
  project: Project
  projectId: string

  constructor (
    private route: ActivatedRoute,
    private projectsService: ProjectsService,
    private modal: NgbModal
  ) { }

  ngOnInit () {

    this.tabsMenu = {
      selected: 'tasks',
      tabs: [{
        id: 'tasks',
        label: 'Tasks',
        icon: 'tasks'
      }, {
        id: 'settings',
        icon: 'cog',
        right: true
      }]
    }

    this.route.params.subscribe(params => {
      this.projectId = params['pid']
      this.load()
    })
  }

  private async load () {
    console.log('load project', this.projectId)
    this.project = await this.projectsService.getProject(this.projectId)
    this.tasks = await this.projectsService.getTasks(this.projectId)
  }

  async createTask () {
    const modalRef = this.modal.open(CreateTaskComponent)
    modalRef.componentInstance.projectId = this.projectId
    await modalRef.result
    this.load()
  }
}
