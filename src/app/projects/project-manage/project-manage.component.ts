import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Project, RxProjectDoc } from '../_shared/models/project';
import { ProjectsService } from '../_shared/projects.service';

@Component({
  selector: 'app-project-manage',
  templateUrl: './project-manage.component.html'
})
export class ProjectManageComponent implements OnInit {

  @Input() projectId
  project: Project
  loading = true;

  constructor(
    private activeModal: NgbActiveModal,
    private projectsService: ProjectsService
  ) { }

  get modal() {
    return this.activeModal
  }

  async ngOnInit() {
    this.projectsService
      .getOne$<Project>("projects", this.projectId)
      .subscribe((project) => {
        this.project = {
          name: project.name
        }
      })
  }

  async updateName() {
    this.loading = true
    const p = await this.projectsService
      .getOne<RxProjectDoc>("projects", this.projectId)
    await p.update({
      $set: {
        name: this.project.name
      }
    })
    this.activeModal.close()
  }
}
