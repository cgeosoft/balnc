import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { CreateProjectComponent } from '../create-project/create-project.component';
import { Project } from '../_shared/models/project';
import { ProjectsService } from '../_shared/projects.service';

@Component({
  selector: 'app-projects-manage',
  templateUrl: 'manage.component.html'
})
export class ManageComponent implements OnInit {

  pevents: any[]
  projects$: Observable<Project[]>;

  constructor(
    private projectsService: ProjectsService,
    private modal: NgbModal
  ) { }

  async ngOnInit() {
    this.projects$ = await this.projectsService.getAll$<Project>('projects')
  }

  async createProject() {
    await this.modal.open(CreateProjectComponent).result
    await this.ngOnInit()
  }

  async generate() {
    this.projectsService.generateDemoData()
  }
}
