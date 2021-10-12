import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { ToastrService } from 'ngx-toastr'
import { Observable } from 'rxjs'
import { mergeMap, tap } from 'rxjs/operators'
import { Project } from '../../@shared/models/all'
import { IssuesRepo } from '../../@shared/repos/issues.repo'
import { PEventsRepo } from '../../@shared/repos/pevents.repo'
import { ProjectsRepo } from '../../@shared/repos/projects.repo'

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html'
})
export class ProjectManageComponent implements OnInit {

  pid: string
  project$: Observable<Project>
  deleting: boolean
  saving: boolean

  constructor (
    private projectsRepo: ProjectsRepo,
    private issuesRepo: IssuesRepo,
    private peventsRepo: PEventsRepo,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  async ngOnInit () {
    this.project$ = this.route.parent.params.pipe(
      tap(params => {
        this.pid = params['pid']
        this.deleting = false
      }),
      mergeMap(params => this.projectsRepo.one$(params['pid']))
    )
  }

  async save (data) {
    this.saving = true
    await this.projectsRepo.update(this.pid, data)
    this.saving = false
  }

  async delete () {
    if (!confirm('Are you sure?')) return

    this.deleting = true

    const issues = await this.issuesRepo.all()

    const promiseIssues = issues
      .filter(i => i.group === this.pid)
      .map(i => this.issuesRepo.remove(i.id))

    await Promise.all(promiseIssues)

    const issuesIds = issues.map(i => i.id)
    const promisePEvents = await this.peventsRepo.all()
      .then((pevents) => pevents
        .filter(i => issuesIds.indexOf(i.id) >= 0)
        .map(i => this.peventsRepo.remove(i.id))
      )
    await Promise.all(promisePEvents)

    await this.projectsRepo.remove(this.pid)

    this.toastr.success('Project deleted')
  }
}
