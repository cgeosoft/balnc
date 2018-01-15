import { Component, NgZone, OnInit, OnDestroy } from '@angular/core'
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap'

import * as _ from "lodash"
import * as moment from "moment"

import { DatabaseService } from '../../../../_core/database/database.service'
import { RxPresentationDocument } from '../../data/presentation'

import { CreateComponent } from "../create/create.component"
import { UploadComponent } from "../upload/upload.component"
import { RxCollection, RxDocumentBase } from 'rxdb'

@Component({
  selector: 'app-presentations-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit, OnDestroy {

  db: RxCollection<RxPresentationDocument>
  presentations: RxPresentationDocument[] = []
  sub
  loading = true

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

  upload() {
    const modalRef = this.modal.open(UploadComponent)
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
      .subscribe(async presentations => {

        if (presentations.length) {
          await this.loadPresentationsImage(presentations)
          const _presentations = _.chain(presentations)
            .map((presentation: RxDocumentBase<RxPresentationDocument> & RxPresentationDocument & any) => {
              presentation._docVersion =
                `${presentation.get("_rev").split("-")[0]} / ${moment(presentation.dateUpdated).fromNow()}`
              return presentation
            })
            .sortBy("dateCreated")
            .reverse()
            .value()
          this.zone.run(() => {
            this.presentations = _presentations
          })
        }
        this.zone.run(() => {
          this.loading = false
        })
      })
  }

  async loadPresentationsImage(presentations: any[]) {
    for (const presentation of presentations) {
      if (presentation.pages.length) {
        const contentImage = presentation.pages[0].params.image
        const attachment = await presentation.getAttachment(contentImage)

        const blobBuffer = await attachment.getData();

        const reader = new FileReader();
        reader.onload = () => {
          const base64 = reader.result.split(',')[1];
          presentation._image = 'data:' + attachment.type + ';base64,' + base64
        };
        reader.readAsDataURL(blobBuffer);
      } else {
        presentation._image = "assets/img/placeholder-image.png"
      }
    }
  }

  public async _create(title: string) {

    const now = moment().toISOString()
    const presentation = this.db.newDocument({
      title: title,
      description: "No description",
      dateCreated: now,
      dateUpdated: now,
      pages: []
    })

    await presentation.save();
  }
}
