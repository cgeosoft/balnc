import { Component, NgZone, OnInit, OnDestroy } from '@angular/core'
import { Router, ActivatedRoute, ParamMap } from '@angular/router'
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap'

import * as _ from "lodash"
import * as moment from "moment"

import { DatabaseService } from '../../../../_core/modules/database/database.service'
import { RxPresentationDocument } from '../../data/presentation'
import { UploadComponent } from "../upload/upload.component"
import { RxCollection, RxDocumentBase } from 'rxdb'


@Component({
  selector: 'app-presentations-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit, OnDestroy {

  db: RxCollection<RxPresentationDocument>
  sub
  presentation: RxDocumentBase<RxPresentationDocument> & RxPresentationDocument

  constructor(
    private route: ActivatedRoute,
    private dbService: DatabaseService,
    private zone: NgZone,
    private router: Router,
    private modal: NgbModal,
  ) { }

  ngOnInit() {
    this._show()
  }

  ngOnDestroy() {
  }

  upload() {
    const modalRef = this.modal.open(UploadComponent)
    modalRef.result
      .then((result) => {
        this.presentation.pages.push({
          "key": "1",
          "title": "lala",
          "preview": result,
          "type": "BGIMG",
          "params": {
            "image": "http://lorempixel.com/1024/1024/cats/1"
          }
        })
        this.presentation.save()
      }, (reject) => {
        console.log("dismissed", reject)
      })
  }

  private async _show() {
    this.db = await this.dbService.get<RxPresentationDocument>("presentation")

    this.route
      .params
      .subscribe(params => {

        const presentation$ = this.db.findOne(params['id']).$
        this.sub = presentation$
          .subscribe(presentation => {
            this.zone.run(() => {
              this.presentation = presentation
            })
          })
      })

  }
}
