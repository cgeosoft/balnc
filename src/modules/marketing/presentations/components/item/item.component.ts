import { Component, NgZone, OnInit, OnDestroy } from '@angular/core'
import { Router, ActivatedRoute, ParamMap } from '@angular/router'

import { DatabaseService } from '../../../../main/database/database.service'
import { RxPresentationDocument } from '../../data/models/presentation'

@Component({
  selector: 'app-presentations-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit, OnDestroy {

  presentations: RxPresentationDocument[] | RxPresentationDocument
  sub
  presentation

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
    const db = await this.db.get()

    this.route
      .params
      .subscribe(params => {
        console.log(params['id'])
        db.presentation
          .findOne(params['id'])
          .exec()
          .then(doc => {
            this.presentation = doc
          });
        // In a real app: dispatch action to load the details here.
      });

  }
}
