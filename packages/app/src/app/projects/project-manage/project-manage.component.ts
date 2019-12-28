import { Component, Input, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import { Project } from '../@shared/models/all'
import { IssuesRepo } from '../@shared/repos/issues.repo'
import { PEventsRepo } from '../@shared/repos/pevents.repo'
import { ProjectsRepo } from '../@shared/repos/projects.repo'

@Component({
  selector: 'app-project-manage',
  templateUrl: './project-manage.component.html'
})
export class ProjectManageComponent implements OnInit {

  @Input() projectId
  project: Project
  loading = true

  constructor (
    private activeModal: NgbActiveModal,
    private projectsRepo: ProjectsRepo,
    private issuesRepo: IssuesRepo,
    private peventsRepo: PEventsRepo,
    private router: Router
  ) { }

  get modal () {
    return this.activeModal
  }

  async ngOnInit () {
    const p = await this.projectsRepo.one(this.projectId)
    this.project = { ...p }
  }

  async updateName () {
    this.loading = true
    const p = await this.projectsRepo.update(this.projectId, {
      $set: {
        name: this.project.name
      }
    })
    this.activeModal.close()
  }

  async deleteProject () {
    if (!confirm('Are you sure?')) return

    await this.projectsRepo.remove(this.projectId)

    const issues = await this.issuesRepo.all()

    const promiseIssues = issues
      .filter(i => i.project === this.projectId)
      .map(i => this.issuesRepo.remove(i._id))

    await Promise.all(promiseIssues)

    const issuesIds = issues.map(i => i._id)
    const promisePEvents = await this.peventsRepo.all()
      .then((pevents) => pevents
        .filter(i => issuesIds.indexOf(i._id) >= 0)
        .map(i => this.peventsRepo.remove(i._id))
      )
    await Promise.all(promisePEvents)

    this.activeModal.close()
    await this.router.navigate(['/projects/overview'])
  }
}
