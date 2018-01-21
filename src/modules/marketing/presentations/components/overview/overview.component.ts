import { Component, NgZone, OnInit, OnDestroy } from '@angular/core'
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap'

import * as _ from 'lodash'
import * as moment from 'moment'

import { DatabaseService } from '../../../../_core/database/database.service'
import { RxPresentationDocument } from '../../data/presentation'

import { CreateComponent } from "../create/create.component"
import { UploadComponent } from "../upload/upload.component"
import { RxCollection, RxDocumentBase } from 'rxdb'
import { Observable } from 'rxjs/Observable'
import { setTimeout } from 'core-js/library/web/timers';

@Component({
  selector: 'app-presentations-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  db: RxCollection<RxPresentationDocument>
  presentations$: Observable<any>
  presentationImages: any = {}
  presentationFilesize: any = {}

  constructor(
    private dbService: DatabaseService,
    private zone: NgZone,
    private modal: NgbModal
  ) { }

  ngOnInit() {
    this.setup()
  }

  async setup() {
    this.db = await this.dbService.get<RxPresentationDocument>("presentation")

    console.log("presentations loading")

    this.presentations$ = this.db.find().$.map((data) => {
      if (!data) { return data }
      data.sort((a, b) => {
        return a.title < b.title ? -1 : 1;
      });
      return data;
    });
    this.presentations$.subscribe((presentations) => {
      console.log("presentations loaded")
      for (const presentation of presentations) {
        const _id = presentation.get("_id")
        this.presentationImages[_id] = this.getImage(presentation)
        this.presentationFilesize[_id] = this.getFilesize(presentation)
      }
      this.zone.run(() => { });
    })
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
        this.zone.run(() => { })
      }, (reject) => {
        console.log("dismissed", reject)
      })
  }

  async getImage(presentation: RxDocumentBase<RxPresentationDocument> & RxPresentationDocument): Promise<any> {
    return new Promise(async (resolve, reject) => {
      if (presentation.pages.length === 0) {
        resolve(null)
        this.zone.run(() => { })
        console.log("not found")
        return
      }
      try {
        const contentImage = presentation.pages[0].params.image
        const attachment = await presentation.getAttachment(contentImage)
        const blobBuffer = await attachment.getData()
        const reader = new FileReader()
        reader.onload = () => {
          console.log("loaded")
          const base64 = reader.result.split(',')[1]
          const src = 'data:' + attachment.type + ';base64,' + base64
          resolve(src)
          this.zone.run(() => { })
        }
        reader.readAsDataURL(blobBuffer)
      } catch (err) {
        reject()
      }
    })
  }

  getVersion(presentation: RxDocumentBase<RxPresentationDocument> & RxPresentationDocument) {
    return presentation.get("_rev").split("-")[0]
  }

  getLastEdit(presentation: RxDocumentBase<RxPresentationDocument> & RxPresentationDocument) {
    return moment(presentation.dateUpdated).fromNow()
  }

  async getFilesize(presentation: RxDocumentBase<RxPresentationDocument> & RxPresentationDocument) {
    const attachments = await presentation.allAttachments()
    const size = attachments.reduce((t, i) => {
      return t + i.length
    }, 0)
    return size
  }

}
