import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { TableSchema } from '@balnc/shared'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { Observable } from 'rxjs'
import { mergeMap, tap } from 'rxjs/operators'
import { Issue, IssueStatuses } from '../../@shared/models/all'
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
    properties: [
      {
        label: 'Date',
        style: { width: '140px' },
        type: 'date',
        val: (i: Issue) => i._date
      },
      {
        label: 'Status',
        style: { width: '100px' },
        type: 'badge',
        badges: IssueStatuses,
        val: (i: Issue) => i.status
      },
      {
        label: 'Name',
        style: { 'min-width': '300px' },
        type: 'link',
        val: (item: Issue) => {
          return {
            label: item.title,
            link: ['/projects/projects', item._group, 'issues', item._id]
          }
        }
      }
    ]
  }
  pid: string

  constructor (
    private issuesRepo: IssuesRepo,
    private route: ActivatedRoute,
    private modal: NgbModal,
    private router: Router
  ) { }

  ngOnInit () {
    this.issues$ = this.route.parent.params.pipe(
      tap(params => { this.pid = params['pid'] }),
      mergeMap(params => this.issuesRepo.all$({group: params['pid']})),
      tap(issues => issues.sort((a, b) => b._date - a._date))
    )
  }

  async create () {
    const m = this.modal.open(IssueCreateComponent)
    m.componentInstance.projectId = this.pid
    const issue = await m.result as Issue
    if (issue) {
      await this.router.navigate(['/projects/projects', this.pid, 'issues', issue._id])
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
}
