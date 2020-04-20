import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { ConfigService } from '@balnc/core'
import { TableSchema } from '@balnc/shared'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { Observable } from 'rxjs'
import { mergeMap, tap } from 'rxjs/operators'
import { Issue, IssueStatusView, IssueStatusViews } from '../../@shared/models/all'
import { IssuesRepo } from '../../@shared/repos/issues.repo'
import { IssueCreateComponent } from '../issue-create/issue-create.component'

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.scss']
})
export class IssuesComponent implements OnInit {

  issues$: Observable<Issue[]>

  typeFilterSelected = null
  typeFilters = [
    { label: 'Starred' },
    { label: 'Active' },
    { label: 'Archived' },
    { label: 'Everything' }
  ]
  filters: any
  showFilters = false

  schema: TableSchema = {
    name: 'projects',
    properties: [{
      label: '',
      style: { width: '30px' },
      locked: true,
      template: "issueTpl",
      d: (i: Issue) => i.status
    }, {
      label: 'Name',
      style: { 'min-width': '300px' },
      template: 'mainTpl',
      locked: true,
      d: (i) => i.c.title
    }]
  }
  pid: string

  issuesStatuses: { [key: string]: IssueStatusView }

  get usernames() {
    return this.configService.usernames || {}
  }

  constructor(
    private configService: ConfigService,
    private issuesRepo: IssuesRepo,
    private route: ActivatedRoute,
    private modal: NgbModal,
    private router: Router
  ) { }

  ngOnInit() {
    this.issues$ = this.route.parent.params.pipe(
      tap(params => { this.pid = params['pid'] }),
      mergeMap(params => this.issuesRepo.all$({ group: params['pid'] })),
      tap((issues: any[]) => {
        this.issuesStatuses = issues.reduce((l, i) => {
          l[i._id] = IssueStatusViews.find(x => x.key === i.c.status)
          return l
        }, {})
        issues.sort((a, b) => b.d - a.d)
      })
    )
  }

  async create() {
    const m = this.modal.open(IssueCreateComponent)
    m.componentInstance.projectId = this.pid
    const issue = await m.result as Issue
    if (issue) {
      await this.router.navigate(['/projects/projects', this.pid, 'issues', issue._id])
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
}
