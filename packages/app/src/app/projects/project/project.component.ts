import { Component, OnInit, Pipe, PipeTransform } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { LocalStorage } from 'ngx-store'
import { Observable } from 'rxjs'
import { map, tap } from 'rxjs/operators'
import { Issue, IssueStatus, IssueStatuses, Project } from '../_shared/models/all'
import { IssuesRepo } from '../_shared/repos/issues.repo'
import { ProjectsRepo } from '../_shared/repos/projects.repo'

@Component({
  selector: 'app-projects-project',
  templateUrl: 'project.component.html',
  styleUrls: ['./project.component.scss'],
  host: { 'class': 'page' }
})
export class ProjectComponent implements OnInit {

  issues$: Observable<Issue[]>
  issuesLength = 0
  pages = []
  @LocalStorage('project_page') page = 0
  @LocalStorage('project_pLength') pLength = 10

  lengths = [5, 10, 25, 50]
  projects: Project[]
  project: Project

  issueStatuses = IssueStatuses
  @LocalStorage('project_filters') filters = {
    status: null
  }

  breadcrumb: any[]

  constructor (
    private projectsRepo: ProjectsRepo,
    private issuesRepo: IssuesRepo,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  get pStart () {
    return this.page * this.pLength
  }
  get pEnd () {
    return this.pStart + this.pLength
  }

  async ngOnInit () {
    this.route.params.subscribe(async (params) => {
      await this.load(params['pid'])
    })
  }

  getStatus (status: IssueStatus) {
    return IssueStatuses.find(s => s.key === status)
  }

  goPrevious () {
    if (this.page > 0) this.page--
  }

  goNext () {
    if (this.page < this.pages.length - 1) this.page++
  }

  calcPages () {
    this.pages = Array.apply(null, { length: this.issuesLength / this.pLength }).map(Number.call, Number)
    if (this.pages.length && this.issuesLength % this.pLength > 0) this.pages.push(this.pages[this.pages.length - 1] + 1)
  }

  changedFilters () {
    this.filters = this.filters
  }

  private async load (projectId) {
    this.project = await this.projectsRepo.one(projectId)
    if (!this.project) { await this.router.navigate(['/projects/overview']) }
    this.breadcrumb = [
      { label: 'Projects' },
      { label: this.project.name }
    ]
    this.issues$ = this.issuesRepo.all$().pipe(
      map(x => x.filter(y => y.project === this.project._id)),
      tap((issues: Issue[]) => issues.sort((a, b) => a._timestamp - b._timestamp)),
      tap((issues: Issue[]) => issues.reverse()),
      tap((issues: Issue[]) => {
        this.issuesLength = issues.length
        this.calcPages()
      })
    )
  }
}

@Pipe({ name: 'filterIssues', pure: false })
export class FilterIssuesPipe implements PipeTransform {
  transform (issues: Issue[], filters?: any): Issue[] {
    return issues.filter((i) => i.status === filters.status || filters.status === null)
  }
}
