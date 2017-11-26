import { Component, NgZone, OnInit, OnDestroy } from '@angular/core'

import { Database } from '../../data/db.service'
import { RxPresentationDocument } from '../../data/models/presentation'


@Component({
  selector: 'app-presentations-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent  implements OnInit, OnDestroy {

  presentations: RxPresentationDocument[] | RxPresentationDocument
  sub

  constructor(
    private db: Database,
    private zone: NgZone,
  ) { }

  ngOnInit() {
    this._show()
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe()
    }
  }

  private async _show() {
    const db = await this.db.get()
    const presentations$ = db.presentation.find().$
    this.sub = presentations$.subscribe(presentations => {
      this.presentations = presentations
      this.zone.run(() => { })
    })
  }
}
