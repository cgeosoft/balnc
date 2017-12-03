import { Component, NgZone, OnInit, OnDestroy } from '@angular/core'

import { DatabaseService } from '../../../../_core/modules/database/database.service'
import { RxPresentationDocument } from '../../data/models/presentation'

@Component({
  selector: 'app-presentations-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit, OnDestroy {

  presentations: RxPresentationDocument[] = []
  sub

  constructor(
    private db: DatabaseService,
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
    const db = await this.db.get<RxPresentationDocument>("presentation")
    const presentations$ = db.find().$

    this.sub = presentations$
      .subscribe(presentations => {
        console.log("presentations", presentations)
        this.presentations = presentations
        this.zone.run(() => { })
      })
  }
}
