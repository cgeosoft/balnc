import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import { PEvent } from '../_shared/models/all'
import { PEventsRepo } from '../_shared/repos/pevents.repo'

@Component({
  selector: 'app-projects-overview',
  templateUrl: 'overview.component.html',
  styleUrls: ['./overview.component.scss'],
  host: { 'class': 'page' }
})
export class OverviewComponent implements OnInit {

  logs$: Observable<PEvent[]>

  constructor (
    private peventsRepo: PEventsRepo
  ) { }

  async ngOnInit () {
    this.logs$ = this.peventsRepo.all$().pipe(
      tap((logs: PEvent[]) => logs.sort((a, b) => a._timestamp - b._timestamp)),
      tap((logs: PEvent[]) => logs.reverse())
    )
  }
}
