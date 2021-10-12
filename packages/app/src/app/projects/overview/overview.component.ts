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
      { label: 'Date', style: { width: '160px' }, type: 'date', val: (i: Issue) => i.date },
      {
        label: 'Name',
        style: { 'min-width': '300px' },
        type: 'link',
        val: (item: Issue) => {
          return {
            label: item.title,
            link: ['/projects/projects', item.group, 'issues', item.id]
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
      tap((logs: PEvent[]) => logs.sort((a, b) => a.date - b.date)),
      tap((logs: PEvent[]) => logs.reverse())
    )
    this.issues$ = this.issuesRepo.all$().pipe(
      tap((issues: Issue[]) => issues.sort((a, b) => b.date - a.date)),
      take(10)
    )
  }
}
