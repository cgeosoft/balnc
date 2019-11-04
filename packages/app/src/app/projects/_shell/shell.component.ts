import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { LocalStorage } from 'ngx-store'
import { Observable, of } from 'rxjs'
import { filter, switchMap, tap } from 'rxjs/operators'
import { CreateProjectComponent } from '../create-project/create-project.component'
import { IssueCreateComponent } from '../issue-create/issue-create.component'
import { ProjectManageComponent } from '../project-manage/project-manage.component'
import { Project } from '../_shared/models/all'
import { ProjectsRepo } from '../_shared/repos/projects.repo'

@Component({
  selector: 'app-projects-shell',
  templateUrl: './shell.component.html',
  host: { 'class': 'shell' }
})
export class ShellComponent implements OnInit {

  issues: any[] = []
  projects: any[] = null

  projects$: Observable<Project[]>
  project$: Observable<Project>

  typeFilterSelected = null
  typeFilters = [
    { label: 'Starred' },
    { label: 'Active' },
    { label: 'Archived' },
    { label: 'Everything' }
  ]
  filters: any
  showFilters = false

  @LocalStorage('projects_selected') selectedProjectId: string

  constructor(
    private projectsService: ProjectsRepo,
    private modal: NgbModal,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.projects$ = this.projectsService.all$()
      .pipe(
        tap((projects: Project[]) => projects.sort((a, b) => {
          if (a.name < b.name) {
            return -1
          }
          if (a.name > b.name) {
            return 1
          }
          return 0
        }
        ))
      )
    this.route.firstChild.params.subscribe(params => this.loadProject(params['pid']))
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        switchMap(() => (this.route.firstChild && this.route.firstChild.params) || of({}))
      )
      .subscribe(params => this.loadProject(params['pid']))
  }

  private loadProject(pid) {
    if (pid) {
      this.selectedProjectId = pid
      this.project$ = this.projectsService.one$(pid)
    } else if (this.selectedProjectId) {
      this.project$ = this.projectsService.one$(this.selectedProjectId)
    } else {
      this.selectedProjectId = null
      this.project$ = null
    }
  }

  setFilter(filter) {
    this.typeFilterSelected = filter
    switch (filter) {
      case 'Starred':
        this.filters = { isStarred: { $eq: true } }
        break
      case 'Active':
        this.filters = { isArchived: { $eq: false } }
        break
      case 'Archived':
        this.filters = { isArchived: { $eq: true } }
        break
      case 'Everything':
        this.filters = {}
        break
    }
  }

  editDetails(projectId) {
    const m = this.modal.open(ProjectManageComponent)
    m.componentInstance.projectId = projectId
  }

  async createIssue(projectId) {
    const m = this.modal.open(IssueCreateComponent)
    m.componentInstance.projectId = projectId
    const issueId = await m.result
    if (issueId) {
      await this.router.navigate(['/projects/project', projectId, 'issue', issueId])
    }
  }

  async createProject() {
    const m = this.modal.open(CreateProjectComponent)
    const projectId = await m.result
    if (projectId) {
      await this.router.navigate(['/projects/project', projectId])
    }
  }

}
