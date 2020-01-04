import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { TableSchema } from '@balnc/shared'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { Observable } from 'rxjs'
import { mergeMap, tap } from 'rxjs/operators'
import { Issue } from '../../@shared/models/all'
import { IssuesRepo } from '../../@shared/repos/issues.repo'
import { IssueCreateComponent } from '../issue-create/issue-create.component'

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.scss']
})
export class IssuesComponent implements OnInit {

  issues$: Observable<Issue[]>

  schema: TableSchema = {
    name: 'projects',
    properties: [
      { label: 'Date', style: { width: '160px' }, type: 'date', val: (i: Issue) => i._timestamp },
      {
        label: 'Name',
        style: { 'min-width': '300px' },
        type: 'link',
        val: (item: Issue) => {
          return {
            label: item.title,
            link: ['/projects/projects', item.project, 'issues', item._id]
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
      mergeMap(params => this.issuesRepo.all$(params['pid'])),
      tap(issues => issues.sort((a,b) => b._timestamp - a._timestamp))
    )
  }

  async create () {
    const m = this.modal.open(IssueCreateComponent)
    m.componentInstance.projectId = this.pid
    const issueId = await m.result
    if (issueId) {
      await this.router.navigate(['/projects/project', this.pid, 'issue', issueId])
    }
  }
}
