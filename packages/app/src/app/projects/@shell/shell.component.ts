import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { PROJECTS_SIDEBAR } from '../@shared/constants/sidebar'
import { Project } from '../@shared/models/all'
import { ProjectsRepo } from '../@shared/repos/projects.repo'
import { DemoService } from '../@shared/services/demo.service'
import { CreateProjectComponent } from '../create-project/create-project.component'
import { IssueCreateComponent } from '../project/issue-create/issue-create.component'
import { ProjectManageComponent } from '../project/manage/manage.component'

@Component({
  selector: 'app-projects-shell',
  templateUrl: './shell.component.html'

})
export class ShellComponent implements OnInit {

  issues: any[] = []

  projects$: Observable<Project[]>
  project: Project

  typeFilterSelected = null
  typeFilters = [
    { label: 'Starred' },
    { label: 'Active' },
    { label: 'Archived' },
    { label: 'Everything' }
  ]
  filters: any
  showFilters = false

  sidebar = PROJECTS_SIDEBAR

  constructor (
    private demoService: DemoService,
    private projectsRepo: ProjectsRepo,
    private modal: NgbModal,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  async ngOnInit () {

    this.sidebar.marked = {
      data$: this.projectsRepo.all$(null, true).pipe(
        map((contacts) => {
          return contacts.map(p => {
            return {
              label: p.name,
              icon: ['far','bookmark'],
              url: ['/projects/projects', p._id]
            }
          })
        })
      )
    }
  }

  setFilter (filter) {
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

  editDetails (projectId) {
    const m = this.modal.open(ProjectManageComponent)
    m.componentInstance.projectId = projectId
  }

  async createIssue (projectId) {
    const m = this.modal.open(IssueCreateComponent)
    m.componentInstance.projectId = projectId
    const issueId = await m.result
    if (issueId) {
      await this.router.navigate(['/projects/project', projectId, 'issue', issueId])
    }
  }

  async createProject () {
    const m = this.modal.open(CreateProjectComponent)
    const projectId = await m.result
    if (projectId) {
      await this.router.navigate(['/projects/project', projectId])
    }
  }

}
