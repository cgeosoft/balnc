import { Component, NgZone, OnInit, OnDestroy } from '@angular/core'
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap'

import * as _ from "lodash"
import * as moment from "moment"

import { DatabaseService } from '../../../../_core/database/database.service'
import { RxPresentationDocument } from '../../data/presentation'

import { CreateComponent } from "../create/create.component"
import { UploadComponent } from "../upload/upload.component"
import { RxCollection, RxDocumentBase } from 'rxdb'
import { Observable } from 'rxjs/Observable'

@Component({
  selector: 'app-presentations-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  db: RxCollection<RxPresentationDocument>
  presentations$: Observable<(RxDocumentBase<RxPresentationDocument> & RxPresentationDocument)[]>

  constructor(
    private dbService: DatabaseService,
    private zone: NgZone,
    private modal: NgbModal,
  ) { }

  async ngOnInit() {
    this.db = await this.dbService.get<RxPresentationDocument>("presentation")
    this.presentations$ = this.db.find().$
  }

  create() {
    const modalRef = this.modal.open(CreateComponent)
    modalRef.result
      .then((result) => {
        const now = moment().toISOString()
        const presentation = this.db.newDocument({
          title: result.title,
          description: "No description",
          dateCreated: now,
          dateUpdated: now,
          pages: []
        })
        presentation.save()
      }, (reject) => {
        console.log("dismissed", reject)
      })
  }

  async getImage(presentation): Promise<any> {
    const contentImage = presentation.pages[0].params.image
    const attachment = await presentation.getAttachment(contentImage)
    const blobBuffer = await attachment.getData()
    return new Promise((resolve, reject) => {
      try {
        const reader = new FileReader()
        reader.onload = () => {
          console.log("onloaded")
          const base64 = reader.result.split(',')[1]
          resolve('data:' + attachment.type + 'base64,' + base64)
        }
        reader.readAsDataURL(blobBuffer)
      } catch (err) {
        reject()
      }
    })
  }

  getVersion(presentation) {
    return presentation.get("_rev").split("-")[0]
  }

  getLastEdit(presentation) {
    return moment(presentation.dateUpdated).fromNow()
  }

}
