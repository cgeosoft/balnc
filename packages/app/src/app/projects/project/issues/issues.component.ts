import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { TableSchema } from '@balnc/shared'
import { Observable } from 'rxjs'
import { mergeMap } from 'rxjs/operators'
import { Issue } from '../../@shared/models/all'
import { IssuesRepo } from '../../@shared/repos/issues.repo'

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html'
})
export class IssuesComponent implements OnInit {

  issues$: Observable<Issue[]>

  schema: TableSchema = {
    name: 'projects',
    properties: [
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

  constructor (
    private issuesRepo: IssuesRepo,
    private route: ActivatedRoute
  ) { }

  ngOnInit () {
    this.issues$ = this.route.params.pipe(
      mergeMap(params => this.issuesRepo.all$(params['pid']))
    )
  }
}
