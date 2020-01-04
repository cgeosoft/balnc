import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Observable } from 'rxjs'
import { mergeMap } from 'rxjs/operators'
import { CEvent, CEventType } from '../../@shared/models/contacts'
import { CEventsRepo } from '../../@shared/repos/cevents.repo'

@Component({
  selector: 'app-contact-timeline',
  templateUrl: './contact-timeline.component.html',
  styleUrls: ['./contact-timeline.component.scss']
})
export class ContactTimelineComponent implements OnInit {

  eventTypes = CEventType
  events$: Observable<CEvent[]>

  constructor (
    private route: ActivatedRoute,
    private ceventsRepo: CEventsRepo
  ) { }

  ngOnInit () {
    this.events$ = this.route.parent.params.pipe(
      mergeMap(params => this.ceventsRepo.all$(params.id))
    )
  }

}
