import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorage } from 'ngx-store';
import { Observable } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';
import { Issue, IssueStatusViews, Project } from '../@shared/models/all';
import { ProjectsRepo } from '../@shared/repos/projects.repo';

@Component({
  selector: 'app-projects-project',
  templateUrl: 'project.component.html',
  styleUrls: ['./project.component.scss']

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

  issueStatuses = IssueStatusViews
  @LocalStorage('project_filters') filters = {
    status: null
  }

  project$: Observable<Project>

  menu = [
    {
      items: [
        { label: 'Issues', url: 'issues', relative: true },
        { label: 'Manage', url: 'manage', relative: true }
      ]
    },
    {
      items: [
        // { label: 'Agreements', url: '/agreements' },
        // { label: 'Orders', url: '/orders' },
        // { label: 'Invoices', url: '/invoices' }
      ]
    }
  ]

  constructor(
    private projectsRepo: ProjectsRepo,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  async ngOnInit() {
    this.project$ = this.route.params.pipe(
      mergeMap(params => this.projectsRepo.one$(params['pid'])),
      tap(async (project) => {
        if (!project) {
          await this.router.navigate([`/projects/projects`])
          return
        }
        // this.route.snapshot.data.breadcrumb.label = project.name
      })
    )
  }

  async toggleMark(id: string) {
    await this.projectsRepo.mark(id)
  }
}
