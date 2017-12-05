import { Component, NgZone, OnInit, OnDestroy } from '@angular/core'
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap'

import * as _ from "lodash"
import * as moment from "moment"

import { DatabaseService } from '../../../../_core/modules/database/database.service'
import { RxPresentationDocument } from '../../data/presentation'

import { CreateComponent } from "../create/create.component"
import { RxCollection } from 'rxdb'

@Component({
  selector: 'app-presentations-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit, OnDestroy {

  db: RxCollection<RxPresentationDocument>
  presentations: RxPresentationDocument[] = []
  sub

  constructor(
    private dbService: DatabaseService,
    private zone: NgZone,
    private modal: NgbModal,
  ) { }

  closeResult: string

  ngOnInit() {
    this._show()
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe()
    }
  }

  create() {
    const modalRef = this.modal.open(CreateComponent)
    modalRef.result
      .then((result) => {
        this._create(result.title)
      }, (reject) => {
        console.log("dismissed", reject)
      })
  }

  private async _show() {
    this.db = await this.dbService.get<RxPresentationDocument>("presentation")
    const presentations$ = this.db.find().$
    this.sub = presentations$
      .subscribe(presentations => {
        this.zone.run(() => {
          this.presentations = _.chain(presentations)
            .sortBy("dateCreated")
            .reverse()
            .value()
        })
      })
  }

  public async _create(title: string) {

    const doc = this.db.newDocument({
      title: title,
      image: "https://www.oysterdiving.com/components/com_easyblog/themes/wireframe/images/placeholder-image.png",
      description: "No description",
      dateCreated: moment().toISOString(),
    })

    await doc.save()
      .then(() => {

      })
  }
}
