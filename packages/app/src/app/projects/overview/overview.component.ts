import { Component, OnInit } from '@angular/core'
import { TableSchema } from '@balnc/shared'
import { Observable } from 'rxjs'
import { take, tap } from 'rxjs/operators'
import { Issue, PEvent } from '../@shared/models/all'
import { IssuesRepo } from '../@shared/repos/issues.repo'
import { PEventsRepo } from '../@shared/repos/pevents.repo'

@Component({
  selector: 'app-projects-overview',
  templateUrl: 'overview.component.html',
  styleUrls: ['./overview.component.scss']

})
export class OverviewComponent implements OnInit {

  logs$: Observable<PEvent[]>
  issues$: Observable<Issue[]>
  issuesSchema: TableSchema = {
    name: 'latest-issues',
    properties: [
      { label: 'Date', style: { width: '160px' }, type: 'date', val: (i: Issue) => i._date },
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
  constructor (
    private peventsRepo: PEventsRepo,
    private issuesRepo: IssuesRepo
  ) { }

  async ngOnInit () {
    this.logs$ = this.peventsRepo.allm$().pipe(
      tap((logs: PEvent[]) => logs.sort((a, b) => a._date - b._date)),
      tap((logs: PEvent[]) => logs.reverse())
    )
    this.issues$ = this.issuesRepo.all$().pipe(
      tap((issues: Issue[]) => issues.sort((a, b) => b._date - a._date)),
      take(10)
    )
  }
}
