import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateProjectComponent } from '../create-project/create-project.component';
import { PEvent } from '../_shared/models/pevent';
import { Project } from '../_shared/models/project';
import { ProjectsService } from '../_shared/projects.service';

@Component({
  selector: 'projects-overview',
  templateUrl: 'overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  projects: Project[]
  pevents: PEvent[]

  constructor (
    private projectsService: ProjectsService,
    private modal: NgbModal
  ) { }

  async ngOnInit () {
    this.projects = await this.projectsService.getOverviewProjects()
    this.pevents = await this.projectsService.getLatestPEvents()
  }

  async createProject () {
    await this.modal.open(CreateProjectComponent).result
    await this.ngOnInit()
  }

  async generate () {
    this.projectsService.generateDemoData()
  }
}
