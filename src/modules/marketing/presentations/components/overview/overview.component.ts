import { Component, NgZone, OnInit, OnDestroy } from '@angular/core'
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap'

import * as _ from "lodash"
import * as moment from "moment"

import { DatabaseService } from '../../../../_core/database/database.service'
import { RxPresentationDocument } from '../../data/presentation'

import { CreateComponent } from "../create/create.component"
import { UploadComponent } from "../upload/upload.component"
import { RxCollection, RxDocumentBase } from 'rxdb'
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-presentations-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit, OnDestroy {

  presentations: Observable<(RxDocumentBase<RxPresentationDocument> & RxPresentationDocument)[]>;
  // presentations: Subscription;

  db: RxCollection<RxPresentationDocument>
  // presentations: RxPresentationDocument[] = []
  sub
  loading = true

  constructor(
    private dbService: DatabaseService,
    private zone: NgZone,
    private modal: NgbModal,
  ) { }

  closeResult: string

  ngOnInit() {
    this.loadPresentations()
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

  private async loadPresentations() {
    this.db = await this.dbService.get<RxPresentationDocument>("presentation")

    const presentations$ = this.db..find().$



    this.presentations = presentations$
      .map
    // .map(async presentations => {

    //   if (presentations.c.length) {
    //     await this.loadPresentationsImage(presentations)
    //     presentations = _.chain(presentations)
    //       .map((presentation: RxDocumentBase<RxPresentationDocument> & RxPresentationDocument & any) => {
    //         presentation._docVersion =
    //           `${presentation.get("_rev").split("-")[0]} / ${moment(presentation.dateUpdated).fromNow()}`
    //         return presentation
    //       })
    //       .sortBy("dateCreated")
    //       .reverse()
    //       .value()

    //     return presentations
    //   }
    // })
  }

  private async loadPresentationsImage(presentations: any[]) {
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
