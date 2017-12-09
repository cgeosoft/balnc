import { Component, NgZone, OnInit, OnDestroy } from '@angular/core'
import { Router, ActivatedRoute, ParamMap } from '@angular/router'

import { DatabaseService } from '../../../../_core/modules/database/database.service'
import { RxPresentationDocument } from '../../data/presentation'

@Component({
  selector: 'app-presentations-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit, OnDestroy {

  sub
  presentation: any

  constructor(
    private route: ActivatedRoute,
    private db: DatabaseService,
    private zone: NgZone,
    private router: Router,
  ) { }

  ngOnInit() {
    this._show()
  }

  ngOnDestroy() {
  }

  private async _show() {
    const db = await this.db.get<RxPresentationDocument>("presentation")

    this.route
      .params
      .subscribe(params => {

        const presentation$ = db.findOne(params['id']).$
        this.sub = presentation$
          .subscribe(presentation => {
            this.zone.run(() => {
              this.presentation = presentation
            })
          })
      })

  }
}
