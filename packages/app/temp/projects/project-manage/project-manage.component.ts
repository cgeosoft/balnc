import { Component, Input, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import { Project, RxIssueDoc, RxProjectDoc } from '../_shared/models/all'
import { ProjectsRepo } from '../_shared/repos/projects.repo'

@Component({
  selector: 'app-project-manage',
  templateUrl: './project-manage.component.html'
})
export class ProjectManageComponent implements OnInit {

  @Input() projectId
  project: Project
  loading = true

  constructor(
    private activeModal: NgbActiveModal,
    private projectsService: ProjectsRepo,
    private router: Router
  ) { }

  get modal() {
    return this.activeModal
  }

  async ngOnInit() {
    const p = await this.projectsService.getOne<Project>('projects', this.projectId)
    this.project = {
      name: p.name
    }
  }

  async updateName() {
    this.loading = true
    const p = await this.projectsService
      .getOne<RxProjectDoc>('projects', this.projectId)
    await p.update({
      $set: {
        name: this.project.name
      }
    })
    this.activeModal.close()
  }

  async deleteProject() {
    if (!confirm('Are you sure?')) return
    const project = await this.projectsService.getOne<RxProjectDoc>('projects', this.projectId)
    await project.remove()
    const issues = await this.projectsService.getAll<RxIssueDoc[]>('issues', {
      projectId: { $eq: this.projectId }
    })
    issues.forEach(i => i.remove())
    const logs = await this.projectsService.getAll<RxIssueDoc[]>('logs', {
      projectId: { $eq: this.projectId }
    })
    logs.forEach(i => i.remove())
    this.router.navigate(['/projects/overview'])
    this.activeModal.close()
  }
}
